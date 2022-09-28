import { Loader } from './loader';

enum URLconfig {
    baselink = 'https://newsapi.org/v2/',
    apiKey = 'c75b740205d64e729211a583a172d058',
}

class AppLoader extends Loader {
    public constructor() {
        super(URLconfig.baselink, { apiKey: URLconfig.apiKey });
    }
}

export default AppLoader;
