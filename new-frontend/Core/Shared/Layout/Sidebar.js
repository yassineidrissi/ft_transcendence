class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const sidebar = document.createElement('div');
        
		const style = document.createElement('style');
        style.textContent = `
            // max-width: 256px;
			`;
			
        this.shadowRoot.append(style, sidebar);
    }
}

customElements.define('sidebar', Sidebar);