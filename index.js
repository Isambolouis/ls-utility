import { uuid } from "./uuid.js"
import * as leisCode from "./leisCode/index.js"
import { lsEmitter } from "./eventEmitter.js";


function isElementOf(item, list) {
    /* returns true if item given in the array given*/
    this.dict = {};
    list.forEach(element => {
        this.dict[element] = element;
    })
    if (item in this.dict) { return true }
    else { return false }
} 

function Union(item = []) {
    this.result = [];
    this.dict = {};
    for (var data = 0; data < item.length; data++) {
        for (var i = 0; i < item[data].length; i++) {
            if (item[data][i] in this.dict == false) {
                this.dict[item[data][i]] = item[data][i];
                this.result.push(item[data][i])
            }
        }
    }
    return this.result
}

function inter(item_1, item_2) {
    this.list = Union([item_1, item_2]);
    this.result = [];
    this.list.forEach(elem => {
        if (isElementOf(elem, item_1) && isElementOf(elem, item_2)) {
            this.result.push(elem)
        }
    })
    return this.result;
}


function countArray(arr, offset) {
    var counter = offset
    return function () {
        if (counter === arr.length - 1) counter = 0;
        var v = arr[counter];
        counter++;
        return v;
    }
}

// maths operators

function generateId(min = 0, max = 1) {
    const sy = "dh5263ayLogl";
    const num = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const lettUpc = letters.toLocaleUpperCase()
    const allItem = [sy, num, letters, lettUpc]
    let [res, i, y] = ["", 0, 0]
    const len = randint(min, max)

    while (y < len) {
        for (i = 0; i < allItem.length; i++) {
            let _c = allItem[Math.floor(Math.random() * allItem.length)]
            res += _c[Math.floor(Math.random() * _c.length)]
        }
        y++
    }
    return res
}

function choice(obj) {

    if (typeof obj === "object") {
        const _bj = Object.keys(obj)
        return (obj[_bj[Math.floor(Math.random() * _bj.length)]]);
    }
    else if (
        typeof obj === "function"
        || typeof obj === "boolean"
        || typeof obj === "undefined"
        || typeof obj === "symbol"
    ) {
        throw new Error(`can not execute a ${typeof obj}`)
    }
    else if (typeof obj === "number") {
        const _n = []
        for (let i = 0; i < obj; i++) { _n.push(i) }
        return _n[Math.floor(Math.random() * _n.length)]
    }
    else if (typeof obj === "string") {
        return obj[Math.floor(Math.random() * obj.length)]
    }
}

function randint(min, max) {

    if (typeof min === "number" && typeof max === "number") {
        const _p = []
        for (let _x = min; _x < max; _x++) {
            _p.push(_x)
        }
        return choice(_p)

    }
    else {
        throw new Error(`can not execute ${typeof min !== "number" ? typeof min : typeof max}`)
    }
}

function maxArray(array = []) {
    if (typeof array === "object") {
        if (typeof array.push !== "function")
            throw new Error(`can not execute a (an) ${typeof array}`)
        else {
            let _x = array[0]
            array.forEach(item => {
                _x = item > _x ? item : _x
            })
            return _x
        }
    }
}
function minArray(array = []) {
    if (typeof array === "object") {
        if (typeof array.push !== "function")
            throw new Error(`can not execute a (an) ${typeof array}`)
        else {
            let _x = array[0]
            array.forEach(item => {
                _x = item < _x ? item : _x
            })
            return _x
        }
    }
}
function reverse(obj) {
    if (typeof obj === "object") {

        let _type = typeof obj.push === "function" ? "a" : "o"
        if (_type === "a") {
            const _p = []
            for (let x = 0; x < obj.length; x++) {
                _p.push(obj[(obj.length - 1) - x])
            }
            return _p
        }
        else if (_type === "o") {
            const _o = {}
            const _xp = Object.keys(obj)
            _xp.forEach((item, i) => {
                _o[_xp[(_xp.length - 1) - i]] = obj[_xp[(_xp.length - 1) - i]]
            })
            return _o
        }

    }
    else if (
        typeof obj === "function"
        || typeof obj === "boolean"
        || typeof obj === "undefined"
        || typeof obj === "symbol"
        || typeof obj === "number"
    ) {
        throw new Error(`can not execute a ${typeof obj}`)
    }
    else if (typeof obj === "string") {
        let [_r, i] = ["", 0]
        for (let x of obj) {
            i++
            _r += obj[obj.length - i]
        }
        return _r
    }

}

function splitData(data, step, proto = "length") {
    let temp = []

    while (data[proto] > step) {
        temp.push(data.slice(data[proto] - step, data[proto]))
        data = data.slice(0, data[proto] - step)
    }

    if (data[proto] <= step) temp.push(data.slice())
    return temp
}


function inverseObject(_obj) {
    const result = {}
    loopObject(_obj, function (value, key) {
        result[value] = key
    })
    return result
}

function rangeList(num, offset = 0, step = 1) {
    const result = []
    for (let x = offset; x < num; x++) {
        if (x % step == 0) result.push(x)
    }
    return result
}

/**
 *  tests if an variable is not defined,
 * it returns `true` if the variable is not defined
 * otherwise it returns `false`
 * @param {*} obj 
 * @returns boolean
 */
function isUndefined(obj) { return !obj; }


function isArray(obj) {
    return obj.constructor.toString().indexOf("Array") > -1
};

function isObject(obj) {
    return obj.constructor.toString().indexOf("Object") > -1;
}

function isString(obj) {
    if (typeof obj === "string") {
        return true
    }
    return obj instanceof String
}

