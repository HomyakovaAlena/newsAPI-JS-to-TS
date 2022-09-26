function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
        throw new Error('Node expected');
    }
}

function assertIsHTMLElement(e: EventTarget | null): asserts e is HTMLElement {
    if (!e || e === null || !('tagName' in e)) {
        throw new Error('Element expected');
    }
}

type DOMEvent = Event & {
    readonly target: HTMLElement;
    readonly currentTarget: HTMLElement;
};

export { assertIsNode, assertIsHTMLElement, DOMEvent };
