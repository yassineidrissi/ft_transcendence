class HistoryGlimpse extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const history = document.createElement("div");
		const showHistory = JSON.parse(this.getAttribute("showHistory"));
		history.className = `history ${this.getAttribute("class")} flex h-100 ${!showHistory && "invisible" } p-2`;
		history.innerHTML = `<history-header></history-header>`
		history.innerHTML += `<input type="date" class="mb-4 flex " ></input>`
		history.innerHTML += `<scores-list></scores-list>`
		const style = document.createElement('style');
		style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
		`;
        this.shadowRoot.append(style, history);
    }
}

customElements.define('history-glimpse', HistoryGlimpse);