function isNumber(obj) {
    return !isNaN(obj)
}

function isFunction(obj) {
    return typeof obj === "function";
}

function setEmptyArray(arr) {
    return arr.splice(0, arr.length);
}

function isNone(obj) {
    return isString(obj) && obj == ""
}

function isEmpty(obj) {
    return obj.length === 0 || Object.keys(obj).length === 0
}

function has(prop, obj) {
    return obj.indexOf ? obj.indexOf(prop) > -1 : obj.hasOwnProperty(prop)
}
function isTypeOf(prop, obj) {
    return prop instanceof obj
}

function copyObject(obj, target, overwrite = false, ...exp) {
    if (!target) { target = {} };
    if (!obj) { obj = {} };
    Object.keys(obj).forEach(item => {
        if (!(has(item, target) && !overwrite)) {
            if (!has(item, exp)) {
                target[item] = obj[item];
                if (isArray(target)) { target[item] = obj[item] }
            }
        }
    });
    return target
}

function copyArray(arr, target, overwrite = false) {
    if (!target) { target = [] };
    if (!(!arr)) {
        arr.forEach((item, index) => {
            if (!(has(item, target) && !overwrite)) { target.push(item) }
        })
    }; return target
}


function getUrl(o) {
    return o.match(/http+(s|\b):\/\/[^ ]*(?=\b)+(\s|\b|\/)*/gi)
}

function hasUrl(o) {
    return !(!getUrl(o))
}

function arrayRemove(index, arr) {
    return arr.splice(index, 1)
}

function arrayReplace(index, value, arr) {
    return arr.splice(index, 1, value)
}

function arrayInsert(index, arr, args) {
    arr.splice(index, 0, args)
}

function tryCode(callback, error) {
    try { callback() } catch (e) { if (error) { error(e) } }
}

function after(s, func, ...args) {
    return setTimeout(func, s, args)
}


function loopObject(obj, callback = (value, key, index, finished) => value) {
    const result = []
    if (obj) {
        let c = 0; let f = false;
        for (var x in obj) {
            c++;
            c === Object.keys(obj).length ? f = true :
                f = false;
            callback(obj[x], x, c - 1, f);
            result.push(obj[x])
        }
    }
    return result
}

function bindFunc(fc, bc) {
    return function (...e) { return fc.call(bc, ...e) }
}

function arrAddWhen(arr, item, num1, num2, callback) {
    if (num1 <= num2) {
        if (arr) { arr.push(item) }; if (callback) {
            callback(item)
        }
    }
}


function arrBegin(condi, callback) {
    if (condi) { callback() }
}

function initObj(obj, value) {
    obj = obj ? obj : value
    return obj
}

function objKeysToLowerCase(o) {
    const target = {};
    loopObject(o, (item, x) => target[x.toLowerCase()] = item);
    return target
}


function filter(o, callback) {
    const r = {};
    loopObject(o, (...args) => {
        if (callback(...args)) { r[args[1]] = args[0] }
    }); return r
}


function defineObj(obj, proName, value, writable = false) {
    return Object.defineProperty(obj, proName, { value, writable })
}


function capitalize(value){
    if(typeof value === "string"){
        let cpv = value.slice(1)
        let cp = value[0].toUpperCase()
        return cp +cpv
    }

    return value
}


function toCamelKey (key){
    return key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}


function toKebabCase(obj) {
    let result = "{\n"
    Object.entries(obj).reduce((acc, [key, value]) => {
      const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();   
      result += `\t${kebabKey}: ${value};\n`;
      return acc;
    }, {});
    
    result += "\n}\n"
    return result
  }


function _EventEmitter(){
    return lsEmitter({ has, after, copyObject })
}
const event = _EventEmitter()



function genClass(){
    let letters = "abcdefghijklmnopqrstuvwxyz"
    let id = 0
    return function(){
        let ClassId = `${id}`.split('').map((chr)=> letters[parseInt(chr)]).join("")
        id += 1;
        return ClassId  
    }
}


function genXClass(){
    let letters = "abcdefghijklmnopqrstuvwxyz"
    let state = {_case : 0 , _char : 0, count : 1, lCount: 0}
    
    return function(){
   
        let result = ""
        if(state._char == 26){
            state._char = 0
            if(state._case == 0) state._case = 1
            else {     
                state._case = 0
                state.lCount += 1
            }
        }
        for (let i = 0; i < state.count; i++) {
            result += `${letters[state.lCount]}`
        }
        result += `${letters[state._char]}`

        state._char = state._char <= 25 ? (state._char +1) : 0
        if(state.lCount == 26){
            state.lCount = 0
            state.count += 1;
        }

        return  state._case == 0 ? result : result.toUpperCase()


    }
}

export {
    setEmptyArray,
    isNumber,
    isArray,
    isString,
    isObject,
    isFunction,
    isNone,
    isEmpty,
    isTypeOf,
    has,
    copyObject,
    copyArray,
    hasUrl,
    arrayRemove,
    arrayReplace,
    arrayInsert,
    tryCode,
    after,
    loopObject,
    bindFunc,
    arrAddWhen,
    arrBegin,
    initObj,
    objKeysToLowerCase,
    filter,
    defineObj,
    countArray,
    isElementOf,
    Union,
    inter,
    randint,
    choice,
    generateId,
    reverse,
    maxArray,
    minArray,
    uuid,
    splitData,
    inverseObject,
    leisCode,
    rangeList,
    isUndefined,
    capitalize,
    toCamelKey,
    event,
    _EventEmitter,
    toKebabCase,
    genClass,
    genXClass

}






