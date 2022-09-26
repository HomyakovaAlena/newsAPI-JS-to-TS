import AppLoader from './appLoader';
// import { DOMEvent } from '../utils/utils';

// interface HandleNameChangeInterface {
//     target: HTMLElement;
//     currentTarget: HTMLElement;
// }

class AppController extends AppLoader {
    getSources(callback: <T>(...args: T[]) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: <T>(...args: T[]) => void): void {
        let { target } = e;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof Element && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (
                    // eslint-disable-next-line prettier/prettier, operator-linebreak
                    newsContainer instanceof Element && sourceId &&
                    newsContainer.getAttribute('data-source') !== sourceId
                ) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            if (target !== null && target instanceof Element) {
                target = target.parentNode;
            }
        }
    }
}

export default AppController;
