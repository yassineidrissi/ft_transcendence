
// import { fetchChat } from "./chatService.js"
class Messages extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const container = document.createElement('section')
		container.className = 'message-area';
		container.innerHTML = `
        <div class="main-content">
            <div class="row">
                <div class="col-12">
                    <div class="chat-area">
                        <div class="chatlist">
                            <div class="modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="chat-header">
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="Open-tab" data-bs-toggle="tab"
                                                    data-bs-target="#Open" type="button" role="tab" aria-controls="Open"
                                                    aria-selected="true">Conversations</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="modal-body">
                                        <div class="chat-lists">
                                            <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active" id="Open" role="tabpanel"
                                                    aria-labelledby="Open-tab">
                                                    <div class="chat-list"></div>
                                                    <!-- <p class="chat-list-empty">No friends yet. Start adding some!</p> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chatbox-empty">
                            <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chat"
                                viewBox="0 0 16 16">
                                <path
                                    d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                            </svg>
                            <p>Your Messages</p>
                            <span>Send a message to start a chat.</span>
                        </div>
                        <div class="chatbox">
                            <div class="modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="msg-head">
                                    </div>
                                    <div class="modal-body">
                                        <div class="msg-body">
                                            <ul></ul>
                                            <p class="msg-body-empty">No messages yet. Start the conversation now!</p>
                                        </div>
                                    </div>
                                    <div class="send-box">
                                        <div class="send-form">
                                            <div class="input-wrapper">
                                            <input type="text" class="form-control" aria-label="message…" placeholder="Write message…">
                                            <button id="emoji-button" type="button">🙂</button>
                                            </div>
                                            <button class="mb-1" id="message-button" type="button"><i class="fa-solid fa-paper-plane"></i></button>
                                        </div>
                                        <div id="emoji-picker" class="hidden"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
		const style = document.createElement('style');
		style.textContent = `
    		@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
			h1 {
				font-family: "Orbitron", sans-serif;
			}

			.main-content {
				display: block;
				height: 100%;
			}
			
			.cursor-pointer
			{
				cursor: pointer;
			}
			.message-area {
				height: 100%;
				width: 100%;
				background: inherit;
			}
			
			.chat-area {
				width: 100%;
				height: calc(100vh - 60px);
				bottom: 0;
				flex-grow: 1;
				display: block;
				position: relative;
				background-color: inherit;
				border-radius: 0.3rem;
				overflow: hidden;
			}
			
			.chatlist {
				outline: 0;
				height: 100%;
				overflow: hidden;
				width: 220px;
				float: right;
				margin-right: 0;
				padding-right: 0;
				padding-top: 1%;
				padding-left: 0.5rem;
			}
			
			.chat-area .modal-content {
				border: none;
				border-radius: 0;
				outline: 0;
				height: 100%;
			}
			
			.chat-area .modal-dialog-scrollable {
				height: 100% !important;
			}
			
			.chatbox-empty {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100%;
				text-align: center;
				padding: 50px 20px;
				color: var(--border-color);
				font-family: Arial, sans-serif;
				border-right: 1px solid var(--divider-color);
			}
			
			.chatbox-empty .chat-icon {
				height: 50px;
				width: 60px;
				color: rgba(96, 106, 141, 0.8);
				margin-bottom: 15px;
			}
			
			.chatbox-empty p {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 10px;
			}
			
			.chatbox-empty span {
				font-size: 15px;
				color: var(--border-color);
			}
			
			.chatbox {
				width: auto;
				overflow: hidden;
				height: 100%;
				border-right: 1px solid var(--divider-color);
				display: none;
			}
			
			.chatbox .modal-dialog,
			.chatlist .modal-dialog {
				max-width: 100%;
				margin: 0;
			}
			
			.msg-search {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			
			.msg-search i {
				font-size: 20px;
				color: var(--text-color);
				/* color: #4b7bec; */
			}
			
			.chat-area .form-control {
				display: block;
				width: 100%;
				/* margin-left: 5%; */
				padding: 10px;
				/* padding: 10px; */
				/* padding: 0.375rem 0.75rem; */
				font-size: 14px;
				font-weight: 400;
				line-height: 1.5;
				color: var(--text-color);
				background-color: inherit;
				background-clip: padding-box;
				-webkit-appearance: none;
				-moz-appearance: none;
				border-color: #6c757d;
				appearance: none;
			}
			
			.chat-area .form-control:focus {
				outline: 0;
				box-shadow: inherit;
			}
			
			.chat-area .nav-tabs .nav-item {
				width: 100%;
			}
			
			.chat-area .nav-tabs .nav-link {
				width: 100%;
				color: var(--text-color);
				font-size: 14px;
				font-weight: 500;
				line-height: 1.5;
				text-transform: capitalize;
				margin-top: 5px;
				margin-bottom: 2px;
				background: 0 0;
				border: none;
				outline: none;
			}
			
			.chat-area .nav-tabs {
				border-bottom: none;
			}
			
			.chat-list h3 {
				color: var(--text-color);
				font-size: 16px;
				font-weight: 500;
				line-height: 1.5;
				text-transform: capitalize;
				margin-bottom: 0;
			}
			
			.chat-list p {
				color: var(--text-color);
				font-size: 14px;
				font-weight: 400;
				line-height: 1.5;
				margin-bottom: 0;
			}
			
			.chat-list div.d-flex {
				position: fixed;
				margin-bottom: 10px;
				position: relative;
				text-decoration: none;
				padding: 2%;
				cursor: pointer;
				background-color: var(--shadow-color);
				border-radius: 2px;
			}
			
			.chat-list div.active-chat {
				background-color: rgba(13, 110, 253, 0.8);
				border-radius: 0.15rem;
			}
			
			.single-line-text {
				display: flex;
				justify-content: space-between;
				align-items: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.right-aligned-item {
				font-weight: bold;
				color: #6c757d;
			}
			
			
			.chat-list .active {
				display: block;
				content: '';
				clear: both;
				position: absolute;
				bottom: 3px;
				left: 44px;
				height: 12px;
				width: 12px;
				background: var(--online-color);
				border-radius: 50%;
				border: 2px solid var(--text-color);
			}
			
			.chat-list-empty {
				flex-grow: 1;
				display: none;
				justify-content: center;
				align-items: center;
				color: #cccccc;
				text-align: center;
			}
			
			.msg-head h3 {
				color: var(--text-color);
				font-size: 15px;
				font-weight: 500;
				line-height: 1.5;
				margin-bottom: 0;
				text-transform: capitalize;
			}
			
			.msg-head p {
				color: var(--text-color);
				font-size: 15px;
				font-weight: 400;
				line-height: 1.5;
				margin-bottom: 0;
			}
			
			.msg-head {
				padding: 5px 15px 0px;
				border-bottom: 0.1px solid var(--divider-color);
			}
			
			.moreoption {
				display: flex;
				align-items: center;
				justify-content: end;
			}
			
			.moreoption .navbar {
				padding: 0;
			}
			
			.moreoption li .nav-link {
				color: var(--text-color);
				font-size: 20px;
				margin-top: 7px;
			}
			
			.moreoption .dropdown-toggle::after {
				display: none;
			}
			
			.moreoption .dropdown-menu {
				top: 100%;
				left: auto;
				right: 0;
				margin-top: 0.125rem;
				background-color: rgba(0, 0, 0, 0.9);
			}
			
			.moreoption i {
				color: #cccccc;
			}
			
			.moreoption .dropdown-menu .dropdown-item {
				color: var(--light-color);
			}
			
			.moreoption .dropdown-menu .dropdown-item:hover {
				color: var(--dark-color);
			}
			
			.msg-body {
				padding: 3%;
			}
			
			.msg-body ul {
				overflow: hidden;
			}
			
			.msg-body ul li {
				list-style: none;
				margin: 15px 0;
			}
			
			.msg-body ul li.reply {
				color: var(--dark-color);
				display: block;
				width: 100%;
				max-width: 300px;
				text-align: left;
				position: relative;
			}
			
			.msg-body ul li.reply:before {
				display: block;
				clear: both;
				content: '';
				position: absolute;
				top: -6px;
				/* Adjust this value as needed */
				left: -8px;
				/* Adjust to fix alignment */
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 0 12px 15px 12px;
				border-color: transparent transparent var(--secondary-color) transparent;
				transform: rotate(-37deg);
			}
			
			.msg-body ul li.reply p {
				font-size: 14px;
				line-height: 1.5;
				font-weight: 500;
				padding: 15px;
				background: var(--secondary-color);
				display: inline-block;
				border-bottom-left-radius: 10px;
				border-top-right-radius: 10px;
				border-bottom-right-radius: 10px;
				margin-bottom: 0;
			}
			
			.msg-body ul li.reply p b {
				display: block;
				color: var(--text-color);
				font-size: 14px;
				line-height: 1.5;
				font-weight: 500;
			}
			
			.msg-body ul li.sender {
				display: block;
				width: 100%;
				max-width: 300px;
				text-align: right;
				position: relative;
				margin-left: auto;
			}
			
			.msg-body ul li.sender:before {
				display: block;
				clear: both;
				content: '';
				position: absolute;
				bottom: 15px;
				right: -8px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 0 12px 15px 12px;
				border-color: transparent transparent var(--primary-color) transparent;
				transform: rotate(37deg);
			}
			
			
			.msg-body ul li.sender p {
				color: var(--text-color);
				font-size: 14px;
				line-height: 1.5;
				font-weight: 500;
				padding: 15px;
				background: var(--primary-color);
				display: inline-block;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				border-bottom-left-radius: 10px;
				margin-bottom: 0;
			}
			
			.msg-body ul li.sender p b {
				display: block;
				color: var(--text-color);
				font-size: 14px;
				line-height: 1.5;
				font-weight: 500;
			}
			
			.msg-body ul li.sender:after {
				display: block;
				content: '';
				clear: both;
			}
			
			.time {
				display: block;
				color: var(--text-color);
				font-size: 12px;
				line-height: 1.5;
				font-weight: 400;
			}
			
			li.reply .time {
				margin-left: 5px;
			}
			
			li.sender .time {
				margin-right: 20px;
			}
			
			.msg-body h6 {
				text-align: center;
				font-weight: normal;
				font-size: 14px;
				line-height: 1.5;
				color: var(--text-color);
				background: var(--text-color);
				display: inline-block;
				padding: 0 5px;
				margin-bottom: 0;
			}
			
			.msg-body-empty {
				color: #cccccc;
				display: none;
				position: absolute;
				top: 45%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				margin: 0;
			}
			
			
			.send-box {
				padding: 15px;
				border-top: 1px solid var(--divider-color);
			}
			
			.send-box .send-form {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 5px 0;
				padding: 0 4%;
			}
			
			.send-box .form-control {
				display: block;
				width: 100%;
				padding: 0.375rem 0.75rem;
				font-size: 14px;
				font-weight: 400;
				line-height: 1.5;
				color: var(--text-color);
				background-color: inherit;
				background-clip: padding-box;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				border-radius: 0.25rem;
				transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
			}
			
			.send-box input {
				height: 50px;
			}
			
			.send-box #message-button {
				border: none;
				background: var(--primary-color);
				padding: 0.375rem 5px;
				color: var(--text-color);
				border-radius: 50%;
				font-weight: 400;
				height: 45px;
				width: 45px;
				margin-top: 4px;
				margin-left: 12px;
				flex-shrink: 0;
			}
			
			.send-box #message-button i {
				margin-right: 3px;
				margin-top: 6px;
			}
		`;
		
		this.shadowRoot.append(style);
		this.shadowRoot.append(container);
		this.shadowRoot.querySelector(".chat-list div")?.addEventListener('click', function () {
			this.shadowRoot.querySelector(".chatbox").classList.add('showbox');
			return false;
		});

		const emptyChatBox = this.shadowRoot.querySelector(".chatbox-empty")
		const chatBox = this.shadowRoot.querySelector(".chatbox")
		const chatBody = this.shadowRoot.querySelector(".msg-body ul")
		const chatList = this.shadowRoot.querySelector(".chat-list")
		const chatHeader = this.shadowRoot.querySelector(".msg-head")

		const messageInput = this.shadowRoot.querySelector(".send-box input")
		const sendButton = this.shadowRoot.querySelector("#message-button")
		const emojiButton = this.shadowRoot.querySelector('#emoji-button');
		const emojiPicker = this.shadowRoot.querySelector('#emoji-picker');

		const picker = document.createElement('emoji-picker');
		emojiPicker.appendChild(picker)

		const chatSockets = {}
		let target = null


		fetchChat()
			.then(conversations => {
				console.log(conversations)
				if (!conversations?.length) {
					emptyChatBox.style.display = 'flex'
					return;
				}

				conversations.forEach(conversation => {
					const chatListItem = new ChatListItem()
					const chatSocket = this.createChatSocket(conversation.target.username, chatListItem)
					chatSockets[conversation.target.username] = chatSocket
					chatListItem.config = conversation
					chatListItem.addEventListener('click', () => {
						target = conversation.target.username
						// markMessageAsViewed(chatSockets[target])
						chatListItem.mute()
						const conversationHeader = new ChatHeader()
						conversationHeader.config = conversation
						this.shadowRoot.querySelector('.active-chat')?.classList.remove('active-chat')
						chatListItem.chatListItemElement.classList.add('active-chat')
						emptyChatBox.remove()
						chatBox.style.display = 'block'
						chatBox.classList.add("showbox")
						chatHeader.replaceChild(conversationHeader, chatHeader.firstChild)
						chatBody.replaceChildren()
						getConversation(conversation.id).then(messages => {
							if (!messages?.length) {
								chatBody.nextElementSibling.style.display = 'block'
								return;
							}
							messages.forEach((message) => {
								const messageItem = new Message()
								messageItem.config = message
								chatBody.appendChild(messageItem)
							})
							chatBody.lastChild.scrollIntoView()
						})
					})
					chatList.appendChild(chatListItem)
				}
				);
				console.log("fetch function");
			}).catch(error => {
				console.log(error)
			})

		messageInput.onkeyup = function (e) {
			e.preventDefault()
			if (e.key == 'Enter') {
				sendButton.click()
			}
		}

		sendButton.addEventListener('click', function (e) {
			const content = messageInput.value
			if (content) {
				chatSockets[target].send(JSON.stringify({
					'message': content,
				}))
			}
			messageInput.value = ''
		})

		emojiButton.addEventListener('click', () => {
			emojiPicker.classList.toggle('hidden');
		})

		picker.addEventListener('emoji-click', event => {
			messageInput.value += event.detail.unicode;
		});
	}
	markMessageAsViewed(chatSocket) {
		chatSocket.send(JSON.stringify({
			'event': 'seen',
		}))
	}

	createChatSocket(target, chatListItem) {
		const chatBody = this.shadowRoot.querySelector(".msg-body ul")
		const chatSocket = new WebSocket(
			'ws://localhost:8000/ws/chat/'
			+ target
			+ '/'
			+ `?token=${localStorage.getItem('access_token')}`
		)

		chatSocket.onmessage = function (e) {
			const data = JSON.parse(e.data)
			const messageItem = new Message()

			// if (data.sender != user.id) {
			//     if (chatListItem.chatListItemElement.classList.contains("active-chat")) {
			//         markMessageAsViewed(chatSocket)
			//         data.seen_at = new Date()
			//     }
			// } else {
			//     data.seen_at = new Date()
			// }
			messageItem.config = data
			chatBody.appendChild(messageItem)
			messageItem.scrollIntoView()

			if (chatBody.firstElementChild == messageItem) {
				chatBody.nextElementSibling.style.display = 'none'
			}
			chatListItem.update(data)
		}

		chatSocket.onclose = function (e) {
			console.error('Chat socket closed unexpectedly');
		}

		return chatSocket
	}
}

customElements.define('messages-page', Messages);