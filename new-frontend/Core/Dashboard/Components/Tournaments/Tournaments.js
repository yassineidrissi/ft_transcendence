class Tournaments extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const tournaments = document.createElement('div');
        tournaments.id = "tournaments"
		tournaments.className = "container rounded  w-100 pt-4 ms-2";
        tournaments.innerHTML = `<div>
            <h1 class="text-light fs-3">Tournaments</h1>
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
                  <td class=""><img src="./Core/Dashboard/assets/players.svg" ></img> 4</td>
                  <td>Register</td>
                </tr>
                <tr>
                  <td><span class="number me-2">2</span> Tournament</td>
                  <td class=""><img src="./Core/Dashboard/assets/time.svg" ></img> 20 july, 2024 5PM</td>
                  <td class=""><img src="./Core/Dashboard/assets/players.svg" ></img> 4</td>
                  <td>Playing</td>
                </tr>
            </table>
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
		table {
			min-width: 100%;
		}
        .head {
            border-bottom: 1px solid white;
			width: 100%;
        }
		tr
		{
			width: 100%;
		
			margin-bottom: 2rem;
		}
        td, th {
            padding: 0 1rem;
            color: #fff;
        }
        #tournaments {
            min-height : 460px;
            max-height: 500px;
        }
        .number {
            background: gray;
            display: inline-block;
            padding: 0 1rem;
            text-align: center;
            min-width: 3rem;
			max-width: 3rem;
        }
        `;
        this.shadowRoot.append(style, tournaments);
    }
}

customElements.define('tournaments-section', Tournaments);