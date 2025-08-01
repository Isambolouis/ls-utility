


/**
 * **EventEmitter** in Leistrap
 * 
 * The `EventEmitter` is a core utility in Leistrap designed to create unique, bidirectional communication channels.
 * It facilitates asynchronous and fluid information sharing between various UI components and elements within the application. 
 * Thanks to its core methods, **`handle`** and **`invoke`**, the EventEmitter enables seamless event-driven communication 
 * between objects, promoting better decoupling and reusability.
 * 
 * - **Key Features**:
 *   - **`handle`**: Define a channel and attach a listener to it.
 *   - **`invoke`**: Trigger a channel, executing its attached listener if it exists.
 *   - **`removeEvent`**: Remove a channel if it's removable.
 *   - **`hasEvent`**: Check if a channel exists.
 *   - **`eventsList`**: Get a list of all registered channels.
 *   - **`clear`**: Cleanup all registered channels and events.
 */
const lsEmitter = function (obj) {

    let channels = {};
    let inWaitChannel = {};
    let data = null;
    let isDestroyed = false;

    const event_ = { send: (d) => { data = d; } };

    function validateChannelName(channel) {
        if (!channel || typeof channel !== "string" || channel.trim() === "") {
            throw new EventEmitterError(
                "Invalid channel name: The channel name must be a non-empty string.",
                "INVALID_CHANNEL_NAME"
            );
        }
     }
    

     function checkState(){
        if(isDestroyed){
            throw new EventEmitterError(
                "Operation failed: The EventEmitter instance has been destroyed.\n " +
                "No further actions can be performed on this instance.\n " +
                "Ensure you are not referencing a cleared or invalid EventEmitter object.\n",
                "EVENT_DESTROYED"
            );
        }
     }

    class EventEmitterError extends Error {
        constructor(message, code) {
            super(message);
            this.name = "EventEmitterError";
            this.code = code; 
        }
    }


        
    /**
     * **`invoke`**: Trigger a channel and execute its listener.
     * 
     * This method is used to invoke a channel. If the channel does not exist yet, it is added to a queue 
     * and invoked as soon as it is defined via **`handle`**.
     * 
     * @param {string} channel - The name of the channel to invoke.
     * @param {function|null} [listener=null] - A callback function to execute immediately after the channel's listener 
     *                                          is invoked. This callback receives data sent from the channel's listener 
     *                                          through **`event.send(data)`**. Can be `null` if no additional processing is needed.
     * @param {...any} args - Additional arguments to pass to the channel's listener. These can include strings, arrays, 
     *                        objects, or asynchronous callbacks.
     * 
     * **Note**: It is recommended to use asynchronous callbacks if you need to handle complex operations.
     * 
     * **Example Usage**:
     * ```javascript
     * eventEmitter.invoke("myChannel", (data) => {
     *     console.log("Response from listener:", data);
     * }, "arg1", { key: "value" });
     * ```
     */
    async function invoke(channel, listener, ...args) {

        validateChannelName(channel);
    
        async function exe() {
            if ( !isDestroyed  && channels[channel]) {
                await channels[channel].listener(event_, ...args);
            }
            if ( !isDestroyed && listener) listener(data);
            data = null;
        }
    
        if (!isDestroyed && obj.has(channel, channels)) {
            obj.after(1, exe);
        } else {
            if(!inWaitChannel[channel]) inWaitChannel[channel] = [];
            inWaitChannel[channel].push(() => obj.after(1, exe));
        }
    }



     /**
     * **`handle`**: Define a new channel and attach a listener to it.
     * 
     * This method is used to create a channel and listen for invocations on it via **`invoke`**.
     * 
     * @param {string} channel - The name of the channel to create.
     * @param {function} listener - The handler function to be called when the channel is invoked. 
     *                              The first parameter of this function must always be **`event`**, 
     *                              which is used to send immediate data to the listener via **`event.send(data)`**.
     *                              Additional parameters can be passed through **`...args`**.
     * @param {boolean} [removable=true] - Indicates whether the channel can be removed later using **`removeEvent`**. 
     *                                     Default is `true`. If set to `false`, the channel cannot be removed.
     * @param {boolean} [writable=true] - Defines whether the channel can be overwritten. Default is `true`. 
     *                                    If set to `false`, the channel becomes immutable and cannot be modified.
     * 
     * **Example Usage**:
     * ```javascript
     * eventEmitter.handle("myChannel", (event, data) => {
     *     console.log("Data received:", data);
     *     event.send({ success: true });
     * }, true, true);
     * ```
     */
    async function handle(channel, listener, removable = true, writable = true) {
        checkState()
        validateChannelName(channel);
    
        if (obj.has(channel, channels) && !channels[channel].writable) {
            throw new EventEmitterError(
                `Cannot redefine the channel "${channel}" because it is marked as non-writable.`,
                "NON_WRITABLE_CHANNEL"
            );
        }
    
        if (obj.has(channel, inWaitChannel)) {
            inWaitChannel[channel].forEach(function(item){
                item()
            })
            delete inWaitChannel[channel];
        }

        channels[channel] = { listener, removable, writable };
    }
    

    
    /**
     * **`removeEvent`**: Remove a registered channel.
     * 
     * This method removes a channel from the EventEmitter. If the channel is not marked as **`removable`**, 
     * it will throw an error.
     * 
     * @param {string} channel - The name of the channel to remove.
     * @throws {Error} If the channel is not removable.
     * 
     * **Example Usage**:
     * ```javascript
     * eventEmitter.removeEvent("myChannel");
     * ```
     */
    function removeChannel(channel) {
        checkState()
        validateChannelName(channel);
    
        if (!obj.has(channel, channels)) {
            throw new EventEmitterError(
                `Cannot remove the channel "${channel}" because it does not exist.`,
                "CHANNEL_NOT_FOUND"
            );
        }
    
        if (!channels[channel].removable) {
            throw new EventEmitterError(
                `Cannot remove the channel "${channel}" because it is marked as non-removable.`,
                "NON_REMOVABLE_CHANNEL"
            );
        }
    
        delete channels[channel];
    

        if (obj.has(channel, inWaitChannel)) {
            delete inWaitChannel[channel];
        }
    
        if (data && data.channel === channel) {
            data = null;
        }
        
    }
    
    /**
     * **`clear`**: Cleanup all registered channels and events.
     * 
     * This method removes all channels, listeners, and pending events from the EventEmitter. 
     * It ensures that no memory leaks occur and that the EventEmitter can be safely discarded.
     * 
     * **Example Usage**:
     * ```javascript
     * eventEmitter.clear();
     * ```
     */

    function clear() {
        checkState()
        Object.keys(channels).forEach(channel => {
            delete channels[channel];
        });
    
  
        Object.keys(inWaitChannel).forEach(channel => {
            delete inWaitChannel[channel];
        });
        
        Object.keys(EVENTS).forEach(meth => {
            EVENTS[meth] = checkState
        });

        data = null;
        EVENTS = null
        channels = null
        inWaitChannel = null
        isDestroyed = true
        return true
    }
    
    
     /**
     * **`eventsList`**: Get a list of all registered channels.
     * 
     * This method returns an array containing the names of all currently registered channels.
     * 
     * @returns {string[]} - Array of channel names.
     * 
     * **Example Usage**:
     * ```javascript
     * console.log("Registered channels:", eventEmitter.eventsList());
     * ```
     */
    let  eventsList  = ()=> Object.keys(channels)


        /**
     * **`hasEvent`**: Check if a channel exists.
     * 
     * This method verifies whether a channel is registered in the EventEmitter.
     * 
     * @param {string} channel - The name of the channel to check.
     * @returns {boolean} - Returns `true` if the channel exists, otherwise `false`.
     * 
     * **Example Usage**:
     * ```javascript
     * if (eventEmitter.hasEvent("myChannel")) {
     *     console.log("Channel exists!");
     * }
     * ```
     */
    let  hasEvent = (channel) => obj.has(channel, channels)


    let EVENTS =  {
        invoke,
        handle,
        removeEvent: removeChannel,
        removeChannel,
        hasEvent,
        eventsList,
        clear
    };

    return EVENTS
};


export { lsEmitter };


















