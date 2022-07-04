import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'b4a5ea8573c44024848fb373971749e1', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
