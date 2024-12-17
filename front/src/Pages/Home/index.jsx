import React, { useState, useEffect } from 'react';

function Home() {
    const [departureList, setDepartureList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);

    // États pour les listes filtrées
    const [filteredDepartures, setFilteredDepartures] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);

    const getDepartures = async () => {
        try {
            const response = await fetch('https://localhost:7014/api/Departures', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setDepartureList(data); // Mettre à jour la liste des départs
            setFilteredDepartures(data); // Initialise la liste filtrée
        } catch (error) {
            console.error('Erreur lors de la récupération des départs:', error);
        }
    };

    const getDestinations = async () => {
        try {
            const response = await fetch('https://localhost:7014/api/Destinations', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setDestinationList(data); // Mettre à jour la liste des destinations
            setFilteredDestinations(data); // Initialise la liste filtrée
        } catch (error) {
            console.error('Erreur lors de la récupération des destinations:', error);
        }
    };

    useEffect(() => {
        getDepartures();
        getDestinations();
    }, []);

    // Gestion du filtre des départs
    const handleChangeDeparture = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = departureList.filter((x) =>
            x.country.toLowerCase().includes(value)
        );
        setFilteredDepartures(filtered); // Met à jour l'état
    };

    // Gestion du filtre des destinations
    const handleChangeDestination = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = destinationList;
        setFilteredDestinations(filtered); // Met à jour l'état
        console.log(filteredDestinations)
    };

    return (
        <main>
            <h1>Hello</h1>
            <div>
                <label htmlFor="departure">Departure</label>
                <input
                    type="text"
                    name="departure"
                    onChange={handleChangeDeparture}
                    placeholder="Filtrer les départs..."
                />
                <div>
                    {filteredDepartures.map((item, index) => (
                        <span key={index}>{item.country}</span>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="destination">Destination</label>
                <input
                    type="text"
                    name="destination"
                    onChange={handleChangeDestination}
                    placeholder="Filtrer les destinations..."
                />
                <div>
                    {filteredDestinations.map((item, index) => (
                        <span key={index}>{item.country}</span>
                    ))}
                </div>
            </div>

            <button type="submit">Se connecter</button>
        </main>
    );
}

export default Home;