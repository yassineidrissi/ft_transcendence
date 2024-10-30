
// console.log("hello");
// const cpuGame = document.getElementById("cpu-game");
// let canvas = document.createElement("canvas");
// cpuGame.append(canvas);
// // let canvas = document.getElementById("gameCanvas");
// if (canvas.getContext) {
// 	const ctx = canvas.getContext('2d');
// 	console.log(ctx);
// 	const paddleWidth = 10, paddleHeight = 100;
// 	const ballSize = 10;
// 	let ballX = canvas.width / 2, ballY = canvas.height / 2;
// 	let ballSpeedX = 4, ballSpeedY = 4;

// 	const leftPaddle = {
// 		x: 0,
// 		y: (canvas.height - paddleHeight) / 2,
// 		speed: 5,
// 		moveUp: false,
// 		moveDown: false,
// 		score: 0
// 	};

// 	const rightPaddle = {
// 		x: canvas.width - paddleWidth,
// 		y: (canvas.height - paddleHeight) / 2,
// 		speed: 5,
// 		moveUp: false,
// 		moveDown: false,
// 		score: 0
// 	};

// 	let isSinglePlayer = false;

// 	function drawPaddle(paddle) {
// 		ctx.fillStyle = 'white';
// 		ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
// 	}

// 	function drawBall() {
// 		ctx.fillStyle = 'white';
// 		ctx.fillRect(ballX, ballY, ballSize, ballSize);
// 	}

// 	function updateScore() {
// 		document.getElementById('leftScore').textContent = leftPaddle.score;
// 		document.getElementById('rightScore').textContent = rightPaddle.score;
// 	}

// 	function movePaddles() {
// 		if (leftPaddle.moveUp && leftPaddle.y > 0) {
// 			leftPaddle.y -= leftPaddle.speed;
// 		}
// 		if (leftPaddle.moveDown && leftPaddle.y < canvas.height - paddleHeight) {
// 			leftPaddle.y += leftPaddle.speed;
// 		}
// 		if (!isSinglePlayer) {
// 			if (rightPaddle.moveUp && rightPaddle.y > 0) {
// 				rightPaddle.y -= rightPaddle.speed;
// 			}
// 			if (rightPaddle.moveDown && rightPaddle.y < canvas.height - paddleHeight) {
// 				rightPaddle.y += rightPaddle.speed;
// 			}
// 		} else {
// 			// Simple AI for the robot
// 			if (ballY > rightPaddle.y + paddleHeight / 2 && rightPaddle.y < canvas.height - paddleHeight) {
// 				rightPaddle.y += rightPaddle.speed;
// 			} else if (ballY < rightPaddle.y + paddleHeight / 2 && rightPaddle.y > 0) {
// 				rightPaddle.y -= rightPaddle.speed;
// 			}
// 		}
// 	}

// 	function moveBall() {
// 		ballX += ballSpeedX;
// 		ballY += ballSpeedY;

// 		if (ballY <= 0 || ballY >= canvas.height - ballSize) {
// 			ballSpeedY = -ballSpeedY;
// 		}

// 		if (
// 			(ballX <= leftPaddle.x + paddleWidth && ballY + ballSize >= leftPaddle.y && ballY <= leftPaddle.y + paddleHeight) ||
// 			(ballX + ballSize >= rightPaddle.x && ballY + ballSize >= rightPaddle.y && ballY <= rightPaddle.y + paddleHeight)
// 		) {
// 			ballSpeedX = -ballSpeedX;
// 		}

// 		if (ballX < 0) {
// 			rightPaddle.score++;
// 			resetBall();
// 		}

// 		if (ballX > canvas.width) {
// 			leftPaddle.score++;
// 			resetBall();
// 		}

// 		updateScore();
// 	}

// 	function resetBall() {
// 		ballX = canvas.width / 2;
// 		ballY = canvas.height / 2;
// 		ballSpeedX = -ballSpeedX;
// 	}

// 	function gameLoop() {
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		drawPaddle(leftPaddle);
// 		drawPaddle(rightPaddle);
// 		drawBall();
// 		movePaddles();
// 		moveBall();
// 		requestAnimationFrame(gameLoop);
// 	}

// 	document.addEventListener('keydown', (e) => {
// 		if (e.key === 'w') leftPaddle.moveUp = true;
// 		if (e.key === 's') leftPaddle.moveDown = true;
// 		if (!isSinglePlayer) {
// 			if (e.key === 'ArrowUp') rightPaddle.moveUp = true;
// 			if (e.key === 'ArrowDown') rightPaddle.moveDown = true;
// 		}
// 	});

// 	document.addEventListener('keyup', (e) => {
// 		if (e.key === 'w') leftPaddle.moveUp = false;
// 		if (e.key === 's') leftPaddle.moveDown = false;
// 		if (!isSinglePlayer) {
// 			if (e.key === 'ArrowUp') rightPaddle.moveUp = false;
// 			if (e.key === 'ArrowDown') rightPaddle.moveDown = false;
// 		}
// 	});

// 	document.getElementById('multiplayerButton').addEventListener('click', () => {
// 		isSinglePlayer = false;
// 		resetGame();
// 	});

// 	document.getElementById('singleplayerButton').addEventListener('click', () => {
// 		isSinglePlayer = true;
// 		resetGame();
// 	});

// 	function resetGame() {
// 		leftPaddle.score = 0;
// 		rightPaddle.score = 0;
// 		resetBall();
// 		updateScore();
// 	}
// 	gameLoop();
// }
