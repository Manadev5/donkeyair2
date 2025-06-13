import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { departure, destination, Ticket } from '../../Models/Ticket';
import { Link } from 'react-router-dom';

function Home() {
    const [departureList, setDepartureList] = useState<departure[]>([]);
    const [destinationList, setDestinationList] = useState<destination[]>([]);

    const [filteredDepartures, setFilteredDepartures] = useState<departure[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<destination[]>([]);

    const [IdDeparture, setIdDeparture] = useState<number | null>(null);
    const [IdDestination, setIdDestination] = useState<number | null>(null);

    const [departureName, setDepartureName] = useState("");
    const [destinationName, setDestinationName] = useState("");

    const [ticketList, setTicketList] = useState<Ticket[]>([]);

    const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

    //etat du dropdown des pays
    const[showDepartureDropdown, setShowDepartureDropdown] = useState<boolean>(false);
    const[showDestinationDropdown, setShowDestinationDropdown] = useState<boolean>(false);
    //gestion click sur la page pour masquer les dropdowns
    useEffect(() => {
        const handleClick = () => {
          setShowDepartureDropdown(false);
          setShowDestinationDropdown(false);
        };
    
        // Ajouter le listener
        document.addEventListener("click", handleClick);
    
        // Nettoyage quand le composant se démonte
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, []);

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
        setShowDepartureDropdown(true);
        const filtered = departureList.filter((x) =>
            x.country.toLowerCase().includes(value)
        );
        setFilteredDepartures(filtered); // Met à jour l'état
    };

    // Gestion du filtre des destinations
    const handleChangeDestination = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value.toLowerCase();
        setDestinationName(value);
        setShowDestinationDropdown(true);
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
                const data :Ticket[] = await response.json();
                setTicketList(data);
                console.log(ticketList);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tickets:', error);

        }

    }

    function handleRound() {
     setIsRoundTrip(true)
     console.log(isRoundTrip);
    }

    const selectReturnTrip = async () => {
        setTicketList([]);
        const newIdDeparture = departureList.find((x) => x.country === destinationName)?.idDeparture;
        const newIdDestination = destinationList.find((x) => x.desCountry === departureName)?.idDestination;

        try {
            if ((newIdDeparture !== undefined || newIdDeparture !== null) && (newIdDestination !== undefined || newIdDestination !== null)) {
                const response = await fetch(`https://localhost:7014/api/Tickets?idDeparture=${newIdDeparture}&idDestination=${newIdDestination}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data :Ticket[] = await response.json();
                setTicketList(data);
                console.log(ticketList);
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
                    {showDepartureDropdown? filteredDepartures.map((item) => (
                        <span key={item.idDeparture} onClick={() => saveDeparture(item.idDeparture, item.country)}>{item.country}</span>
                    )) : <p></p>}
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
                    {showDestinationDropdown? filteredDestinations.map((item) => (
                        <span key={item.idDestination} onClick={() => saveDestination(item.idDestination, item.desCountry)}>{item.desCountry}</span>
                    )) : <p></p>}
                </div>
            </div>

            <button onClick={handleRound}>round trip</button>

            <button onClick={() => onSubmitCountries()}>Se connecter</button>

            <div>
                {
                    ticketList.length > 0?
                    <div>
                    {ticketList.map((ticket) => (
                        <section>
                            <div key = {ticket.idTicket}>
                                <p>{ticket.departure_date}</p>
                                <p>{ticket.boarding_hour}</p>
                                <p>{ticket.price}</p>
                                <p>{ticket.sit_number}</p>
                                <Link to="login-user"><span>se connecter</span></Link>
                            </div>
                           {isRoundTrip ? <button onClick={selectReturnTrip}>choisir le retour</button> :<p></p>}
                        </section>
                    ))}
                    </div> : <p></p>
                }
            </div>
        </main>
    );
}

export default Home;