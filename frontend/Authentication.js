async function Register(){
    let Rusername = document.querySelector("#app > auth-layout").shadowRoot.querySelector("#form-container > signup-page").shadowRoot.querySelector("#username").shadowRoot.querySelector("#username")
    let Remail = document.querySelector("#app > auth-layout").shadowRoot.querySelector("#form-container > signup-page").shadowRoot.querySelector("#email").shadowRoot.querySelector("#email")
    let Rpassword = document.querySelector("#app > auth-layout").shadowRoot.querySelector("#form-container > signup-page").shadowRoot.querySelector("#password").shadowRoot.querySelector("#password")
    let password1 = document.querySelector("#app > auth-layout").shadowRoot.querySelector("#form-container > signup-page").shadowRoot.querySelector("#confirm-password").shadowRoot.querySelector("#confirm-password")

    let data = new FormData();
    data.append("username", Rusername.value);
    data.append("email", Remail.value);
    data.append("password", Rpassword.value);
    data.append("password1", password1.value);
    let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            body: data
    })
    let result = await response.json();
	console.log(result);
}
async function LogIn(){
    let Semail = document.querySelector("#app > auth-layout").shadowRoot.querySelector("#form-container > signin-page").shadowRoot.querySelector("#email").shadowRoot.querySelector("#email")
    let Spassword = document.querySelector("#app > auth-layout").shadowRoot.querySelector("#form-container > signin-page").shadowRoot.querySelector("#password").shadowRoot.querySelector("#password")

    let data = new FormData();
    data.append("email", Semail.value);
    data.append("password", Spassword.value);
    let request = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        credentials: 'include',
        body: data
    });
    let result = await request.json();
    console.log(result);
    if (!request.ok) {
        console.log(`Error : ${result.detail}`);
    }
    else{

        localStorage.setItem('isUserSignedIn', true)
        localStorage.setItem('access_token', result.access_token);
        await check_auth();
        navigateTo('/')
    }
}

// async function check_auth()
// {
//     console.log('lolololololololololo');
//     let access_token = localStorage.getItem('access_token');
//     let response = await fetch('http://127.0.0.1:8000/api/user/',{
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Authorization': `Bearer ${access_token}`,
//         }
//     });
//     response = await handleAuthResponse(response, check_auth);
//     if(response.ok)
//     {
//         let data = await response.json();
//         console.log(data);
//         window.UserData = data;
//     }   
//     if(!access_token)
//     {
//         urlRoute('signin');
//         return;
//     }
// }
function LogIn42(){
    console.log('42');
    window.location.href = 'http://127.0.0.1:8000/api/login42/';
    localStorage.setItem('isUserSignedIn', true)
}
async function LogOut(){
    let access_token = localStorage.getItem('access_token');
    let response = await fetch('http://127.0.0.1:8000/api/logout/',{
        method: 'POST',
        credentials: 'include',
    })
    await handleAuthResponse(response, LogOut);
    let result = await response.json();
    console.log(result);
    if(response.ok)
    {
        console.log('socket closedddddddddd',);
        socket.close();
        localStorage.removeItem('access_token');
        localStorage.removeItem('isUserSignedIn');
        window.UserData = {};
        navigateTo('/signin');
    }
}
