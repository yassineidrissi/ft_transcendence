class dashHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const header = document.createElement('div');
		header.className = "container d-flex justify-content-between align-items-center ";
		const logoSpan = document.createElement('span');
        logoSpan.className = 'cursor-pointer';
        logoSpan.addEventListener('click', () => navigateTo('signin'));
        const logoImg = document.createElement('img');
        logoImg.src = './Core/Shared/assets/logo.svg';
        logoImg.className = 'logo';
        logoImg.alt = 'ping pong logo';
        logoSpan.appendChild(logoImg);
		const notificationIco = document.createElement('img');
        notificationIco.src = './Core/Shared/assets/notification.svg';
        notificationIco.className = 'logo cursor-pointer';
        notificationIco.alt = 'notifications icon';
		header.append(logoSpan)
		header.append(notificationIco)
		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'); .cursor-pointer{
			cursor: pointer;
		}`;
        this.shadowRoot.append(style, header);
    }
}

customElements.define('dashbboard-header', dashHeader);