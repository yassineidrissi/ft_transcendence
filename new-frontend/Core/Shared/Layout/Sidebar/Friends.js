class Friends extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const friends = document.createElement('div');
		friends.className = "mt-4";
        friends.innerHTML = `<div class="d-flex align-items-center justify-content-between mb-2">
							<div id="overlay" class="z-3">
								<div class="modal h-75 w-75 bg-danger z-3">
									<h1 class="text-primary z-3">Discover New Friends<h1>
								</div>
							</div>
							<p class="fs-5 mb-0">Friends <span class="text-light-emphasis fw-medium">1/4</span></p>
							<img src="./Core/Shared/assets/add-user.svg" class="rounded cursor-pointer" ></img>
						</div>
		`
		friends.innerHTML += `<friends-list></friends-list>`;
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
			img:hover {
				background: #fff;
			}
			#overlay {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.7);
			}
		`;
			
        this.shadowRoot.append(style, friends);
    }
}

customElements.define('friends-section', Friends);