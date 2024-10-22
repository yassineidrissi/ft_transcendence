class SearchFriendModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const searchFriendModal = document.createElement('div');		
        searchFriendModal.className = `z-3 position-absolute top-0 start-0 end-0 bottom-0 ${this.getAttribute("class")}`;
        searchFriendModal.id = "overlay";
        searchFriendModal.innerHTML = `<div class="h-75 position-absolute pt-4 top-50 start-50 translate-middle w-75 d-flex flex-column justify-content-start align-items-center bg-dark z-3">
									<img id="close-modal" src="./Core/Shared/assets/exit.svg" class="position-absolute top-0 end-0 cursor-pointer" ></img>
									<h1 class="text-light fw-bold">Discover New Friends<h1>
									<input class="form-control search-input  mb-4 flex" id="search-friend" type="text" placeholder="Search friends">
									<div class="friends-search-results">
										<search-friend></search-friend>
										<search-friend></search-friend>
										<search-friend></search-friend>
									</div>
								</div>
        `;
		
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
            #overlay {	
				background: rgba(0, 0, 0, 0.7);
			}
            .friends-search-results
			{
				width: 480px;
			}
			#close-modal:hover{
				background: #4AB1B9;
			}
            
		`;
        this.shadowRoot.append(style, searchFriendModal);
        this.shadowRoot.querySelector('#close-modal').addEventListener('click', () => {
            this.closeModal();
        });
    }
	closeModal() {
		this.remove();
	}
}

customElements.define('search-friend-modal', SearchFriendModal);