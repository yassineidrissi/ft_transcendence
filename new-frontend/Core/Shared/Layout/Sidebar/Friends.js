class Friends extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		this.isModalOpen = false;
        this.render();
	}
	render() {
		const friends = document.createElement('div');
		friends.className = "mt-4";
		const modalVisibility = this.isModalOpen ? "" : "d-none";
		friends.innerHTML = `
		<search-friend-modal class="${modalVisibility}"></search-friend-modal>
			<div class="d-flex align-items-center justify-content-between mb-2">
				<p class="fs-5 mb-0">Friends <span class="text-light-emphasis fw-medium">1/4</span></p>
				<img src="./Core/Shared/assets/add-user.svg" class="rounded cursor-pointer" id="add-friend" />
			</div>
			<friends-list></friends-list>
		`;

		const style = document.createElement('style');
		style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer {
				cursor: pointer;
			}
		`;
		this.shadowRoot.innerHTML = '';
		this.shadowRoot.append(style, friends);
		this.shadowRoot.getElementById("add-friend").addEventListener("click", () => {
			this.isModalOpen = true; 
			this.render();
		});
	}
}

customElements.define('friends-section', Friends);