class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const sidebar = document.createElement('div');
        
		const style = document.createElement('style');
        style.textContent = `
            
			`;
			
        this.shadowRoot.append(style, sidebar);
    }
}

customElements.define('sidebar', Sidebar);