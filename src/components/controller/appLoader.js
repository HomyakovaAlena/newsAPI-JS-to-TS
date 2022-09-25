import Loader from './loader.ts';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'c75b740205d64e729211a583a172d058',
        });
    }
}

export default AppLoader;
