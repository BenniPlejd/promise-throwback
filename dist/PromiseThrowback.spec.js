"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PromiseThrowback_1 = require("./PromiseThrowback");
describe('PromiseThrowback - ', () => {
    it('Request with no callback arguments should be successful', async (done) => {
        const promiseThrowback = new PromiseThrowback_1.PromiseThrowback();
        // Run function with callback.
        ((callback) => {
            callback();
        })(promiseThrowback.callback);
        const response = await promiseThrowback.result;
        expect(response).toBeUndefined();
        done();
    });
    it('Request with index 0 callback argument should be successful', async (done) => {
        const promiseThrowback = new PromiseThrowback_1.PromiseThrowback(0);
        // Run function with callback.
        ((callback) => {
            // Return string through callback.
            callback('Lorem Ipsum');
        })(promiseThrowback.callback);
        const response = await promiseThrowback.result;
        expect(response).toBe('Lorem Ipsum');
        done();
    });
    it('Request with index larger than 0 callback argument should be successful', async (done) => {
        const promiseThrowback = new PromiseThrowback_1.PromiseThrowback(3);
        // Run function with callback.
        ((callback) => {
            // Return string through callback.
            callback(null, null, null, 'Lorem Ipsum');
        })(promiseThrowback.callback);
        const response = await promiseThrowback.result;
        expect(response).toBe('Lorem Ipsum');
        done();
    });
    it('Request with both response and error callback argument should throw error', async (done) => {
        const promiseThrowback = new PromiseThrowback_1.PromiseThrowback(0, 1);
        // Run function with callback.
        ((callback) => {
            const response = 'Lorem Ipsum';
            const error = new Error('Dolor Sit');
            try {
                // Return string through callback.
                callback(response, error);
            }
            catch (error) {
                console.error('error');
            }
        })(promiseThrowback.callback);
        try {
            await promiseThrowback.result;
        }
        catch (error) {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe('Dolor Sit');
            done();
            return;
        }
        done.fail('Throw was unexpectedly successful.');
        done();
    });
    it('Request with only error callback argument should throw error', async (done) => {
        const promiseThrowback = new PromiseThrowback_1.PromiseThrowback(null, 0);
        // Run function with callback.
        ((callback) => {
            const error = new Error('Dolor Sit');
            try {
                // Return string through callback.
                callback(error);
            }
            catch (error) {
                console.error('error');
            }
        })(promiseThrowback.callback);
        try {
            await promiseThrowback.result;
        }
        catch (error) {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe('Dolor Sit');
            done();
            return;
        }
        done.fail('Throw was unexpectedly successful.');
        done();
    });
});
//# sourceMappingURL=PromiseThrowback.spec.js.map