import './sources.css';

interface DataSources {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

class Sources {
    draw(data: DataSources[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as DocumentFragment;
            const itemElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
            itemElement.textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });
        const sourcesContainer = document.querySelector('.sources');
        sourcesContainer?.append(fragment);
    }
}

export { Sources, DataSources };
