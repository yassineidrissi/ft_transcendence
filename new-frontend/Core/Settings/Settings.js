class Settings extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		this.isFaEnabled  = false;
		this.editUsernameMode = false;
		this.editPasswordMode = false;
		this.username = `NoobMaster69`;
		this.password = `chi haja`;
		this.handleUsername();
		this.handlePassword();
		this.render()
    }
	render ()
	{
		const settings = document.createElement("div");
		settings.className = "z-3 position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center text-light"
		settings.id = "overlay"
		settings.innerHTML = `
					<div id="modal" class="position-relative">
						<img id="close" src="./Core/Shared/assets/exit.svg" class="position-absolute top-0 end-0 cursor-pointer	" ></img>
						<button id="delete-acc" class="position-absolute bottom-0 end-0 m-4 fs-4 px-4 py-1 border fw-medium bg-danger  border-danger text-light">Delete account</button>
						<h1 class="ms-4 mt-4 mb-4 ">Settings</h1>
						<div class="ms-4">
							<h2 class="text-secondary fs-4">Profile photo</h2>
							<input id="file-input" type="file" class="mb-4" />
						<div>
						<div class="">
							<h2 class="text-secondary fs-4">Username</h2>
							${this.editUsernameMode ? `<input id="username-input" type="text" value="${this.username}" class="mb-4" />`  : `<p class="fs-4 ">${this.username}</p>`}
							${this.editUsernameMode ? 
								`<div class="mb-4"><button id="save-username-change" class="me-2 px-2 border" >Save</button><button id="cancel-username-change" class="px-2 border" >Cancel</button></div>` 
								: `<span id="change-username-btn" class="fs-6 fw-light text-info cursor-pointer text-decoration-underline d-inline-block mb-5">Change username</span>`} 
						<div>
						<div class="">
							<h2 class="text-secondary fs-4">Password</h2>
							${this.editPasswordMode ? `<input id="password-input" type="text" value="${this.password}" class="mb-4" />`  : `<p class="fs-4 ">${this.password}</p>`}
							${this.editPasswordMode ? `<div class="mb-4"><button id="save-password-change" class="me-2 px-2 border" >Save</button><button id="cancel-password-change" class="px-2 border" >Cancel</button></div>` 
								: `<span id="change-password-btn" class="fs-6 fw-light text-info cursor-pointer text-decoration-underline d-inline-block mb-5">Change password</span>`} 
						<div>
						<div>
							${this.isFaEnabled ? `<h2 class="text-secondary fs-4">Activate 2FA <span class="text-success fw-light ms-2 fs-6">Enabled</span></h2>`
							: `<h2 class="text-secondary fs-4">Activate 2FA <span class="text-danger fw-light ms-2 fs-6">Disabled</span></h2>`}
							<p class="fs-6">Enable two-factor authentication (2FA) for enhanced account protection.</p>
							<!-- <button id="fa-btn" class="fs-6 border fw-medium  border-danger text-light">Disable</button> -->
							${this.isFaEnabled ? `<button id="disable-fa" class="fs-6 border fw-medium bg-danger  border-danger text-light px-2">Disable</button>` 
								: `<button id="enable-fa" class="fs-6 border fw-medium bg-success border-success text-light px-2">Enable</button>` }
						</div>
					</div>
		`
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			 @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
			h1{
				font-family: "Orbitron", sans-serif;
			}
			.cursor-pointer
			{
				cursor: pointer;
			}
			#overlay {	
				background: rgba(0, 0, 0, 0.7);
			}
			#modal {
				border-radius: 10px;
				background: #061924;
				height: 85%;
				width: 30%;
			}
			#close:hover {
				background: #0dcaf0;
			}
		`;
		this.shadowRoot.innerHTML = '';
		this.shadowRoot.append(style);
        this.shadowRoot.append(settings);
		this.shadowRoot.getElementById("close").addEventListener("click", () => {
			this.setAttribute('isSettingsModalOpen', false)
			this.remove()
		})
		this.shadowRoot.getElementById("delete-acc").addEventListener("click", () => {
			
		})
		if (this.shadowRoot.getElementById("change-username-btn"))
		{
			this.shadowRoot.getElementById("change-username-btn").addEventListener("click", () => {
				this.editUsernameMode = true;
				this.render()
			})
		}
		if (this.shadowRoot.getElementById("change-password-btn"))
		{
			this.shadowRoot.getElementById("change-password-btn").addEventListener("click", () => {
				this.editPasswordMode = true;
				this.render()
			})
		}
		if (this.shadowRoot.getElementById("cancel-username-change"))
		{
			this.shadowRoot.getElementById("cancel-username-change").addEventListener("click", () => {
				this.editUsernameMode = false;
				this.render()
			})
		}
		if (this.shadowRoot.getElementById("cancel-password-change"))
		{
			this.shadowRoot.getElementById("cancel-password-change").addEventListener("click", () => {
				this.editPasswordMode = false;
				this.render()
			})
		}
		if (this.shadowRoot.getElementById("disable-fa"))
		{
			this.shadowRoot.getElementById("disable-fa").addEventListener("click", () => {
				this.isFaEnabled = false;
				this.render()
			})
		}
		if (this.shadowRoot.getElementById("enable-fa"))
		{
			this.shadowRoot.getElementById("enable-fa").addEventListener("click", () => {
				this.isFaEnabled = true;
				this.render()
			})
		}
		if (this.shadowRoot.getElementById("username-input"))
		{
			let newUsername = "";
			this.shadowRoot.getElementById("username-input").addEventListener("change", (e) => {
				newUsername = e.target.value;
			})
			this.shadowRoot.getElementById("save-username-change").addEventListener("click", () => {
				this.username = newUsername;
				this.editUsernameMode = false;
				this.render()
			})
		}
		if (this.shadowRoot.getElementById("password-input"))
		{
			let newPassword = "";
			this.shadowRoot.getElementById("password-input").addEventListener("change", (e) => {
				newPassword = e.target.value;
			})
			this.shadowRoot.getElementById("save-password-change").addEventListener("click", () => {
				this.password = newPassword;
				this.editPasswordMode = false;
				this.render()
			})
		}
	}
	handleUsername ()
	{
	}
	handlePassword ()
	{
	}
}

customElements.define('settings-modal', Settings);