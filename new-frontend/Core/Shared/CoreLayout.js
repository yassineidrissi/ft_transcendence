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
		// BEGIN SIDEBAR
		const sidebar = document.createElement("div");
		sidebar.className = "bg-primary-subtle sidebar"
		sidebar.textContent = "SIDEBAR";
		// END SIDEBAR
		container.append(sidebar);
		
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			.core {
				background: #020D14;
				color: #fff;
			}
			.cursor-pointer
			{
				cursor: pointer;
			}
			.main {
				flex: 6;
			}
			.history {
				flex: 2;
			}
			.sidebar {
				flex: 1;
			}
		`;
        this.shadowRoot.append(container);
		this.shadowRoot.append(style);
    }
}

customElements.define('core-layout', CoreLayout);