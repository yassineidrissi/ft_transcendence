class SearchFriend extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const friend = document.createElement('div');
        friend.id = "search-res-friend";
		friend.className = "d-flex justify-content-between align-items-center px-4 mb-2";
        friend.innerHTML = `<div class="d-flex align-items-center">
								<img src="./Core/Shared/assets/avatar.jpg" class="rounded me-2" height='32'></img>
								<p id="friend-name" class="mb-0 fs-5">Amine l7tba</p>
                                </div>
                            <button class=" text-light px-2 py-1 round">Send</button>`
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
			#search-res-friend button{
                background-color: #4AB1B9; 
                border: 2px solid #4AB1B9;
                border-radius: 2px;
                font-size: 1rem;
            }
            #search-res-friend button:hover {
                background-color: transparent; 
            }
            #friend-name
            {
                color: #D8E1E1;
            }
			
		`;
        this.shadowRoot.append(style, friend);
    }
}

customElements.define('search-friend', SearchFriend);