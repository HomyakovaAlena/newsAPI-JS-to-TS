import './news.css';

interface DataNews {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
}

class News {
    draw(data: DataNews[]): void {
        console.log({ data }, 'news');
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: (HTMLElement & { content: HTMLElement }) | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp === null || !(newsItemTemp instanceof HTMLElement)) {
                return;
            }
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            const newsItem = newsClone.querySelector('.news__item');
            if (newsItem === null || !(newsItem instanceof HTMLElement)) {
                return;
            }
            if (idx % 2) newsItem.classList.add('alt');

            const newsPhoto = newsClone.querySelector('.news__meta-photo');
            if (newsPhoto === null || !(newsPhoto instanceof HTMLElement)) {
                return;
            }
            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsAuthor = newsClone.querySelector('.news__meta-author');
            if (newsAuthor === null || !(newsAuthor instanceof HTMLElement)) {
                return;
            }
            newsAuthor.textContent = item.author || item.source.name;

            const newsDate = newsClone.querySelector('.news__meta-date');
            if (newsDate === null || !(newsDate instanceof HTMLElement)) {
                return;
            }
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsTitle = newsClone.querySelector('.news__description-title');
            if (newsTitle === null || !(newsTitle instanceof HTMLElement)) {
                return;
            }
            newsTitle.textContent = item.title;

            const newsSourceName = newsClone.querySelector('.news__description-source');
            if (newsSourceName === null || !(newsSourceName instanceof HTMLElement)) {
                return;
            }
            newsSourceName.textContent = item.source.name;

            const newsDescription = newsClone.querySelector('.news__description-content');
            if (newsDescription === null || !(newsDescription instanceof HTMLElement)) {
                return;
            }
            newsDescription.textContent = item.description;

            const newsReadMore = newsClone.querySelector('.news__read-more a');
            if (newsReadMore === null || !(newsReadMore instanceof HTMLElement)) {
                return;
            }
            newsReadMore.setAttribute('href', item.url);
            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer === null || !(newsContainer instanceof HTMLElement)) {
            return;
        }
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export { News, DataNews };
