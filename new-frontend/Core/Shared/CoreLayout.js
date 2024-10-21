class CoreLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
	
		const container = document.createElement("div");
		container.className = `d-flex core vw-100 vh-100`;
		const main = document.createElement("div");
		main.className = "main text-primary" ;
		main.innerHTML += `<dashbboard-header></dashbboard-header>`

		while (this.firstChild)
		{
			this.firstChild.classList.add("container")
			main.append(this.firstChild);
		}
		container.append(main);
		const showHistory = this.getAttribute("showHistory");
		container.innerHTML += `<history-glimpse ${JSON.parse(showHistory) && "class='history'"} showHistory=${showHistory}></history-glimpse>`

		// const sidebar = document.createElement("div");
		// sidebar.className = "bg-primary-subtle sidebar p-3"
		// sidebar.innerHTML += `<sidebar-header></sidebar-header>`;
		// sidebar.innerHTML += `<friends-section></friends-section>`;


		container.innerHTML += `<layout-sidebar class="sidebar"></layout-sidebar>`;
		
		const style = document.createElement('style');
		style.textContent = `	
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.cursor-pointer
			{
				cursor: pointer;
			}
			.core {
				background: #020D14;
				color: #fff;
			}
			.main {
				flex: 6;
			}
			.history {
				flex: 2;
			}
			.sidebar {
				flex: 1;
				color: #000;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				font-size: 2rem;
				// font-weight: 700;
				max-width: 284px;
			}
		`;
        this.shadowRoot.append(container);
		this.shadowRoot.append(style);
    }
}

customElements.define('core-layout', CoreLayout);