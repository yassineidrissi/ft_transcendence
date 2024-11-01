class Cpu extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.isMultiplayer = true;
		this.render();
	}

	render() {

		const cpuGame = document.createElement("div");
		cpuGame.className = "container text-light position-relative";
		cpuGame.id = "cpu-game";
		cpuGame.innerHTML = `
		<div class="w-100 d-flex justify-content-between align-items-center my-4 text-light">
			<span id="player1" class="bg-primary p-2 px-4 rounded fs-5">player 1</span>
			<div id="scoreBoard" class="fs-3">
				<span id="leftScore" class="fw-sem px-2">0</span> - <span id="rightScore" class="fw-sem px-2">0</span>
			</div>
			<span id="player2" class="bg-danger p-2 px-4 rounded fs-5">${this.isMultiplayer ? 'player 2' : 'Bot'}</span>
		</div>
		<canvas id="gameCanvas" height="400" width="800" class="w-100 h-100 border"></canvas>`;
		
		const style = document.createElement('style');
		style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');

			.modeBtn {
				border: 1px solid #fff;
				background: transparent;
				color: #fff;
			}
			.activeBtn {
				background: #2dab11;
				border: 1px solid #2dab11;
			}
		`;

		this.shadowRoot.innerHTML = '';
		this.shadowRoot.append(style);
		this.shadowRoot.append(cpuGame);

		// BUTTONS
		const singleplayerButton = this.shadowRoot.getElementById("singleplayerButton");
		const multiplayerButton = this.shadowRoot.getElementById("multiplayerButton");

		const resetGame = () => {
			leftPaddle.score = 0;
			rightPaddle.score = 0;
			resetBall();
			updateScore();
		};


		// CANVAS and GAME LOGIC
		const canvas = this.shadowRoot.getElementById("gameCanvas");
		const leftScore = this.shadowRoot.getElementById('leftScore');
		const rightScore = this.shadowRoot.getElementById('rightScore');
		
		if (canvas.getContext) {
			const ctx = canvas.getContext('2d');
			const paddleWidth = 5, paddleHeight = 70;
			const ballSize = 7;
			const RADIUS = 7;
			let qTable = {};
			let ballX = canvas.width / 2, ballY = canvas.height / 2;
			let ballSpeedX = 4, ballSpeedY = 4;

			const leftPaddle = {
				x: 0,
				y: (canvas.height - paddleHeight) / 2,
				speed: 5,
				moveUp: false,
				moveDown: false,
				score: 0
			};

			const rightPaddle = {
				x: canvas.width - paddleWidth,
				y: (canvas.height - paddleHeight) / 2,
				speed: 5,
				moveUp: false,
				moveDown: false,
				score: 0
			};

			
			
			function drawPaddle(paddle) {
				ctx.fillStyle = 'white';
				ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
			}
			
			function drawBall() {
				ctx.fillStyle = 'white';
				ctx.strokeStyle = "white";
				ctx.beginPath();
				ctx.roundRect(ballX, ballY, ballSize, ballSize, 100);
				ctx.stroke();
				ctx.fill();
			}
			
			function updateScore() {
				leftScore.textContent = leftPaddle.score;
				rightScore.textContent = rightPaddle.score;
			}
			
			function movePaddles() {
				if (leftPaddle.moveUp && leftPaddle.y > 0) {
					leftPaddle.y -= leftPaddle.speed;
				}
				if (leftPaddle.moveDown && leftPaddle.y < canvas.height - paddleHeight) {
					leftPaddle.y += leftPaddle.speed;
				}
				// if (this.isMultiplayer) {
					// 	if (rightPaddle.moveUp && rightPaddle.y > 0) {
						// 		rightPaddle.y -= rightPaddle.speed;
						// 	}
						// 	if (rightPaddle.moveDown && rightPaddle.y < canvas.height - paddleHeight) {
							// 		rightPaddle.y += rightPaddle.speed;
							// 	}
							// } else {
								// 	// Simple AI for the bot
								// 	if (ballY > rightPaddle.y + paddleHeight / 2 && rightPaddle.y < canvas.height - paddleHeight) {
									// 		rightPaddle.y += rightPaddle.speed;
									// 	} else if (ballY < rightPaddle.y + paddleHeight / 2 && rightPaddle.y > 0) {
										// 		rightPaddle.y -= rightPaddle.speed;
										// 	}
										// }
									}
									
									function moveBall() {
										ballX += ballSpeedX;
										ballY += ballSpeedY;
										
										if (ballY <= 0 || ballY >= canvas.height - ballSize) {
											ballSpeedY = -ballSpeedY;
										}
										
										if (
											(ballX <= leftPaddle.x + paddleWidth && ballY + ballSize >= leftPaddle.y && ballY <= leftPaddle.y + paddleHeight) ||
											(ballX + ballSize >= rightPaddle.x && ballY + ballSize >= rightPaddle.y && ballY <= rightPaddle.y + paddleHeight)
											) {
												ballSpeedX = -ballSpeedX;
											}
											
											if (ballX < 0) {
												rightPaddle.score++;
												resetBall();
											}
											
											if (ballX > canvas.width) {
												leftPaddle.score++;
												resetBall();
											}
											
											updateScore();
										}

										function parseState(stateStr) {
											const match = stateStr.match(/\((\d+),\s*(\d+)\)/);
											if (match) {
												return [parseInt(match[1]), parseInt(match[2])];
											}
											return null;
										}
										
										async function loadQTable() {
											try {
												const response = await fetch('https://127.0.0.1/player_A_10_qtable.json');
												if (!response.ok) {
													throw new Error(`HTTP error! status: ${response.status}`);
												}
												qTable = await response.json();
												console.log("Parsed JSON data:", qTable);
											} catch (error) {
												console.error("Error fetching or parsing JSON data:", error);
											}
										}

										function calculateDistance(state1, state2) {
											return Math.sqrt(
												Math.pow(state1[0] - state2[0], 2) +
												Math.pow(state1[1] - state2[1], 2)
											);
										}								
										
										function getClosestStateActions(state) {
											const parsedInputState = parseState(state);
								
											if (!parsedInputState) {
												console.warn("Invalid state format");
												return [0, 0, 0]; // Default if the input state format is incorrect
											}
								
											let closestState = null;
											let closestDistance = Infinity;
								
											for (const key in qTable) {
												const parsedQTableState = parseState(key);
												
												if (parsedQTableState) {
													const distance = calculateDistance(parsedInputState, parsedQTableState);
								
													if (distance < closestDistance) {
														closestDistance = distance;
														closestState = key;
													}
												}
											}
											// console.log(qTable);
											// Return actions for the closest state found, or [0, 0, 0] if no match
											if (closestState) {
												console.log('the closeststate is :' + closestState);
												return qTable[closestState];
											} else {
												return [0, 0, 0];
											}
										}
			   // Function to decide action for paddle_a based on Q-Table

			   function get_action() {
				const ballCenterY = ballY + RADIUS;
				const paddleCenterY = rightPaddle.y + paddleHeight / 2;
		
				let distilledState;
				if (rightPaddle.y - RADIUS <= ballCenterY && ballCenterY <= paddleCenterY + RADIUS) {
					distilledState = 0; // Ball's y-value center is within range of the paddle's y-value center
				} else if (ballCenterY < paddleCenterY) {
					distilledState = 1; // Ball's y-value center is less than the paddle's y-value center
				} else {
					distilledState = 2; // Ball's y-value center is greater than the paddle's y-value center
				}
				
				return distilledState;
				}
				
			function getAction(state) {
				// const newstate =   getcl();//|| [0, 1, 0]; // getClosestStateActions(state);//|| Default to [0,0,0] if no state in Q-table
				const actions = getClosestStateActions(state); 
				const maxAction = actions.indexOf(Math.max(...actions));
				// console.log("State:", state, "Actions:", actions, "Chosen action:", maxAction);
		
				// Action mapping: 0 - stay, 1 - move up, 2 - move down
				if (maxAction === 1 && rightPaddle.y > 0) {
					rightPaddle.y -= rightPaddle.speed;
				//    movePaddleAUp();
				} else if (maxAction === 2 && rightPaddle.y < canvas.height - paddleHeight) {
					//movePaddleADown();
					rightPaddle.y += rightPaddle.speed;
				}
			}


			function resetBall() {
				ballX = canvas.width / 2;
				ballY = canvas.height / 2;
				ballSpeedX = -ballSpeedX;
			}

			function getState() {
				// Simplify positions by scaling down, so fewer unique states exist
				const ballPosY = Math.floor(ballY/ 5); // Scale down ball Y position
				const leftPaddlePosY = Math.floor(leftPaddle.y); // Scale down left paddle Y position
			   // console.log('leftPy ' + rightPaddle.y + ' ballPY ' + ballPosY);
				
				// Create a unique state key, e.g., "10-15" for ballPosY 10 and leftPaddlePosY 15
				return `(${ballPosY}, ${leftPaddlePosY})`;
			}

			function updateAI() {
				let action_a = 0;
				let action = get_action();                
				let stat = "(" + action + ", " + action_a + ")";
				// const stat = getState(); // Get the current game state
				getAction(stat);         // Paddle A moves based on Q-Table action
			}

			function gameLoop() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawPaddle(leftPaddle);
				drawPaddle(rightPaddle);
				drawBall();
				
				movePaddles();
	
				updateAI(); // Call AI logic for each loop
				moveBall();
				requestAnimationFrame(gameLoop);
			}
	

			document.addEventListener('keydown', (e) => {
				if (e.key === 'w') leftPaddle.moveUp = true;
				if (e.key === 's') leftPaddle.moveDown = true;
			});

			document.addEventListener('keyup', (e) => {
				if (e.key === 'w') leftPaddle.moveUp = false;
				if (e.key === 's') leftPaddle.moveDown = false;
			});
		
			loadQTable();
			gameLoop();
		}
	}
}

customElements.define('cpu-game', Cpu);
