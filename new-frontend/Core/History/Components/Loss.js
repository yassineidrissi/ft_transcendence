class Loss extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const loss = document.createElement("div");
		loss.className = "w-100 d-flex align-items-center justify-content-between px-2"
		loss.id = "loss"
		loss.innerHTML = `
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
			#loss {
				border-right: 8px solid #f4043d;
				background: rgb(85,3,14);
				background: -moz-linear-gradient(90deg, rgba(85,3,14,1) 0%, rgba(166,13,49,1) 100%);
				background: -webkit-linear-gradient(90deg, rgba(85,3,14,1) 0%, rgba(166,13,49,1) 100%);
				background: linear-gradient(90deg, rgba(85,3,14,1) 0%, rgba(166,13,49,1) 100%);
				filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#55030e",endColorstr="#a60d31",GradientType=1);
			}
		`;
		this.shadowRoot.append(style);
        this.shadowRoot.append(loss);
    }
}

customElements.define('loss-card', Loss);