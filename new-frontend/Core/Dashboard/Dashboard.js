class Dashboard extends HTMLElement {
    // constructor() {
    //     super();
    //     this.attachShadow({ mode: 'open' });
    //     const h1 = document.createElement('h1');
	// 	h1.textContent = "Dashboard";
	// 	h1.className = "text-white";
	// 	const style = document.createElement('style');
	// 	style.textContent = `
    // 		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
	// 	`;
	// 	this.shadowRoot.append(style, h1);
		
    // }
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const container = document.createElement("div");
		container.className = "d-flex justify-content-between flex-column vh-100";
		const logoSpan = document.createElement('span');
        logoSpan.className = 'cursor-pointer';
        logoSpan.addEventListener('click', () => navigateTo('signin'));
        const logoImg = document.createElement('img');
        logoImg.src = './Auth/Assets/logo.svg';
        logoImg.className = 'logo ';
        logoImg.alt = 'ping pong logo';
        logoSpan.appendChild(logoImg);
        
        const formContainer = document.createElement('div');
        formContainer.id = 'form-container';
        formContainer.className = 'signin-form-container d-flex flex-column justify-content-center align-items-center';
    
        while (this.firstChild) {
            formContainer.appendChild(this.firstChild);
        }
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
		`;
		this.shadowRoot.append(style);
        container.append(logoSpan, formContainer);
        this.shadowRoot.append(container);
    }
}

customElements.define('dashboard-page', Dashboard);