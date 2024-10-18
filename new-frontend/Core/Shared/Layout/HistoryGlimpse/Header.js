class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const header = document.createElement("div");
		header.className = "d-flex py-2 justify-content-between align-items-end"
		header.innerHTML = `<h1>History</h1>
							<p id="view-matches" class="text-white-50 me-4 cursor-pointer text-decoration-underline" onclick="navigateTo('history')">View All Matches</p>
						`;
		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'); .cursor-pointer{cursor: pointer;}`;
			
        this.shadowRoot.append(style, header);
    }
}

customElements.define('history-header', Header);