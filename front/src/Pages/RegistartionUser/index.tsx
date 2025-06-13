import { useState } from "react";
import LoginForm from "../../Components/LoginForm";
import type { LoginCredentials, responseConnexion } from "../../Models/Types";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../AuthContext";

function RegistartionUser(){

    const [userName, setUserName] = useState<string>("");
    const navigate = useNavigate();
    const {login} = useAuth();

    const createUser  = async ({name, password}:LoginCredentials) => {
            try {
                const response = await fetch('https://localhost:7014/api/Users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({name, password})
                });
                const data:responseConnexion = await response.json();

                if (!response.ok){
                        throw new Error(`HTTP error! Status: ${response.status}`)
                }else{
                    if(data.token){
                        login(data.token);
                        alert("Creation de compte réussie !");
                    }
                    setUserName(name);
                    setTimeout(() => navigate('/home'),1000);
                };

            } catch (error) {
                console.error('Erreur lors de la creation des départs:', error);
                
            }
        };
    return (
        <div>
            <main>
                <h2>Registration</h2>
                {userName !== "" ?
                 <h3>votre compte à bien été créé {userName}</h3> :
                 <LoginForm
                 onSubmit={createUser}
                />}

            </main>
        </div>
    )

}

export default RegistartionUser