import './sources.css';

type DataSources = Required<DataSourcesRequired> & Partial<DataSourcesOptional>;

interface DataSourcesRequired {
    readonly id: string;
    readonly name: string;
}

interface DataSourcesOptional {
    readonly category: string;
    readonly country: string;
    readonly description: string;
    readonly language: string;
    readonly url: string;
}

class Sources {
    public draw(data: DataSources[]): void {
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
