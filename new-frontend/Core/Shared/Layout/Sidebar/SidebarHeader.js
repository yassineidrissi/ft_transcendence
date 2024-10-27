class SidebarHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const sidebarHeader = document.createElement('div');
		sidebarHeader.className = "d-flex justify-content-between align-items-end";
		sidebarHeader.id = "sidebar-header"
        sidebarHeader.innerHTML = `
			<div class="d-flex align-items-center">
				<img src="./Core/Shared/assets/avatar.jpg" class="rounded" height='40'></img>
				<span class="fs-5 fw-medium ms-2">NoobMaster69</span>
			</div>
		`
		
		const style = document.createElement('style');
        style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
			#sidebar-header {
				z-index: 200 !important;
			}
			span {
				color: #020F10;
			}
		`;
        this.shadowRoot.append(style, sidebarHeader);
    }
}

customElements.define('sidebar-header', SidebarHeader);