import './sources.css';

enum Category {
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
}

interface DataSources {
    category: Category;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

class Sources {
    draw(data: DataSources[]): void {
        console.log({ data }, 'sources');
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: (Element & { content: Element }) | null = document.querySelector('#sourceItemTemp');
        console.log(sourceItemTemp, 'sources');

        data.forEach((item: DataSources) => {
            if (sourceItemTemp === null || !(sourceItemTemp instanceof Element)) {
                return;
            }
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            console.log({ sourceClone }, 'sourcessssclone');
            const itemElement = sourceClone.querySelector('.source__item-name');
            if (itemElement) {
                itemElement.textContent = item.name;
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
            }
        });
        const sourcesElement = document.querySelector('.sources');
        if (!sourcesElement) return;
        sourcesElement.append(fragment);
    }
}

export { Sources, DataSources };
