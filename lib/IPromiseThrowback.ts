export interface IPromiseThrowback {
    callback: (...args: any[]) => any;
    result: Promise<any>;
}
