class ScoreCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const scoreCard = document.createElement('div');
		const result = JSON.parse(this.getAttribute('isWinner'));
		scoreCard.className = `d-flex justify-content-between align-items-center me-4 mb-2 px-2 border-end ${result ? "border-success" : "border-danger"} border-5`;
		scoreCard.innerHTML = `
			<img src="./Core/Shared/assets/avatar.jpg" class="rounded" height='44'></img>
			<div class="d-flex">
				score
			</div>
			<span class="fw-semibold">${ result ? "Win" : "Loss"}</span>
		`
		const style = document.createElement('style');
        style.textContent = `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'); .cursor-pointer{cursor: pointer;}`;

        this.shadowRoot.append(style, scoreCard);
    }
}

customElements.define('score-card', ScoreCard);