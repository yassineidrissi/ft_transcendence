async function DeleteAccount(){
    console.log("delete account");
    let access_token = localStorage.getItem('access_token');
    let response = await fetch('http://127.0.0.1:8000/api/deletUser/',{
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
    handleAuthResponse(response, DeleteAccount);
    let result = await response.json();
    if(response.ok)
    {
        localStorage.removeItem('access_token');
        localStorage.removeItem('isUserSignedIn');
        alert('Account deleted');
        navigateTo('/signin');
    }
    else
    {
        console.log(`ERROR :${result}`);
    }
}