class dashHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const header = document.createElement('div');
		header.className = "container d-flex justify-content-between align-items-center py-3";
        header.innerHTML = `
            <img onclick="navigateTo('signin')" src="./Core/Shared/assets/logo.svg" class="cursor-pointer" alt="ping pong logo"></img>
            <nav-menu></nav-menu>
            <div class="me-4">
                <img src="./Core/Shared/assets/message-circle.svg" class="cursor-pointer me-2" onclick="navigateTo('messages')"></img>
                <img src="./Core/Shared/assets/notification.svg" class="cursor-pointer"></img>
            </div>
        `

		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'); .cursor-pointer{
			cursor: pointer;
		}`;
        this.shadowRoot.append(style, header);
    }
}

customElements.define('dashbboard-header', dashHeader);