
function Confirm2FA() {
    const container = document.createElement("div")
    container.classList.add('container-form-content')
    container.innerHTML = `
        <div class="auth-otp-box">
            <h2 class="text-center">Two-Factor Authentication</h2>
            <p class="text-center">Enter the 6-digit code we sent to your Authenticator app.</p>

            <!-- 2FA Code Input Form -->
            <form action="" method="POST" class="form-auth-otp" novalidate>
                <div class="mb-3">
                    <label for="authCode" class="form-label">Authentication Code</label>
                    <input type="text" class="form-control" id="authCode" name="authCode"
                        placeholder="Enter 6-digit code" required>
                    <div class="invalid-feedback">
                        Please enter a valid 6-digit authentication code.
                    </div>
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Verify</button>
                </div>
            </form>
        </div>
    `

    container.querySelector(".form-auth-otp").addEventListener('submit', async (event) => {
        event.preventDefault()
        const input = container.querySelector("#authCode")
        const feedback = container.querySelector(".invalid-feedback")
        input.addEventListener('focus', () => {
            input.classList.remove("is-invalid")
        })
        const otp = input.value
        const regex = /^\d{6}$/;

        if (regex.test(otp)) {
            try {
				// verify 2fa func
            } catch (error) {
                feedback.innerHTML = "Invalid Otp.";
                input.classList.add("is-invalid")
            }
        } else {
            input.classList.add("is-invalid")
        }
    })
    return container
}

export default Confirm2FA
