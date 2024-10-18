class Dashboard extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const container = document.createElement("div");
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
		`;
		this.shadowRoot.append(style);
        this.shadowRoot.append(container);
    }
}

customElements.define('dashboard-page', Dashboard);