import { News, DataNews } from './news/news';
import { Sources, DataSources } from './sources/sources';

interface Data {
    sources: DataSources[];
    articles: DataNews[];
}

class AppView {
    news: News;

    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export { AppView, Data };
