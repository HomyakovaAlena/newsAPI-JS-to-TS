import AppLoader from './appLoader';
import { CallBackOneParameter } from './loader';

class AppController extends AppLoader {
    getSources(callback: CallBackOneParameter): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: CallBackOneParameter): void {
        let { target } = e;
        console.log({ target });
        const sourcesContainer = e.currentTarget as HTMLElement;
        console.log({ sourcesContainer });

        while (target !== sourcesContainer) {
            if (!(target instanceof HTMLElement && target.classList.contains('source__item'))) return;
            const sourceId = target.getAttribute('data-source-id');
            if (sourceId && sourcesContainer.getAttribute('data-source') !== sourceId) {
                sourcesContainer.setAttribute('data-source', sourceId);
                super.getResp({ endpoint: 'everything', options: { sources: sourceId } }, callback);
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
