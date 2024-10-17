document.addEventListener('click', e => {
	if (!e.target.matches('nav a'))
		return;
	e.preventDefault()
	navigateTo(e.target.href)
})

if (!JSON.parse(localStorage.getItem("isUserSignedIn")))
	localStorage.setItem("isUserSignedIn", JSON.stringify(false));
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
	}
}

const handleLogout = () => {
	localStorage.setItem("isUserSignedIn", JSON.parse(false));
	navigateTo("signin")
}

const handleLayout = async (route) => {
	html = await fetch(route.page).then(response => response.text());
	if (route.title === "Sign up" || route.title === "Sign in")
		app.innerHTML = `<auth-layout route="${route.title}">${html}</auth-layout>`
	else if (route.title === "Dashboard" || route.title === "Profile")
		app.innerHTML = `<core-layout showHistory=${true}>${html}</core-layout>`;
	else if (route.title === "History" || route.title === "Messages"
				|| route.title === "Tournament")
		app.innerHTML = `<core-layout showHistory=${false}>${html}</core-layout>`;
}

const urlLocationHandler = async () => {
	const location = window.location.pathname.toLowerCase();
	let route = urlRoutes[location] || urlRoutes[404];
	const storedUserData = localStorage.getItem('isUserSignedIn')
	if (JSON.parse(storedUserData) == true && (location == "/" || location == "/signin" || location == "/signup"))
	{
		route = urlRoutes["/dashboard"];
		window.history.pushState({}, "", "/");
	}
	else if (JSON.parse(storedUserData) == false && location != "/signin" && location != "/signup")
	{
		route = urlRoutes["/signin"];
		window.history.pushState({}, "", "/signin");
	}
	document.title = `${route.title} | SPA JS`;
	handleLayout(route);
}

window.onpopstate = urlLocationHandler;

urlLocationHandler();


const urlRoute = route => {
	window.history.pushState({}, "", route);
	urlLocationHandler();
}

const navigateTo = route => {
	urlRoute(route);
}

const signin = () => {
	localStorage.setItem("isUserSignedIn", JSON.stringify(true));
	navigateTo("/")
}

