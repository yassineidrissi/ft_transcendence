function getToken(){
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');
	if (token) {
		localStorage.setItem("token", token);
	} else {
		console.log("Token not found in URL.");
	}
}
getToken();
let socket = null;
check_auth();

const app = document.getElementById("app");
const urlRoutes = {
	404: {
		page: "/pages/404.html",
		title: "Not found",
		description: ""
	},
	"/dashboard": {
		page: "/pages/dashboard.html",
		title: "Dashboard",
		description: ""
	}
	,
	"/signin": {
		page: "/pages/signin.html",
		title: "Sign in",
		description: ""
	},
	"/signup": {
		page: "/pages/signup.html",
		title: "Sign up",
		description: ""
	},
	"/messages": {
		page: "/pages/messages.html",
		title: "Messages",
		description: ""
	},
	"/history": {
		page: "/pages/history.html",
		title: "History",
		description: ""
	},
	"/profile": {
		page: "/pages/profile.html",
		title: "Profile",
		description: ""
	},
	"/tournament": {
		page: "/pages/tournament.html",
		title: "Tournament",
		description: ""
	},
	"/online-game": {
		page: "/pages/online-game.html",
		title: "Online Game",
		description: ""
	},
	"/offline-game": {
		page: "/pages/offline-game.html",
		title: "Offline Game",
		description: ""
	},
	"/cpu-game": {
		page: "/pages/cpu-game.html",
		title: "CPU Game",
		description: ""
	},
	"/2fa": {
		page: "/pages/fa.html",
		title: "Two Factor Authentication",
		description: ""
	},
}

if (!JSON.parse(localStorage.getItem("isUserSignedIn")))
	localStorage.setItem("isUserSignedIn", JSON.stringify(false));
	  

const handleLayout = async (route) => {
	const html = await fetch(route.page).then(response => response.text());
	if (route.title === "Sign up" || route.title === "Sign in" || route.title === "Two Factor Authentication")
		app.innerHTML = `<auth-layout route="${route.title}">${html}</auth-layout>`
	else if (route.title === "Dashboard" || route.title === "Profile")
		app.innerHTML = `<core-layout showHistory=${true}>${html}</core-layout>`;
	else {
		app.innerHTML = `<core-layout showHistory=${false}>${html}</core-layout>`;
	}
}

const usersDB = [
	"user1",
	"user2",
	"user3",
	"user4",
	"testuser",
	"NoobMaster69"
]

const isUser = arg => {
	const target = usersDB.find(user => user.toLowerCase() == arg);
	if (target)
		return true;
	return false;
}

