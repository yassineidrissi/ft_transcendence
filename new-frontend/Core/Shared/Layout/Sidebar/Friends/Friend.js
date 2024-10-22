class Friend extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const friend = document.createElement('div');
		friend.className = "d-flex justify-content-between mb-2";
		const name = this.getAttribute("name");
        friend.innerHTML = `<div class="d-flex align-items-center">
								<img src="./Core/Shared/assets/avatar.jpg" class="rounded me-2" height='32'></img>
								<span class="fs-6 fw-medium text-dark-emphasis">${name.length > 8 ? name.substring(0, 8) + "..." : name}</span>
							</div>
							<img src="./Core/Shared/assets/plus.svg" class="rounded cursor-pointer"></img>`
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
			img:hover {
				background: #000;
			}
		`;
			
        this.shadowRoot.append(style, friend);
    }
}

customElements.define('single-friend', Friend);