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



const urlLocationHandler = async () => {
	let html = null;
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
	html = await fetch(route.page).then(response => response.text());
	document.title = `${route.title} | SPA JS`;
	handleLayout();
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

const handleLayout = () => {
	
	const location = window.location.pathname.toLowerCase();
	if ((location == "/" || location == "/profile"))
	{
		app.innerHTML = `<nav>
			<a href="/">Home</a>
			<a href="/messages">Messages</a>
			<a href="/history">History</a>
			<a href="/sidebar">Sidebar</a>
		</nav>`
	}
	if (location == "/signin" || location == "/signup")
	{
		app.innerHTML = `<div class="container d-flex justify-content-between flex-column vh-100">
			<span class="cursor-pointer" onclick="navigateTo('signin')" href="signin.html"><img src="./Auth/Assets/logo.svg" class="logo" alt="ping pong logo"></span>
			<div id="form-container" class="signin-form-container d-flex flex-column justify-content-center align-items-center"></div>
			<div class="d-flex justify-content-between align-items-center footer">
				<img src="./Auth/Assets/signin-logo.svg" class="" id="signin-logo" alt="signin logo">
				<img src="./Auth/Assets/signup-logo.svg" class="d-none" id="signup-logo" alt="signup logo">
				<h1 class="text-success fs-1">PING PONG ...</h1>
			</div>
		</div>`
		const form = document.getElementById("form-container");
		const signinLogo = document.getElementById("signin-logo");
		const signupLogo = document.getElementById("signup-logo");
		if (location == "/signin")
		{
			form.innerHTML = `<form action="#" class="d-flex justify-content-center align-items-center flex-column border-bottom pb-4 mb-4">
						<auth-input type="email" name="email" id="email" placeholder="Email"></auth-input>
						<auth-input type="password" name="password" id="password" placeholder="Password"></auth-input>
						<p class="text-light text-end w-100 cursor-pointer">Forgot password?</p>
						<auth-btn title="Sign in" alt="sign in" onclick="signin()" ></auth-btn>
						</form>
						<div>
							<auth-method logo-src="./Auth/Assets/42-ico.svg" method="Intra"></auth-method>
							<p class="text-light text-center mt-4">Don't have an account?<span onclick="navigateTo('signup')" class="ms-2 text-success cursor-pointer text-decoration-underline">Sign up</span></p>
						</div>
			`
			signinLogo.setAttribute("class", "");
			signupLogo.setAttribute("class", "d-none")
		}
		else if (location == "/signup")
		{
			form.innerHTML = `<form action="#" class="d-flex justify-content-center align-items-center flex-column">
						<auth-input type="text" name="username" id="username" placeholder="Username"></auth-input>
						<auth-input type="email" name="email" id="email" placeholder="Email"></auth-input>
						<auth-input type="password" name="password" id="password" placeholder="Password"></auth-input>
						<auth-input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password"></auth-input>
						<auth-btn title="Sign up" alt="sign up"></auth-btn>
					</form>
					<div>
						<p class="text-light text-center mt-4">Already have an account?<span onclick="navigateTo('signin')" class="ms-2 text-success cursor-pointer text-decoration-underline">Sign in</span></p>
					</div>`
			signinLogo.setAttribute("class", "d-none");
			signupLogo.setAttribute("class", "")
		}
	}
	else 
	{
		app.innerHTML = `<nav>
			<a href="/">Home</a>
			<a href="/messages">Messages</a>
			<a href="/sidebar">Sidebar</a>
		</nav>`
	}
}
