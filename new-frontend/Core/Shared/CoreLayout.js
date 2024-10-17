class CoreLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		const container = document.createElement("div");
		container.className = `d-flex bg-success vw-100 vh-100`;
		const main = document.createElement("div");
		main.className = "bg-secondary main" ;
		const header = document.createElement("div");
		header.className = "bg-primary-subtle";
		header.textContent = "HEADER";
		main.append(header);
		const content = document.createElement("div");
		content.className = `bg-danger`;
		content.textContent = "CONTENT"
		main.append(content);
		container.append(main);
		const history = document.createElement("div");
		const showHistory = JSON.parse(this.getAttribute("showHistory"));
		history.className = `bg-warning history ${!showHistory && "d-none"}`;
		history.textContent = "HISTORY";
		const sidebar = document.createElement("div");
		sidebar.className = "bg-primary sidebar"
		sidebar.textContent = "SIDEBAR";
		container.append(history);
		container.append(sidebar);

		
        while (this.firstChild) {
            main.appendChild(this.firstChild);
        }
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
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
		this.shadowRoot.append(style);
        this.shadowRoot.append(container);
    }
}

customElements.define('core-layout', CoreLayout);