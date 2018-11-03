import { IPromiseThrowback } from './IPromiseThrowback';
/**
 * @public
 * @class
 * @description
 * Helper class for asychronously returning a function's callback response.
 */
export declare class PromiseThrowback implements IPromiseThrowback {
    /**
     * @private
     * @property {number}
     * @description
     * - Index of response argument in callback.
     * Optional.
     */
    private _indexOfResponse;
    /**
     * @private
     * @property {number}
     * @description
     * - Index of error argument in callback.
     * Optional.
     */
    private _indexOfError;
    /**
     * @private
     * @property {Promise<any>}
     * @description The Promise to use to retrieve the callback's response.
     */
    private _promise;
    /**
     * @private
     * @property {(value?: any) => any}
     * @description Resolve callback for the Promise.
     */
    private _resolve;
    /**
     * @private
     * @property {(reason?: any) => any}
     * @description Rejection callback for the Promise.
     */
    private _reject;
    /**
     * @public
     * @constructor
     * @description Creates instance of PromiseThrowback.
     * @param {number} [indexOfResponse]
     * - Index of response argument in callback.
     * If not specified then the response will be void.
     * @param {number} [indexOfError]
     * - Index of error argument in callback.
     * If the specified argument exists then an error will be returned.
     * If not specified then no error checks will be performed.
     */
    constructor(indexOfResponse?: number, indexOfError?: number);
    /**
     * @public
     * @property {(...args: any[]) => IThrowbackCallback}
     * @description
     * Generates a callback function, where the callback's response and errors
     * can be resolved through the result property.
     */
    readonly callback: (...args: any[]) => any;
    /**
     * @public
     * @property {Promise<any>}
     * @description Gets the response from the callback, as a Promise.
     */
    readonly result: Promise<any>;
}
