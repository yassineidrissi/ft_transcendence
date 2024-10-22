
class GameModes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const modes = document.createElement('div');
		modes.className = " w-100 h-100";
        modes.innerHTML = `<div class="d-flex justify-content-evenly">
                <game-mode title="CPU" ></game-mode>
                <game-mode title="Online"></game-mode>
                <game-mode title="Offline"></game-mode>
            </div>
            <tournament-mode></tournament-mode>										
        `

		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        .cursor-pointer{
			cursor: pointer;
		}`;
        this.shadowRoot.append(style, modes);
    }
}

customElements.define('game-modes', GameModes);