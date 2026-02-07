function Login({ goToRegister }) {
    return (
        <div>
            <h2>Login</h2>

            <div>
                <input type="email" placeholder="Email" />
            </div>

            <div>
                <input type="password" placeholder="Password" />
            </div>

            <div>
                <button>Login</button>
            </div>

            <p>
                Don’t have an account?{' '}
                <button onClick={goToRegister}>
                    Register
                </button>
            </p>
        </div>
    )
}

export default Login