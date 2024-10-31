class FriendsList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const friendsList = document.createElement('div');
		friendsList.className = "mt-4";
        friendsList.innerHTML = `
			<single-friend name="Ramzy Chahbani" ></single-friend>
			<single-friend name="Yassine idrissi"></single-friend>
			<single-friend name="Amine l7atba"></single-friend>
		`
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
		`;
			
        this.shadowRoot.append(style, friendsList);
    }
}

customElements.define('friends-list', FriendsList);