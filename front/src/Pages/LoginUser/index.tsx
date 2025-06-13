import LoginForm from "../../Components/LoginForm";
import type { LoginCredentials, responseConnexion } from "../../Models/Types";
import { useAuth } from "../../AuthContext";

function LoginUser(){
    const {login} = useAuth();

    const SearchUser  = async ({name, password}:LoginCredentials) => {
            try {
                const response = await fetch(`https://localhost:7014/api/Users/connection?pName=${name}&pPassword=${password}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok){
                        throw new Error(`HTTP error! Status: ${response.status}`)
                }else{
                    const data:responseConnexion = await response.json();
                    if(data.token){
                        login(data.token);
                        alert("Connexion réussie !");
                    }
                };

            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
            }
        };
    return (
        <div>
            <main>
                <h1>Login</h1>
                <LoginForm
                    onSubmit={SearchUser}

                />
            </main>
        </div>
    )

}

export default LoginUser