class Settings extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const settings = document.createElement("div");
		settings.className = "z-3 position-absolute top-0 start-0 end-0 bottom-0"
		settings.id = "overlay"
		settings.innerHTML = `
					<img id="close" src="./Core/Shared/assets/exit.svg" class="position-absolute top-0 end-0 cursor-pointer	" ></img>
					<button id="delete-acc" class="position-absolute bottom-0 end-0 m-4 fs-4 px-4 py-1 border fw-medium bg-danger  border-danger text-light">Delete account</button>
					<h1 class="ms-4 mt-4 mb-4 ">Settings</h1>
					<div class="ms-4">
						<h2 class="text-secondary fs-4">Username</h2>
						<p class="fs-4 mb-0">NoobMaster69</p>
						<span class="fs-6 fw-light text-info cursor-pointer text-decoration-underline d-inline-block mb-5">Change username</span>
					<div>
					<div class="">
						<h2 class="text-secondary fs-4">Password</h2>
						<p class="fs-4 mb-0">***************</p>
						<span class="fs-6 fw-light text-info cursor-pointer text-decoration-underline d-inline-block mb-5">Change password</span>
					<div>
					<div>
						<h2 class="text-secondary fs-4">Activate 2FA <span class="text-success fw-light ms-2 fs-6">Enabled</span></h2>
						<p class="fs-6">Enable two-factor authentication (2FA) for enhanced account protection.</p>
						<button id="fa-btn" class="fs-6 border fw-medium  border-danger text-light">Disable</button>
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
			#fa-btn {
				background: #dc3545;
			}
			#fa-btn:hover
			{
				background: red;
			}
		`;
		this.shadowRoot.append(style);
        this.shadowRoot.append(settings);
		this.shadowRoot.getElementById("close").addEventListener("click", () => {
			this.setAttribute('isSettingsModalOpen', false)
			this.remove()
		})
		this.shadowRoot.getElementById("delete-acc").addEventListener("click", () => {
			
		})
    }
}

customElements.define('settings-modal', Settings);