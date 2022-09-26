import AppController from '../controller/controller';
import { AppView } from '../view/appView';
// import { DOMEvent } from '../utils/utils';

class App {
    controller: AppController;

    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e) => {
                if (e !== null && e.target instanceof HTMLElement) {
                    this.controller.getNews(e, (data) => this.view.drawNews(data));
                }
            });
            this.controller.getSources((data) => this.view.drawSources(data));
        }
    }
}

export default App;
