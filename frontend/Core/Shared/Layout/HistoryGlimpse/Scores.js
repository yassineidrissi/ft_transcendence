class Scores extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
		this.customDate = JSON.parse(this.getAttribute("customDate"))
		this.today = [];
		this.yesterday = [];
		this.custom = []
		this.render()
	}
	render ()
	{
		getTodayHistory().then(data=> {
			this.today = data;
		})
		getYesterdatHistory().then(data=> {
			this.yesterday = data;
		})
		fetchDateHistory(this.customDate).then(data=> {
			this.custom = data;
		})
		const scores = document.createElement("div");
		scores.id = "scores";
		const dates = [
			{date: "Today", matches: this.today},
			{date: "Yesterday", matches: this.yesterday},
			{date:this.customDate, matches: this.custom},
		];
		dates.forEach(item => {
			const element = document.createElement("div");
			element.id = item.date;
			element.className = "mb-5";
			element.innerHTML = `<h3 class="mb-2 fw-light">${item.date}</h3>`;
			item.matches.forEach(match => {
				// element.innerHTML += `<score-card isWinner=${match.result == "WIN" ? true : false} ></score-card>`
				element.innerHTML += `${match.player.username}`
			})
			scores.append(element);
		})
		element.innerHTML = `<h3 class="mb-2 fw-light">${customeDate}</h3>`;
		element.innerHTML += `<score-card></score-card>`
		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			 @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
			h3 {
				font-family: "Orbitron", sans-serif;
				color: #F1F1F1;
			}
			#scores {
				height: 80%;
				overflow: auto;
			}
		`;
			
        this.shadowRoot.append(style, scores);
	}
}

customElements.define('scores-list', Scores);