export function promiseify<T>(cb: Function) {
    return function() {
        const args = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        return new Promise<T>((res, rej) => {
            cb(args, function(err: Error, data: T) {
                if (err) {
                    return rej(err);
                }
                res(data);
            });
        });
    };
};