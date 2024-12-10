import LoginForm from "../../Components/LoginForm"
function LoginAdmin() {
    const label = "password";
    const type = "text";
    return (
        <body>
            <main>
                <LoginForm
                    label={label}
                    type={type}
                />
            </main>
        </body>
    )
}

export default LoginAdmin