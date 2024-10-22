class Dashboard extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const dashboard = document.createElement("div");
		dashboard.className = "container"
		dashboard.innerHTML = `
			<div class="d-flex">
                <h1 class="me-2 mb-3">Game Modes</h1>
                <img src="./Core/Dashboard/assets/modes.svg"></img>
            </div>
			<game-modes><game-modes>
			<tournaments-section></tournaments-section>
		`
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
		`;
		this.shadowRoot.append(style);
        this.shadowRoot.append(dashboard);
    }
}

customElements.define('dashboard-page', Dashboard);