async function fetchHistory(userId) {
    let access_token = localStorage.getItem('access_token');
    let response = await fetch(`http://127.0.0.1:8000/api/matches/${userId}/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });
    // response = await handleAuthResponse(response, fetchChat); add params to callback

    if (response.ok) {
        let data = await response.json();
        return data;
    } else if (!access_token) {
        urlRoute('signin');
    }
}

async function fetchDateHistory(date) {
    const newDate = new Date(date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    let response = await fetch(`http://127.0.0.1:8000/api/matches/${year}-${month}-${day}/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });

    if (response.ok) {
        let data = await response.json();
        return data;
    } else if (!access_token) {
        urlRoute('signin');
    }
}

async function getYesterdatHistory() {
    return fetchDateHistory
}

async function getTodayHistory() {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return await fetchDateHistory(newDate);
}