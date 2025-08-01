

// utils.d.ts
 import * as leisCode from "./leisCode/index.js";
    import { uuid } from "./uuid.js";
    import { lsEmitter } from "./eventEmitter.js";
/**
 * Leistrap Utility Module Type Declarations
 * Provides a set of helper functions for array, object, string, math, and more.
 */

declare module "utility" {
   
    // Helper types
    type AnyObject = Record<string, any>;
    type CallbackFn<T = any> = (...args: T[]) => any;
    type LoopCallback = (value: any, key: string, index: number, finished: boolean) => void;

    export function setEmptyArray<T>(arr: T[]): T[];

    export function isNumber(obj: any): obj is number;
    export function isArray(obj: any): obj is any[];
    export function isString(obj: any): obj is string;
    export function isObject(obj: any): obj is object;
    export function isFunction(obj: any): obj is Function;

    export function isNone(obj: any): boolean;
    export function isEmpty(obj: any): boolean;
    export function isTypeOf(prop: any, type: Function): boolean;
    export function has(prop: string, obj: object | any[]): boolean;

    export function copyObject<T extends object>(obj: T, target?: T, overwrite?: boolean, ...exclude: string[]): T;
    export function copyArray<T>(arr: T[], target?: T[], overwrite?: boolean): T[];

    export function hasUrl(o: string): boolean;
    export function getUrl(o: string): string[] | null;

    export function arrayRemove<T>(index: number, arr: T[]): T[];
    export function arrayReplace<T>(index: number, value: T, arr: T[]): T[];
    export function arrayInsert<T>(index: number, arr: T[], item: T): void;

    export function tryCode(callback: () => void, error?: (e: Error) => void): void;
    export function after(delay: number, func: (...args: any[]) => void, ...args: any[]): number;

    export function loopObject(obj: AnyObject, callback?: LoopCallback): any[];

    export function bindFunc(fc: Function, context: any): Function;

    export function arrAddWhen<T>(arr: T[], item: T, num1: number, num2: number, callback?: (item: T) => void): void;
    export function arrBegin(cond: boolean, callback: () => void): void;

    export function initObj<T>(obj: T | undefined, value: T): T;

    export function objKeysToLowerCase(o: AnyObject): AnyObject;

    export function filter<T = any>(o: Record<string, T>, callback: (value: T, key: string) => boolean): Record<string, T>;

    export function defineObj<T = any>(obj: object, key: string, value: T, writable?: boolean): object;

    export function countArray<T>(arr: T[], offset: number): () => T;

    export function isElementOf<T>(item: T, list: T[]): boolean;

    export function Union<T = any>(items: T[][]): T[];

    export function inter<T = any>(item1: T[], item2: T[]): T[];

    export function randint(min: number, max: number): number;

    export function choice<T = any>(obj: T[] | string | object | number): any;

    export function generateId(min?: number, max?: number): string;

    export function reverse(obj: any[] | string | AnyObject): any[] | string | AnyObject;

    export function maxArray(arr: number[]): number;
    export function minArray(arr: number[]): number;

    export function splitData<T>(data: T[], step: number, proto?: keyof T[] | "length"): T[][];

    export function inverseObject(obj: AnyObject): AnyObject;

    export function rangeList(num: number, offset?: number, step?: number): number[];

    export function isUndefined(obj: any): boolean;

    export function capitalize(value: string): string;

    export function toCamelKey(key: string): string;

    export function toKebabCase(obj: Record<string, any>): string;

    export function _EventEmitter(): ReturnType<typeof lsEmitter>;

    export const event: ReturnType<typeof lsEmitter>;

    export function genClass(): () => string;

    export function genXClass(): () => string;

    export { leisCode, uuid };
}
