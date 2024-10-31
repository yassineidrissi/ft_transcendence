class History extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const history = document.createElement("div");
		history.className = "container text-light"
		history.id = "history-container"
		history.innerHTML = `
			<h1 class="mb-4">History</h1>
			<div id="history" class="container">
				<h2 class="my-4">20 Sep 2024</h2>
				<win-card></win-card>
				<win-card></win-card>
				<loss-card></loss-card>
				<draw-card></draw-card>
				<win-card></win-card>
				<h2 class="my-4">19 Sep 2024</h2>
				<win-card></win-card>
				<loss-card></loss-card>
				<!-- <win-card></win-card>
				<win-card></win-card>
				<loss-card></loss-card>
				<win-card></win-card>
				<win-card></win-card>
				<h2 class="my-4">16 Sep 2024</h2>
				<loss-card></loss-card>
				<win-card></win-card>
				<win-card></win-card>
				<loss-card></loss-card>
				<win-card></win-card>
				<win-card></win-card>
				<loss-card></loss-card>
				<win-card></win-card>
				<win-card></win-card>
				<loss-card></loss-card>-->
			</div>
		`
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
			#history-container
			{
				height: 100%;
			}
			#history {
				height: 80%;
				overflow-y: auto;
			}
			h1, h2 {
				font-family: "Orbitron", sans-serif;
			}
		`;
		this.shadowRoot.append(style);
        this.shadowRoot.append(history);
    }
}

customElements.define('history-page', History);