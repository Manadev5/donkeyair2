import { useState } from 'react';
import type { FormEvent } from 'react';
import type { LoginCredentials } from '../../Models/Types';

type LoginFormProps = {
    onSubmit: (credentials: LoginCredentials) => void;
  }

function LoginForm({onSubmit}: LoginFormProps) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = (e :FormEvent) => {
        e.preventDefault();
        if(onSubmit){
            onSubmit({name, password});
            setName("");
            setPassword("");
        };
        
    };

    return (
        <div>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <label htmlFor="password">password</label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit">se connecter</button>
            </form>
        </div>

    )
}

export default LoginForm