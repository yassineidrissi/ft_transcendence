class Friend extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const friend = document.createElement('div');
		friend.className = "d-flex align-items-center justify-content-between mb-2";
		const name = this.getAttribute("name");
        friend.innerHTML = `<div class="d-flex align-items-center">
								<img src="./Core/Shared/assets/avatar.jpg" class="rounded me-2" height='32'></img>
								<span class="fs-6 fw-medium text-dark-emphasis">${name.length > 8 ? name.substring(0, 8) + "..." : name}</span>
							</div>
							<img id="invite" src="./Core/Shared/assets/plus.svg" width="24" height="24" class="cursor-pointer"></img>`
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
			#invite {
				background: #062E00;
				border-radius: 4px;
				
			}
			#invite:hover {
				background: #000;
			}
		`;
			
        this.shadowRoot.append(style, friend);
    }
}

customElements.define('single-friend', Friend);