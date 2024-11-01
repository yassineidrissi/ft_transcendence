async function eraseNotifications() {
    const response = await fetch('http://localhost:8000/api/notification/delete/',
        {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
            credentials: 'include'
        })

    response = handleAuthResponse(response, eraseNotifications);

    if (!response.ok) {
        throw new Error('Failed to feach on notifications')
    }
    return true
}

async function fetchNotifications() {
    const response = await fetch('http://localhost:8000/api/notification/',
        {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
            credentials: 'include'
        })

    response = handleAuthResponse(response, fetchNotifications);


    if (!response.ok) {
        throw new Error('Failed to feach on notifications')
    }
    return response.json()
}

// function createNotificationSocket() {
//     const Socket = new WebSocket(
//         `ws://localhost:8000/ws/notification/?token=${localStorage.getItem('access_token')}`
//     )

//     Socket.onmessage = function (e) {
//         const data = JSON.parse(e.data)
//         console.log({
//             "is_read": data.is_read,
//             "content": data.content,
//             "timestamp": data.timestamp,
//             "fulfill_link": data.fulfill_link,
//             "reject_link": data.reject_link
//         })
//     }

//     Socket.onclose = function (e) {
//         console.error('Chat socket closed unexpectedly');
//     }
// }