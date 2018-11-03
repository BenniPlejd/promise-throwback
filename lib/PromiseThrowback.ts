/**
 * @public
 * @class
 * @description
 * Helper class for asychronously returning a function's callback response.
 */
export class PromiseThrowback {
    /**
     * @private
     * @property {number}
     * @description
     * - Index of response argument in callback.
     * Optional.
     */
    private _indexOfResponse: number;

    /**
     * @private
     * @property {number}
     * @description
     * - Index of error argument in callback.
     * Optional.
     */
    private _indexOfError: number;

    /**
     * @private
     * @property {Promise<any>}
     * @description The Promise to use to retrieve the callback's response.
     */
    private _promise: Promise<any>;

    /**
     * @private
     * @property {(value?: any) => any}
     * @description Resolve callback for the Promise.
     */
    private _resolve: (value?: any) => any;

    /**
     * @private
     * @property {(reason?: any) => any}
     * @description Rejection callback for the Promise.
     */
    private _reject: (reason?: any) => any;

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
    public constructor(indexOfResponse?: number, indexOfError?: number) {
        // Specify argument indexes.
        this._indexOfResponse = indexOfResponse;
        this._indexOfError = indexOfError;

        // Store promise and its callbacks as internal properties,
        // so that they will be reachable outside of this constructor.
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    /**
     * @public
     * @property {(...args: any[]) => any}
     * @description
     * Generates a callback function, where the callback's response and errors
     * can be resolved through the result property.
     */
    public get callback(): (...args: any[]) => any {
        // Create callback function.
        return (...args) => {
            // If error argument index is specified,
            // then check whether error should occur through rejection.
            if (typeof (this._indexOfError) === 'number') {
                const error = args[this._indexOfError];

                if (error) {
                    // TODO: Fix so that uncaught error doesn't get caught when debugging in VS Code.
                    this._reject(error);

                    return;
                }
            }

            // If response index is specified,
            // then return it through resolving.
            if (typeof (this._indexOfResponse) === 'number') {
                this._resolve(args[this._indexOfResponse]);

                return;
            }

            // Otherwise return void.
            this._resolve();
        };
    }

    /**
     * @public
     * @property {Promise<any>}
     * @description Gets the response from the callback, as a Promise.
     */
    public get result(): Promise<any> {
        return this._promise;
    }
}
