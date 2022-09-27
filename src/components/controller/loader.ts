import { Data } from '../view/appView';

interface LoaderFunc {
    readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    readonly callback: CallBackFunc<Data, void>;
    readonly options?: Options;
    readonly endpoint: 'sources' | 'everything';
}

type RequestConfig = Pick<LoaderFunc, 'options' | 'endpoint'>;
interface Options {
    readonly [key: string]: string;
}

interface CallBackFunc<T, U> {
    (arg: T): U;
}

abstract class Loader {
    private readonly baseLink: string;

    private readonly options: Options;

    protected constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: RequestConfig,
        callback: CallBackFunc<Data, void> = () => {
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

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl({ options, endpoint }: RequestConfig): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: keyof Options) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    private load({ method, endpoint, callback, options }: LoaderFunc): void {
        fetch(this.makeUrl({ options, endpoint }), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data: Data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export { Loader, CallBackFunc };
