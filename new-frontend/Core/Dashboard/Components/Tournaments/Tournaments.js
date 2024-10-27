class Tournaments extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const tournaments = document.createElement('div');
        tournaments.id = "tournaments"
		tournaments.className = "container rounded p-4";
        tournaments.innerHTML = `<div>
            <h1 class="text-light fs-3">Tournaments</h1>
			<div class="table-wrapper">
				<table class="">
					<tr class="head">
					  <th>Name</th>
					  <th>Time</th>
					  <th>Players</th>
					  <th>Status</th>
					</tr>
					<tr>
						  <td><span class="number me-2">100</span> Tournament</td>
						  <td class=""><img src="./Core/Dashboard/assets/time.svg" ></img> 20 july, 2024 5PM</td>
						  <td class="d-flex align-items-center">
							  <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/players.svg"></img>
							<span class="mb-0">4</span>
						</td>
						<td class="py-1">
							<svg class="me-2 p-1 cursor-pointer" id="register" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> 
							<span class="mb-0">Register</span>
						</td>
					</tr>
					<tr>
						<td><span class="number me-2">2</span> Tournament</td>
						<td class=""><img src="./Core/Dashboard/assets/time.svg" ></img> 20 july, 2024 5PM</td>
						<td class="d-flex align-items-center">
							  <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/players.svg"></img>
							<span class="mb-0">4</span>
						</td>
						<td class="py-1">
							  <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/zap.svg"></img>
							<span class="mb-0">Playing</span>
						</td>
					</tr>
					<tr>
						  <td><span class="number me-2">100</span> Tournament</td>
						  <td class=""><img src="./Core/Dashboard/assets/time.svg" ></img> 20 july, 2024 5PM</td>
						  <td class="d-flex align-items-center">
							  <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/players.svg"></img>
							<span class="mb-0">4</span>
						</td>
						<td class="py-1">
							<svg class="me-2 p-1 cursor-pointer" id="register" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> 
							<span class="mb-0">Register</span>
						</td>
					</tr>
					<tr>
						<td><span class="number me-2">2</span> Tournament</td>
						<td class=""><img src="./Core/Dashboard/assets/time.svg" ></img> 20 july, 2024 5PM</td>
						<td class="d-flex align-items-center">
							  <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/players.svg"></img>
							<span class="mb-0">4</span>
						</td>
						<td class="py-1">
							  <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/zap.svg"></img>
							<span class="mb-0">Playing</span>
						</td>
					</tr>
				</table>
			</div>
		
        </div>`
		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
		h1{
			font-family: "Orbitron", sans-serif;
			letter-spacing: 2px;
		}
        .cursor-pointer{
			cursor: pointer;
		}
		.table-wrapper {
			overflow-y: auto;
			max-height: 400px; 
		}
		table {
			overflow-y: scroll;
			min-width: 100%;
			height: 100%;
		}
		#register:hover {
			background: gray;
			border-radius: 50px;
		}
        .head {
            border-bottom: 1px solid white;
			width: 100%;
        }
		
        td, th {
            color: #fff;
   			padding: 0.5rem;
    		vertical-align: middle;
        }

        #tournaments {
			overflow: hidden;
            min-height : 460px;
            max-height: 500px;
			border: 1px solid #383838;
			background: rgba(54, 54, 54, 0.5);
        }
        .number {
            border-right: 2px solid #fff;
            display: inline-block;
            padding: 0;
            text-align: center;
            min-width: 3rem;
			max-width: 3rem;
        }
        `;
        this.shadowRoot.append(style, tournaments);
    }
}

customElements.define('tournaments-section', Tournaments);