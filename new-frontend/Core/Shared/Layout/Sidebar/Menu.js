class Menu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const menu = document.createElement('div');
		menu.className = "bg-primary-subtle d-flex rounded py-1";
        menu.innerHTML = `
                <menu-link ico="./Core/Shared/assets/profile.svg" onclick="navigateTo('profile')" title="Profile"></menu-link>
                <menu-link ico="./Core/Shared/assets/settings.svg" title="Settings"></menu-link>
                <menu-link ico="./Core/Shared/assets/logout.svg" title="Logout"></menu-link>
		`
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
		`;
        this.shadowRoot.append(style, menu);
    }
}

customElements.define('nav-menu', Menu);