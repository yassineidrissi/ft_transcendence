
class GameModes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const modes = document.createElement('div');
		modes.className = "  container mb-2";
        modes.innerHTML = `<div id="modes" class="d-flex mb-2 ">
                <game-mode color="#CD0024" title="CPU" ></game-mode>
                <game-mode color="#B98500" title="Online"></game-mode>
                <game-mode color="#5510BF" title="Offline"></game-mode>
            </div>
            <tournament-mode></tournament-mode>										
        `

		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        .cursor-pointer{
			cursor: pointer;
		}
        #modes {
            gap: 20px;
        }    
        `;
        this.shadowRoot.append(style, modes);
    }
}

customElements.define('game-modes', GameModes);