
export declare namespace _EventEmitter {

interface Event {
    send: (data: any) => void;
}

interface Channel {
    listener: (event: Event, ...args: any[]) => void;
    writable: boolean;
    removable: boolean;
}

interface InWaitChannel {
    [key: string]: () => void;
}


    /**
     * Creates a channel and attaches a listener to it.
     * @param channel - The name of the channel to create.
     * @param listener - The function to call when the channel is invoked.
     *                   The first parameter must always be `event`.
     * @param removable - Indicates whether the channel can be removed. Default is `true`.
     * @param writable - Indicates whether the channel can be overwritten. Default is `true`.
     */
  function  handle(
        channel: string,
        listener: (event: Event, ...args: any[]) => void,
        removable?: boolean,
        writable?: boolean
    ): void;

    /**
     * Invokes a channel, executing its listener if it exists.
     * @param channel - The name of the channel to invoke.
     * @param listener - A callback function executed after the channel listener, or `null`.
     * @param args - Additional arguments to pass to the channel listener.
     */
    function invoke(
        channel: string,
        listener?: (data: any) => void | null,
        ...args: any[]
    ): Promise<void>;

    /**
     * Removes a registered channel.
     * @param channel - The name of the channel to remove.
     * @throws Error if the channel is not removable.
     */
    function removeEvent(channel: string): void;

    /**
     * Checks if a channel exists.
     * @param channel - The name of the channel to check.
     * @returns True if the channel exists, otherwise false.
     */
   function  hasEvent(channel: string): boolean;

    /**
     * Gets a list of all registered channels.
     * @returns An array of channel names.
     */
   function eventsList(): string[];

    /**
     * Cleans up all registered channels and events.
     */
   function clear(): void;


}



