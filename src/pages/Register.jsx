function Register({ goToLogin }) {
    return (
        <div>
            <h2>Register</h2>

            <div>
                <input type="text" placeholder="First name" />
            </div>

            <div>
                <input type="text" placeholder="Last name" />
            </div>

            <div>
                <input type="email" placeholder="Email" />
            </div>

            <div>
                <input type="password" placeholder="Password" />
            </div>

            <div>
                <button>Register</button>
            </div>

            <p>
                Already have an account?{' '}
                <button onClick={goToLogin}>
                    Login
                </button>
            </p>
        </div>
    )
}

export default Register