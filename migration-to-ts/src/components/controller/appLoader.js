import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'b4a5ea8573c44024848fb373971749e1', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
