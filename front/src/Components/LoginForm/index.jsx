import React, { useEffect, useState } from 'react';

function LoginForm({ type, label }) {
    const [datas, setDatas] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        second: '',
    });

    const getUsersList = async (params) => {
        try {
            const response = await fetch('https://localhost:7014/api/Admins', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    useEffect(() => {
        getUsersList().then((data) => { if (data) setDatas(data) })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const { second, value2 } = e.target;
        setFormData({ [second]:value2, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        console.log('Form data:', formData);
        // Tu peux réutiliser formData ici, par exemple pour l'envoyer à un backend ou l'utiliser dans ton application
    };

    return (
        <body>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label for="name">name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <label for="second">{label}</label>
                <input type={type} name="second" value={formData.second} onChange={handleChange} />
                <button type="submit">se connecter</button>
            </form>
        </body>

    )
}

export default LoginForm