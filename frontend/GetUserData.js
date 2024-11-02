async function check_auth() {
    console.log('Starting check_auth...');
    let access_token = localStorage.getItem('access_token');
    let response = await fetch('http://127.0.0.1:8000/api/user/', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });

    response = await handleAuthResponse(response, check_auth);
    if (response && response.ok) {
        let data = await response.json();
        console.log('User data:', data);
        window.UserData = data;
    } else if (!access_token) {
        urlRoute('signin');
    }
}

async function handleAuthResponse(response, retryFunction, params = null) {
    try {
        if (response.status === 401) {
            await refresh_token().catch(error => {
                throw new Error("Refresh token error")
            })
            if (params)
                response = await retryFunction(params)
            response = await retryFunction();
        }
    } catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('isUserSignedIn');
        // console.error('Error during token refresh:', e);
        urlRoute('signin');
        // return response
    }
    return response;
}

async function refresh_token() {
    let response = await fetch('http://127.0.0.1:8000/api/refresh/', {
        method: 'POST',
        credentials: 'include',
    });
    if (response.status === 200) {
        let data = await response.json();
        console.log('Token refreshed successfully');
        localStorage.setItem('access_token', data.access_token);
    } else {
        throw new Error('Failed to refresh token');
    }
}

// Call check_auth when needed, and ensure it is awaited
(async () => {
    await check_auth();
})();