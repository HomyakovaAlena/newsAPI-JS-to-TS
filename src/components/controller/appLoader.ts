import { Loader } from './loader';

enum URLconfig {
    baselink = 'https://newsapi.org/v2/',
    apiKey = 'fad500235f9d4b72ad0ac2517507b33c',
}

class AppLoader extends Loader {
    public constructor() {
        super(URLconfig.baselink, { apiKey: URLconfig.apiKey });
    }
}

export default AppLoader;
