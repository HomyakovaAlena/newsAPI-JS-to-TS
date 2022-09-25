interface Resp {
    options?: Options;
    endpoint?: string;
}

interface Options {
    [key: string]: string | number;
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type BaseLink = string;

interface LoaderFunc<T> extends Resp {
    method: Method;
    endpoint: Resp['endpoint'];
    callback: (data: T) => void;
}

abstract class Loader {
    baseLink: BaseLink;

    options: Options;

    constructor(baseLink: BaseLink, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: Resp,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load({
            method: 'GET',
            endpoint,
            callback,
            options,
        });
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl({ options, endpoint = '' }: Resp): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: keyof Options) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>({ method, endpoint, callback, options }: LoaderFunc<T>): void {
        fetch(this.makeUrl({ options, endpoint }), { method })
            .then(this.errorHandler.bind(this))
            .then<T>((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
