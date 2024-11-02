class OnlineGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.CANVAS_WIDTH = 800;
    this.CANVAS_HEIGHT = 400;
    this.PADDLE_WIDTH = 10;
    this.PADDLE_HEIGHT = 100;
    this.BALL_SIZE = 10;

    this.gameStarted = false;
    this.isPlayerOne = false;
    this.leftPlayer = false;
    this.winner = null;
    this.gameSocket = null;

    this.leftPaddle = {
      x: 0,
      y: this.CANVAS_HEIGHT / 2 - this.PADDLE_HEIGHT / 2,
      speed: 5,
      score: 0
    };

    this.rightPaddle = {
      x: this.CANVAS_WIDTH - this.PADDLE_WIDTH,
      y: this.CANVAS_HEIGHT / 2 - this.PADDLE_HEIGHT / 2,
      speed: 5,
      score: 0
    };

    this.ball = {
      x: this.CANVAS_WIDTH / 2,
      y: this.CANVAS_HEIGHT / 2,
      speedX: 5,
      speedY: 5
    };

    this.keys = {
      w: false,
      s: false,
      ArrowUp: false,
      ArrowDown: false
    };

    this.render();
    this.initEventListeners();
  }

  connectedCallback() {
    this.canvas = this.shadowRoot.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.waitingMessage = this.shadowRoot.getElementById('waitingMessage');
    this.leftScoreElement = this.shadowRoot.getElementById('leftScore');
    this.rightScoreElement = this.shadowRoot.getElementById('rightScore');
    this.roomNameElement = this.shadowRoot.getElementById('roomName');
    this.resetButton = this.shadowRoot.getElementById('resetButton');
    this.player1 = this.shadowRoot.getElementById('player1');
    this.player2 = this.shadowRoot.getElementById('player2');
    this.winnerElement = this.shadowRoot.getElementById('winner');
    this.roomInfoElement = this.shadowRoot.getElementById('roomInfo');

    this.fetchMatchID();
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      .game-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 10px;
      }
      canvas {
        display: block;
        margin: 0 auto;
        border: 2px solid #000;
      }
      .score {
        text-align: center;
        font-size: 24px;
        margin-bottom: 10px;
      }
      .player-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      button {
        display: block;
        margin: 10px auto;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
    `;

    this.shadowRoot.innerHTML = `
      <div class="game-container">
        <div class="player-info">
          <span id="player1"></span>
          <span id="player2"></span>
        </div>
        <div class="score">
          <span id="leftScore">0</span> - <span id="rightScore">0</span>
        </div>
        <canvas id="gameCanvas" width="${this.CANVAS_WIDTH}" height="${this.CANVAS_HEIGHT}"></canvas>
        <div id="waitingMessage"></div>
        <div id="roomInfo"></div>
        <div id="winner"></div>
        <button id="resetButton">Reset Game</button>
      </div>
    `;

    this.shadowRoot.appendChild(style);
  }

  initEventListeners() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    this.shadowRoot.getElementById('resetButton').addEventListener('click', () => this.resetGame());
  }

  handleKeyDown(e) {
    if (e.key in this.keys) {
      e.preventDefault();
      this.keys[e.key] = true;
    }
  }

  handleKeyUp(e) {
    if (e.key in this.keys) {
      e.preventDefault();
      this.keys[e.key] = false;
    }
  }

  initializeGame(matchID) {
    localStorage.setItem('matchID', matchID);
    const access_token = localStorage.getItem('access_token');
    this.gameSocket = new WebSocket(`ws://localhost:8000/ws/game/${matchID}/?token=${access_token}`);

    this.gameSocket.onopen = () => {
      console.log('WebSocket connection established');
      this.drawGame();
    };

    this.gameSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.gameSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'game_state':
          this.handleGameState(data.game_state);
          break;
        case 'paddle_move':
          this.handlePaddleMove(data.paddle_move);
          break;
        case 'ball_position':
          this.handleBallPosition(data.ball_position);
          break;
        case 'score_update':
          this.handleScoreUpdate(data.score_update);
          break;
      }
      
      this.drawGame();
    };
  }

  handleGameState(gameState) {
    this.leftPaddle.y = gameState.left_paddle_y;
    this.rightPaddle.y = gameState.right_paddle_y;
    this.ball.x = gameState.ball_position.x;
    this.ball.y = gameState.ball_position.y;
    this.leftPaddle.score = gameState.left_score;
    this.rightPaddle.score = gameState.right_score;
    console.log(gameState);
    this.updateScore();
    
    setTimeout(() => {
      console.log('gameState.players:', gameState.players);
      if (gameState.players === 1 && !this.gameStarted)
        this.deleteMatch(localStorage.getItem('matchID'));
    }, 10000);

    if (gameState.players === 1) {
      this.isPlayerOne = true;
      this.waitingMessage.textContent = "You are Player 1 (Left Paddle). Waiting for Player 2...";
      this.player1.textContent = gameState.nickname_one;
      this.leftPlayer = true;
    } else if (gameState.players === 2 && !this.gameStarted) {
      this.waitingMessage.style.display = 'none';
      this.isPlayerOne = true;
      this.gameStarted = true;
      const playerMessage = this.leftPlayer ? "You are Player 1 (Left Paddle)" : "You are Player 2 (Right Paddle)";
      this.player1.textContent = gameState.nickname_one;
      this.player2.textContent = gameState.nickname_two;
      this.roomInfoElement.innerHTML += `<br>${playerMessage}`;
      this.gameLoop();
    }
  }

  movePaddles() {
    let leftPaddleMoved = false;
    let rightPaddleMoved = false;

    if (this.leftPlayer) {
      if ((this.keys.w || this.keys.ArrowUp) && this.leftPaddle.y > 0) {
        this.leftPaddle.y -= this.leftPaddle.speed;
        leftPaddleMoved = true;
      } else if ((this.keys.s || this.keys.ArrowDown) && this.leftPaddle.y < this.CANVAS_HEIGHT - this.PADDLE_HEIGHT) {
        this.leftPaddle.y += this.leftPaddle.speed;
        leftPaddleMoved = true;
      }
    } else {
      if ((this.keys.w || this.keys.ArrowUp) && this.rightPaddle.y > 0) {
        this.rightPaddle.y -= this.rightPaddle.speed;
        rightPaddleMoved = true;
      } else if ((this.keys.s || this.keys.ArrowDown) && this.rightPaddle.y < this.CANVAS_HEIGHT - this.PADDLE_HEIGHT) {
        this.rightPaddle.y += this.rightPaddle.speed;
        rightPaddleMoved = true;
      }
    }

    if (leftPaddleMoved) {
      this.sendPaddleMove(this.leftPaddle, 'left');
    }
    if (rightPaddleMoved) {
      this.sendPaddleMove(this.rightPaddle, 'right');
    }
  }

  sendPaddleMove(paddle, side) {
    this.gameSocket.send(JSON.stringify({
      paddle_move: {
        player: side,
        y: paddle.y
      }
    }));
  }

  gameLoop() {
    console.log(this.leftPaddle.score, this.rightPaddle.score);
    if (!this.gameStarted || this.leftPaddle.score >= 5 || this.rightPaddle.score >= 5) {
      if (this.leftPaddle.score >= 5)
        this.winner = this.player1.textContent;
      else if (this.rightPaddle.score >= 5)
        this.winner = this.player2.textContent;
      if (this.winner) {
        this.winnerElement.textContent = this.winner;
        this.gameSocket.close();
      }
      return;
    }
    this.movePaddles();
    if (this.isPlayerOne) {
      this.moveBall();
    }
    this.drawGame();
    requestAnimationFrame(() => this.gameLoop());
  }

  handlePaddleMove(paddleMove) {
    if (paddleMove.player === 'left') {
      this.leftPaddle.y = paddleMove.y;
    } else {
      this.rightPaddle.y = paddleMove.y;
    }
  }

  handleBallPosition(ballPosition) {
    this.ball.x = ballPosition.x;
    this.ball.y = ballPosition.y;
    this.ball.speedX = ballPosition.speedx;
    if (ballPosition.y <= 0 && ballPosition.speedy <= 0)
      this.ball.speedY = -ballPosition.speedy;
    else
      this.ball.speedY = ballPosition.speedy;
  }

  handleScoreUpdate(scoreUpdate) {
    this.leftPaddle.score = scoreUpdate.left_score;
    this.rightPaddle.score = scoreUpdate.right_score;
    this.updateScore();
  }

  sendBallPosition() {
    this.gameSocket.send(JSON.stringify({
      ball_position: {
        x: this.ball.x,
        y: this.ball.y,
        speedx: this.ball.speedX,
        speedy: this.ball.speedY
      }
    }));
  }

  sendScoreUpdate() {
    this.gameSocket.send(JSON.stringify({
      score_update: {
        type: 'score_game',
        left_score: this.leftPaddle.score,
        right_score: this.rightPaddle.score,
        match_id: localStorage.getItem('matchID'),
      }
    }));
  }

  sendWinner() {
    this.gameSocket.send(JSON.stringify({
      winner_data: {
        winner: this.winner,
        match_id: localStorage.getItem('matchID')
      }
    }));
  }

  drawPaddle(paddle) {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(paddle.x, paddle.y, this.PADDLE_WIDTH, this.PADDLE_HEIGHT);
  }

  drawBall() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.ball.x, this.ball.y, this.BALL_SIZE, this.BALL_SIZE);
  }

  updateScore() {
    this.leftScoreElement.textContent = this.leftPaddle.score;
    this.rightScoreElement.textContent = this.rightPaddle.score;
  }

  moveBall() {
    this.ball.x += this.ball.speedX;
    this.ball.y += this.ball.speedY;

    let checkWall = false;
    let checkPaddle = false;

    if (this.ball.y <= 0 || this.ball.y >= this.CANVAS_HEIGHT - this.BALL_SIZE) {
      this.ball.speedY = -this.ball.speedY;
      checkWall = true;
    }

    if (
      (this.ball.x <= this.leftPaddle.x + this.PADDLE_WIDTH && this.ball.y + this.BALL_SIZE >= this.leftPaddle.y && this.ball.y <= this.leftPaddle.y + this.PADDLE_HEIGHT) ||
      (this.ball.x + this.BALL_SIZE >= this.rightPaddle.x && this.ball.y + this.BALL_SIZE >= this.rightPaddle.y && this.ball.y <= this.rightPaddle.y + this.PADDLE_HEIGHT)
    ) {
      this.ball.speedX = -this.ball.speedX;
      checkPaddle = true;
    }

    if (this.ball.x < 0) {
      this.rightPaddle.score++;
      this.resetBall();
      this.sendScoreUpdate();
    }

    if (this.ball.x > this.CANVAS_WIDTH) {
      this.leftPaddle.score++;
      this.resetBall();
      this.sendScoreUpdate();
    }

    if (checkWall || checkPaddle) {
      if (this.ball.y > this.CANVAS_HEIGHT - this.BALL_SIZE)
        this.ball.y -= this.BALL_SIZE;
      this.sendBallPosition();
    }
  }

  resetBall() {
    this.ball.x = this.CANVAS_WIDTH / 2;
    this.ball.y = this.CANVAS_HEIGHT / 2;
    this.ball.speedX = -this.ball.speedX;
  }

  drawGame() {
    
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.drawPaddle(this.leftPaddle);
    this.drawPaddle(this.rightPaddle);
    this.drawBall();
  }

  resetGame() {
    this.leftPaddle.score = 0;
    this.rightPaddle.score = 0;
    this.resetBall();
    this.updateScore();
    this.sendScoreUpdate();
    this.sendBallPosition();
  }

  startGame(matchID) {
    localStorage.setItem('matchID', matchID);
    this.initializeGame(matchID);
  }

  async fetchMatchID() {
    const status = "normal";
    const token_access = localStorage.getItem('access_token');
    try {
      let response = await fetch(`http://localhost:8000/api/game/${status}/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token_access}`,
        }
      });
      response = await this.handleAuthResponse(response, this.fetchMatchID.bind(this));
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.startGame(data.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteMatch(matchID) {
    const token_access = localStorage.getItem('access_token');
    try {
      let response = await fetch(`http://localhost:8000/api/game/delete-match/${matchID}/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token_access}`,
        }
      });
      response = await this.handleAuthResponse(response, this.deleteMatch.bind(this), matchID);
      if (response.ok) {
        console.log('Match deleted');
        window.location.href = 'https://127.0.0.1/';
      }
    } catch (error) {
      console.error(error);
    }
  }

  async handleAuthResponse(response, retryFunction, ...args) {
    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            localStorage.setItem('access_token', data.access);
            return retryFunction(...args);
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Handle failed refresh (e.g., redirect to login)
        }
      } else {
        // Handle missing refresh token (e.g., redirect to login)
      }
    }
    return response;
  }
}

customElements.define('online-game', OnlineGame);