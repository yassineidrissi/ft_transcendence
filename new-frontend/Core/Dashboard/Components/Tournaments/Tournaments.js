class Tournaments extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const tournaments = document.createElement('div');
        tournaments.id = "tournaments";
        tournaments.className = "container rounded p-4";
        
        const tournamentData = [
            { id: 1, name: 'First tournament', isFull: false },
            {id: 2, name: 'Second tournament', isFull: true },
			{ id: 3, name: '3rd tournament', isFull: false },
            {id: 4, name: '4th tournament', isFull: true },
			{ id: 5, name: '5th tournament', isFull: false },
            {id: 6, name: '6th tournament', isFull: true },
			{ id: 7, name: '7th tournament', isFull: false },
            // {id: 8, name: '8th tournament', isFull: true },
			// { id: 9, name: '9th tournament', isFull: false },
            // {id: 10, name: '10th tournament', isFull: true },
			// { id: 11, name: '11th tournament', isFull: false },
            // {id: 12, name: '12th tournament', isFull: true },
			// { id: 13, name: '13th tournament', isFull: false },
            // {id: 14, name: '14th tournament', isFull: true },
        ];
        
        tournaments.innerHTML = `
            <div class="position-relative">
                <h1 class="text-light fs-2 mb-2">Tournaments</h1>
                <div class="table-wrapper ">
                    <table>
                        <thead>
                            <tr class="head">
                                <th>Name</th>
                                <th>Time</th>
                                <th>Players</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="tournament-rows">
						</tbody>
                    </table>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
			#overlay {	
				background: rgba(0, 0, 0, 0.7);
			}
			#modal {
				border-radius: 10px;
				background: #061924;
				padding: 2rem;
				width: 30%;
			}
            h1 {
                font-family: "Orbitron", sans-serif;
                letter-spacing: 2px;
            }
            .cursor-pointer {
                cursor: pointer;
            }
			table {
				width: 100%;
			}
            .table-wrapper {
                overflow-y: auto;
                max-height: 400px;
				background: transparent;
            }
            #tournaments {
                min-height: 460px;
                max-height: 500px;
                background: rgba(54, 54, 54, 0.5);
            }
            td, th {
                color: #fff;
                padding: 0.5rem;
                vertical-align: middle;
            }
            .number {
                border-right: 2px solid #fff;
                padding: 0;
                text-align: center;
                min-width: 3rem;
                max-width: 3rem;
            }
            #register:hover {
                background: gray;
                border-radius: 50px;
            }
			#close:hover {
				background: #0dcaf0;
			}
			#join {
				border: 1px solid #0dcaf0;
				background: transparent;
				color:#0dcaf0;
			}
			#join:hover {
				background: #0dcaf0;
				color: #fff;
			}
        `;
        
        this.shadowRoot.append(style, tournaments);
        this.renderTournaments(tournamentData)
    }

    renderTournaments(data) {
        const tbody = this.shadowRoot.querySelector('#tournament-rows');
        tbody.innerHTML = data.map(tournament => `
			<!-- <div id="overlay" class="z-3 position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center text-light">
				<img id="close" src="./Core/Shared/assets/exit.svg" class="position-absolute top-0 end-0 cursor-pointer	" ></img>
				<div id="modal" class="d-flex flex-column align-items-center justify-content-center" >
					<h3 class="mb-3">Enter a nickname</h3>
					<div>
						<input type="text" class="input ps-2" placeholder="Slayer69" />
						<button id="join" class="px-2 ">Join</button>
					</div>
				</div>
			</div> -->
            <tr>
                <td ><span style=" display: inline-block; width:3rem; max-width: 3rem;" class="number me-2 fw-medium">${tournament.id}</span>${tournament.name}</td>
                <td><img src="./Core/Dashboard/assets/time.svg" ></img> 20 July, 2024 5PM</td>
                <td class="d-flex align-items-center">
                    <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/players.svg"></img>
                    <span class="mb-0">4</span>
                </td>
                <td class="py-1">
                    ${tournament.isFull ? `
                        <img class="d-inline mb-0 me-2" src="./Core/Dashboard/assets/zap.svg"></img>
                        <span class="mb-0">Playing</span>
                    ` : `
                        <svg class="me-2 p-1 cursor-pointer" id="register" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <span class="mb-0">Register</span>
                    `}
                </td>
            </tr>
        `).join('');
		
    }
}

customElements.define('tournaments-section', Tournaments);
