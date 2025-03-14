import React, { useState, useEffect, ChangeEvent } from 'react';
import { departure } from '../../Models/Ticket';
import { destination } from '../../Models/Ticket';

function Home() {
    const [departureList, setDepartureList] = useState<departure[]>([]);
    const [destinationList, setDestinationList] = useState<destination[]>([]);

    const [filteredDepartures, setFilteredDepartures] = useState<departure[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<destination[]>([]);
    const [IdDeparture, setIdDeparture] = useState<number | null>(null);
    const [IdDestination, setIdDestination] = useState<number | null>(null);

    const [departureName, setDepartureName] = useState("");
    const [destinationName, setDestinationName] = useState("");

    const getDepartures = async () => {
        try {
            const response = await fetch('https://localhost:7014/api/Departures', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data : departure[] = await response.json();
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
            const data : destination[] = await response.json();
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
    const handleChangeDeparture = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value.toLowerCase();
        setDepartureName(value);
        const filtered = departureList.filter((x) =>
            x.country.toLowerCase().includes(value)
        );
        setFilteredDepartures(filtered); // Met à jour l'état
    };

    // Gestion du filtre des destinations
    const handleChangeDestination = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value.toLowerCase();
        setDestinationName(value);
        const filtered = destinationList.filter((x) =>
            x.desCountry.toLowerCase().includes(value)
        );
        console.log(filtered)
        setFilteredDestinations(filtered); // Met à jour l'état
    };

    function saveDestination(IdDestination: number, name: string) {
        setIdDestination(IdDestination);
        setDestinationName(name)
        console.log(destinationName)
    }

    function saveDeparture(IdDeparture: number, name: string) {
        setIdDeparture(IdDeparture);
        setDepartureName(name)
        console.log(IdDeparture)
    }

    const onSubmitCountries = async () => {

        try {
            if ((IdDeparture !== undefined || IdDeparture !== null) && (IdDestination !== undefined || IdDestination !== null)) {
                const response = await fetch(`https://localhost:7014/api/Tickets?idDeparture=${IdDeparture}&idDestination=${IdDestination}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tickets:', error);

        }

    }

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
                    value={departureName}
                />
                <div>
                    {filteredDepartures.map((item) => (
                        <span key={item.idDeparture} onClick={() => saveDeparture(item.idDeparture, item.country)}>{item.country}</span>
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
                    value={destinationName}
                />
                <div>
                    {filteredDestinations.map((item) => (
                        <span key={item.idDestination} onClick={() => saveDestination(item.idDestination, item.desCountry)}>{item.desCountry}</span>
                    ))}
                </div>
            </div>

            <button onClick={() => onSubmitCountries()}>Se connecter</button>
        </main>
    );
}

export default Home;