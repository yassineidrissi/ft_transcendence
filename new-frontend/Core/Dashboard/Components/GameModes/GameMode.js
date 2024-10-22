class GameMode extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const mode = document.createElement('div');
		mode.className = "border mode p-4 position-relative d-flex justify-content-center align-items-center";
        const title = this.getAttribute("title")
        mode.innerHTML = `
            <p class="fw-medium fs-3">${title}</p>
            <svg class="cursor-pointer" width="36" height="36" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            	<path fill-rule="evenodd" clip-rule="evenodd" d="M6.38281 5.00485L8.13181 4.06885L20.1318 12.0683V13.9403L8.13181 21.9413L6.38281 21.0053V5.00485ZM8.63281 7.10635V18.9023L17.4798 13.0043L8.63281 7.10635Z" fill="white"/>
            </svg>											
        `
		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        .cursor-pointer{
			cursor: pointer;
		}
        .mode {
            min-width: 360px;
            max-width: 360px;
            min-height: 120px;
        }
        svg {
            position: absolute;
            right: 10px;
            bottom: 8px;
        }
        `;
        this.shadowRoot.append(style, mode);
    }
}

customElements.define('game-mode', GameMode);