async function fetchChat() {
    const response = await fetch({ uri: 'chat', method: 'GET' }, true)
        // .catch(error => {
        //     return null
        // })
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

export { fetchChat, getConversation, deleteChat }