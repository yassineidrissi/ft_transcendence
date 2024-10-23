class Tournaments extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const tournaments = document.createElement('div');
        tournaments.id = "tournaments"
		tournaments.className = "container rounded  w-100 pt-4 ms-2";
        tournaments.innerHTML = `<div>
            <h1 class="text-light fs-3">Tournaments</h1>
            <table class="w-100">
                <tr class="head">
                  <th>Name</th>
                  <th>Time</th>
                  <th>Players</th>
                  <th>Status</th>
                </tr>
                <tr>
                  <td><span class="number">1</span> Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td><span class="number">2</span> Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                  <td>Germany</td>
                </tr>
            </table>
        </div>`
		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
		h1{
			font-family: "Orbitron", sans-serif;
		}
        .cursor-pointer{
			cursor: pointer;
		}
        .head {
            border-bottom: 1px solid white;
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
            width: 3rem;
        }
        tr {
            margin-bottom: 1rem;
        }
        `;
        this.shadowRoot.append(style, tournaments);
    }
}

customElements.define('tournaments-section', Tournaments);