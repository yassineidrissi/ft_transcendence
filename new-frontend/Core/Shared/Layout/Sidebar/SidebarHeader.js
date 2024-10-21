class SidebarHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const sidebarHeader = document.createElement('div');
		sidebarHeader.className = "d-flex justify-content-between align-items-end "; // border-bottom border-secondary pb-3
        sidebarHeader.innerHTML = `
			<div class="d-flex align-items-center">
				<img src="./Core/Shared/assets/avatar.jpg" class="rounded" height='40'></img>
				<span class="fs-5 fw-normal ms-2">NoobMaster69</span>
			</div>
			<img src="./Core/Shared/assets/open-menu.svg" class=" rounded cursor-pointer "></img>
		`
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
        this.shadowRoot.append(style, sidebarHeader);
    }
}

customElements.define('sidebar-header', SidebarHeader);