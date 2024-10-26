class Signup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const form = document.createElement('form');
		form.action = "#"
		form.innerHTML = `
			<div class="d-flex justify-content-center align-items-center flex-column">
				<auth-input type="text" name="username" id="username" placeholder="Username"></auth-input>
				<auth-input type="email" name="email" id="email" placeholder="Email"></auth-input>
				<auth-input type="password" name="password" id="password" placeholder="Password"></auth-input>
				<auth-input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password"></auth-input>
				<auth-btn title="Sign up" alt="sign up"></auth-btn>
			</div>
			<div>
				<p class="text-light text-center mt-4">Already have an account?<span onclick="navigateTo('signin')" class="ms-2 text-success cursor-pointer text-decoration-underline">Sign in</span></p>
			</div>
		`
		const style = document.createElement("style");
		style.textContent = `
			@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
			span {
				cursor: pointer;
			}
		`
        this.shadowRoot.append(style, form);
    }
}

customElements.define('signup-page', Signup);