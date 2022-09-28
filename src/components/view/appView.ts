import { News, DataNews } from './news/news';
import { Sources, DataSources } from './sources/sources';

interface Data {
    readonly sources: DataSources[];
    readonly articles: DataNews[];
}

class AppView {
    private readonly news: News;

    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Data): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Data): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export { AppView, Data };
