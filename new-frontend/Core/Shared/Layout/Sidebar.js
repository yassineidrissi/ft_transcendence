class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const sidebar = document.createElement('div');
		sidebar.className = `bg-primary-subtle ${this.getAttribute("class")} p-3 vh-100`;
		sidebar.innerHTML += `<sidebar-header></sidebar-header>`;
		sidebar.innerHTML += `<friends-section></friends-section>`;
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
		`;
        this.shadowRoot.append(style, sidebar);
    }
}

customElements.define('layout-sidebar', Sidebar);