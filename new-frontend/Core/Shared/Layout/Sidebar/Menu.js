class Menu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		this.isSettingsModalOpen = false;
		this.render();
	}
	render()
	{
		this.shadowRoot.innerHTML = '';
		const menu = document.createElement('div');
		menu.className = "bg-primary-subtle d-flex rounded py-1 px-4";
        menu.innerHTML = `
                <menu-link ico="./Core/Shared/assets/profile.svg" onclick="navigateTo('profile')" title="Profile"></menu-link>
                <menu-link id="settings" ico="./Core/Shared/assets/settings.svg" title="Settings"></menu-link>
                <menu-link ico="./Core/Shared/assets/logout.svg" title="Logout"></menu-link>
				${ this.isSettingsModalOpen ? `<settings-modal isSettingsModalOpen="${this.isSettingsModalOpen}" ></settings-modal>` : ``}
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
		this.shadowRoot.getElementById("settings").addEventListener("click", () => {
			this.isSettingsModalOpen = true;
			this.render()
		})
    }   
}

customElements.define('nav-menu', Menu);