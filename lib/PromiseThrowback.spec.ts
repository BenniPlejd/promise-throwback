import { PromiseThrowback } from './PromiseThrowback';

describe('PromiseThrowback - ', () => {
    it('Request with no callback arguments should be successful', async (done) => {
        const promiseThrowback = new PromiseThrowback();

        // Run function with callback.
        ((callback) => {
            callback();
        })(promiseThrowback.throwback);

        setTimeout(promiseThrowback.throwback, 0);

        const response = await promiseThrowback.responseAsync();

        expect(response).toBeUndefined();

        done();
    });

    it('Request with index 0 callback argument should be successful', async (done) => {
        const promiseThrowback = new PromiseThrowback(0);

        // Run function with callback.
        ((callback) => {
            // Return string through callback.
            callback('Lorem Ipsum');
        })(promiseThrowback.throwback);

        const response = await promiseThrowback.responseAsync();

        expect(response).toBe('Lorem Ipsum');

        done();
    });

    it('Request with index larger than 0 callback argument should be successful', async (done) => {
        const promiseThrowback = new PromiseThrowback(3);

        // Run function with callback.
        ((callback) => {
            // Return string through callback.
            callback(null, null, null, 'Lorem Ipsum');
        })(promiseThrowback.throwback);

        const response = await promiseThrowback.responseAsync();

        expect(response).toBe('Lorem Ipsum');

        done();
    });

    it('Request with both response and error callback argument should throw error', async (done) => {
        const promiseThrowback = new PromiseThrowback(0, 1);

        // Run function with callback.
        ((callback) => {
            const response = 'Lorem Ipsum';
            const error = new Error('Dolor Sit');

            try {
                // Return string through callback.
                callback(response, error);
            } catch (error) {
                console.error('error');
            }
        })(promiseThrowback.throwback);

        try {
            await promiseThrowback.responseAsync();
        } catch (error) {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe('Dolor Sit');

            done();

            return;
        }

        done.fail('Throw was unexpectedly successful.');
        done();
    });

    it('Request with only error callback argument should throw error', async (done) => {
        const promiseThrowback = new PromiseThrowback(null, 0);

        // Run function with callback.
        ((callback) => {
            const error = new Error('Dolor Sit');

            try {
                // Return string through callback.
                callback(error);
            } catch (error) {
                console.error('error');
            }
        })(promiseThrowback.throwback);

        try {
            await promiseThrowback.responseAsync();
        } catch (error) {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe('Dolor Sit');

            done();

            return;
        }

        done.fail('Throw was unexpectedly successful.');
        done();
    });
});
