class Win extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const win = document.createElement("div");
		win.className = "w-100 d-flex align-items-center justify-content-between px-2"
		win.id = "win"
		win.innerHTML = `
				<div class="d-flex align-items-center">
					<img src="./Core/Shared/assets/avatar.jpg" class="mb-0 me-2	 rounded" width="84" ></img>
					<p class="mb-0 fs-5 fw-medium">NoobMaster69</p>
				</div>
				<div class="mb-0 d-flex align-items-center fw-bold fs-3 w-25 justify-content-between px-4"> <span class="d-inline-block fs-3">21</span> -  <span class="d-inline-block fs-3">8</span></div>
				<div class="d-flex align-items-center">
					<p class="mb-0 me-2 fs-5 fw-medium">NoobMaster69</p>
					<img src="./Core/Shared/assets/avatar.jpg" class="m-0 rounded" width="84" ></img>
				</div>
		`
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
			div {
				border-radius: 4px;
				height: 64px;
				margin-bottom: 4px;
			}
			#win {
				border-right: 8px solid #04f480;
				background: rgb(3,85,15);
				background: -moz-linear-gradient(90deg, rgba(3,85,15,1) 0%, rgba(13,166,92,1) 100%);
				background: -webkit-linear-gradient(90deg, rgba(3,85,15,1) 0%, rgba(13,166,92,1) 100%);
				background: linear-gradient(90deg, rgba(3,85,15,1) 0%, rgba(13,166,92,1) 100%);
				filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#03550f",endColorstr="#0da65c",GradientType=1);
			}
		`;
		this.shadowRoot.append(style);
        this.shadowRoot.append(win);
    }
}

customElements.define('win-card', Win);