const urlLocationHandler = async () => {
	const location = window.location.pathname.toLowerCase();
	let route = urlRoutes[location] || urlRoutes[404];
	const storedUserData = localStorage.getItem('isUserSignedIn')
	// if (JSON.parse(storedUserData) == true && isUser(location.substring(1))) {
	// 	const profile = document.createElement("div");
	// 	profile.className = "container  d-flex flex-column align-items-center text-light"
	// 	profile.innerHTML = `
	// 			<img src="./Core/Shared/assets/avatar.jpg" width="120" class="rounded" ></img>
	// 			<div id"profile-info" class="d-flex flex-column align-items-center mb-4">
	// 				<h1>${location.substring(1)}</h1>
	// 				<win-loss-draw></win-loss-draw>
	// 			</div>
	// 			<div class="general-stats mb-5 d-flex w-100 justify-content-evenly">
	// 				<div class="stat general-stat high-stat">
	// 					<p class="label fs-5">Highest Score in a Single Match</p>
	// 					<p class="stat-value fs-2 fw-semibold text-center">12</p>
	// 				</div>
	// 				<div class="stat general-stat total-stat">
	// 					<p class="label fs-5">Total Matches</p>
	// 					<p class="stat-value fs-2 fw-semibold text-center">18</p>
	// 				</div>
	// 				<div class="stat general-stat low-stat">
	// 					<p class="label fs-5">Lowest Score in a Single Match</p>
	// 					<p class="stat-value fs-2 fw-semibold text-center">1</p>
	// 				</div>
	// 			</div>
	// 			<div class="win-rates d-flex flex-column align-items-center w-100">
	// 				<div class="general-win-rate d-flex justify-content-center align-items-center mb-4">
	// 					<div class="d-flex flex-column align-items-center justify-content-center me-4">
	// 						<p class="stat-label fs-5 fw-bold">Win Rate</p>
	// 						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 							<path d="M16.3856 14.4757L17.9429 18.8917C17.9987 19.0593 18.104 19.2061 18.2449 19.3128C18.3858 19.4194 18.5557 19.4808 18.7322 19.489L23.2336 19.7344C23.4178 19.7495 23.5933 19.8194 23.7376 19.935C23.8819 20.0506 23.9883 20.2066 24.0433 20.3831C24.0984 20.5596 24.0994 20.7485 24.0463 20.9256C23.9933 21.1026 23.8885 21.2599 23.7456 21.377L20.2149 24.2997C20.0774 24.4162 19.9755 24.569 19.9208 24.7406C19.8661 24.9123 19.8608 25.0958 19.9056 25.2704L21.1322 29.8144C21.2033 29.9933 21.2149 30.1903 21.1653 30.3763C21.1156 30.5623 21.0074 30.7274 20.8566 30.8471C20.7058 30.9668 20.5204 31.0347 20.328 31.0408C20.1356 31.0469 19.9463 30.9909 19.7882 30.881L16.0442 28.161C15.9018 28.057 15.7299 28.0009 15.5536 28.0009C15.3772 28.0009 15.2053 28.057 15.0629 28.161L11.2869 30.7744C11.1288 30.8842 10.9395 30.9403 10.7471 30.9341C10.5547 30.928 10.3693 30.8601 10.2185 30.7404C10.0677 30.6207 9.9595 30.4557 9.90985 30.2697C9.8602 30.0837 9.87179 29.8866 9.94289 29.7077L11.1696 25.1637C11.2143 24.9892 11.209 24.8056 11.1543 24.6339C11.0996 24.4623 10.9977 24.3095 10.8602 24.193L7.36155 21.3237C7.2357 21.2032 7.14629 21.0498 7.10355 20.8809C7.06082 20.712 7.06648 20.5345 7.1199 20.3687C7.17332 20.2029 7.27233 20.0555 7.40561 19.9433C7.53889 19.8311 7.70106 19.7587 7.87355 19.7344L12.3536 19.489C12.5301 19.4808 12.7 19.4194 12.8409 19.3128C12.9818 19.2061 13.0871 19.0593 13.1429 18.8917L14.7002 14.4757C14.7514 14.2916 14.8616 14.1293 15.0137 14.0137C15.1659 13.898 15.3518 13.8354 15.5429 13.8354C15.734 13.8354 15.9199 13.898 16.072 14.0137C16.2242 14.1293 16.3343 14.2916 16.3856 14.4757Z" fill="#FFE500"/>
	// 							<path d="M7.10537 0.449126L8.2787 3.73446C8.32107 3.86182 8.40061 3.97358 8.50708 4.05533C8.61354 4.13708 8.74205 4.18507 8.87603 4.19313L12.2467 4.33179C12.3869 4.34072 12.521 4.39201 12.6314 4.47888C12.7418 4.56574 12.8232 4.68408 12.8648 4.81822C12.9064 4.95237 12.9063 5.09599 12.8645 5.23008C12.8227 5.36417 12.7412 5.48241 12.6307 5.56913L9.98537 7.78779C9.87966 7.87254 9.8011 7.9864 9.7594 8.11531C9.71769 8.24422 9.71467 8.38252 9.7507 8.51313L10.668 11.9158C10.7094 12.0474 10.7093 12.1885 10.6677 12.32C10.6261 12.4515 10.5451 12.567 10.4356 12.6509C10.3261 12.7347 10.1935 12.7829 10.0557 12.7888C9.91789 12.7947 9.78162 12.758 9.66537 12.6838L6.84937 10.7211C6.74451 10.6432 6.61734 10.6011 6.4867 10.6011C6.35606 10.6011 6.22889 10.6432 6.12403 10.7211L3.30803 12.6838C3.19179 12.758 3.05552 12.7947 2.91772 12.7888C2.77993 12.7829 2.64728 12.7347 2.53779 12.6509C2.4283 12.567 2.34726 12.4515 2.30568 12.32C2.2641 12.1885 2.26399 12.0474 2.30537 11.9158L3.2227 8.51313C3.25873 8.38252 3.25571 8.24422 3.214 8.11531C3.1723 7.9864 3.09374 7.87254 2.98803 7.78779L0.3427 5.65446C0.208903 5.57603 0.105266 5.455 0.0483592 5.31072C-0.00854764 5.16645 -0.0154383 5.00726 0.0287888 4.85861C0.073016 4.70995 0.165807 4.58042 0.292326 4.49072C0.418846 4.40102 0.571788 4.35633 0.7267 4.36379L4.09737 4.22513C4.23533 4.21478 4.36674 4.1621 4.47365 4.07428C4.58056 3.98646 4.65776 3.86779 4.6947 3.73446L5.86803 0.449126C5.91057 0.318557 5.99332 0.204793 6.10445 0.12412C6.21558 0.0434465 6.34938 0 6.4867 0C6.62402 0 6.75782 0.0434465 6.86895 0.12412C6.98008 0.204793 7.06283 0.318557 7.10537 0.449126Z" fill="#FFE500"/>
	// 							<path d="M25.2389 0.449126L26.4122 3.73446C26.4546 3.86182 26.5341 3.97358 26.6406 4.05533C26.747 4.13708 26.8755 4.18507 27.0095 4.19313L30.3802 4.33179C30.5204 4.34072 30.6545 4.39201 30.7649 4.47888C30.8753 4.56574 30.9567 4.68408 30.9983 4.81822C31.0399 4.95237 31.0398 5.09599 30.998 5.23008C30.9562 5.36417 30.8747 5.48241 30.7642 5.56913L28.1189 7.78779C28.0132 7.87254 27.9346 7.9864 27.8929 8.11531C27.8512 8.24422 27.8482 8.38252 27.8842 8.51313L28.8015 11.9158C28.8429 12.0474 28.8428 12.1885 28.8012 12.32C28.7596 12.4515 28.6786 12.567 28.5691 12.6509C28.4596 12.7347 28.327 12.7829 28.1892 12.7888C28.0514 12.7947 27.9151 12.758 27.7989 12.6838L24.9829 10.7211C24.878 10.6432 24.7508 10.6011 24.6202 10.6011C24.4896 10.6011 24.3624 10.6432 24.2575 10.7211L21.4415 12.6838C21.3253 12.758 21.189 12.7947 21.0512 12.7888C20.9134 12.7829 20.7808 12.7347 20.6713 12.6509C20.5618 12.567 20.4808 12.4515 20.4392 12.32C20.3976 12.1885 20.3975 12.0474 20.4389 11.9158L21.3562 8.51313C21.3922 8.38252 21.3892 8.24422 21.3475 8.11531C21.3058 7.9864 21.2272 7.87254 21.1215 7.78779L18.4762 5.65446C18.3657 5.56774 18.2842 5.44951 18.2424 5.31542C18.2006 5.18132 18.2005 5.0377 18.2421 4.90355C18.2837 4.76941 18.3651 4.65107 18.4755 4.56421C18.5859 4.47735 18.72 4.42605 18.8602 4.41713L22.2309 4.27846C22.376 4.26481 22.5127 4.20437 22.6204 4.10625C22.7282 4.00813 22.8011 3.87764 22.8282 3.73446L24.0015 0.449126C24.0441 0.318557 24.1268 0.204793 24.2379 0.12412C24.3491 0.0434465 24.4829 0 24.6202 0C24.7575 0 24.8913 0.0434465 25.0024 0.12412C25.1136 0.204793 25.1963 0.318557 25.2389 0.449126Z" fill="#FFE500"/>
	// 						</svg>
	// 					</div>
	// 					<p class="stat-value fs-3 fw-bold">83.33%</p>								
	// 				</div>
	// 				<div class="sub-stats d-flex w-100 justify-content-evenly">
	// 					<profile-stat title="Win Rate in Tournaments"></profile-stat>
	// 					<profile-stat title="Win Rate VS CPU"></profile-stat>
	// 					<profile-stat title="Win Rate Offline"></profile-stat>
	// 					<profile-stat title="Win Rate Online"></profile-stat>
	// 				</div>
	// 			</div>
	// 	`
	// 	const coreLayout = document.createElement("core-layout");
	// 	coreLayout.setAttribute("showHistory", "true");
	// 	coreLayout.appendChild(profile);
	// 	app.innerHTML = '';
	// 	app.appendChild(coreLayout);
	// 	document.title = `PING PONG | ${location.substring(1)}`;
	// 	window.history.pushState({}, "", location.substring(1));
	// }
	// else {
		if (JSON.parse(storedUserData) == true && (location == "/" || location == "/signin" || location == "/signup" || location == "/2fa" )) {
			route = urlRoutes["/dashboard"];
			// window.history.pushState({}, "", "/");
		}
		else if (JSON.parse(storedUserData) == false && location != "/signin" && location != "/signup" && location != "/2fa") {
			route = urlRoutes["/signin"];
			// window.history.pushState({}, "", "/signin");	
		}
		document.title = `PING PONG | ${route.title}`;
		await handleLayout(route);
}

window.onpopstate = urlLocationHandler;



const urlRoute = route => {
	window.history.pushState({}, "", route);
    urlLocationHandler();
}


const navigateTo = async (route) => {
	window.history.pushState({}, "", route);
	urlLocationHandler();
};

urlLocationHandler();