class FriendsList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.friendsList = document.createElement('div');
		this.friendsList.className = "mt-4";
        // friendsList.innerHTML = `
		// 	<single-friend name="" img_url='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'></single-friend>
		// 	<single-friend name="Yassine idrissi" img_url='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'></single-friend>
		// 	<single-friend name="Amine l7atba" img_url='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'></single-friend>
		// `
		
		this.update()
		
		
		// ///s/df/sd/f/sd/f/s/df/s/df/
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
			
        this.shadowRoot.append(style, this.friendsList);
    }
	update(){
		Array.from(this.friendsList.children).forEach(child => child.remove());

		window.UserData.friends.forEach(friend => {
			const singleFriend = document.createElement('single-friend');
			singleFriend.setAttribute("name", friend.username);
			singleFriend.setAttribute("img_url", friend.img_url);
			singleFriend.setAttribute("id", friend.id);
			this.friendsList.append(singleFriend);
		});
	}
}

customElements.define('friends-list', FriendsList);