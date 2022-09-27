import AppLoader from './appLoader';
import { CallBackFunc } from './loader';

class AppController extends AppLoader {
    getSources(callback: CallBackFunc): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: CallBackFunc): void {
        let { target } = e;
        const sourcesContainer = e.currentTarget as HTMLElement;

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
