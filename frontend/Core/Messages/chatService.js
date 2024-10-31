async function fetchChat() {
	let access_token = localStorage.getItem('access_token');
    let response = await fetch('http://127.0.0.1:8000/api/chat/', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });
	response = await handleAuthResponse(response, fetchChat);
    
    if (response.ok) {
        let data = await response.json();
        return data;
		// localStorage.setItem('isUserSignedIn', true)
    } else if (!access_token) {
        urlRoute('signin');
    }
}

async function getConversation(conversation) {
    await fetch({ uri: `http://localhost:8000/api/chat/${conversation}/`, method: 'GET' }, true)
        .catch(error => {
            return null
        })
}

async function deleteChat(conversation) {
    await fetch({ uri: `http://localhost:8000/api/chat/${conversation.target.username}/delete/`, method: 'DELETE' }, true)
}

// export { fetchChat, getConversation, deleteChat }