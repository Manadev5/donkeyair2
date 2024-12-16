import React, { useEffect, useState } from 'react';


function Home() {
    const [departureList, setdepartureList] = useState([]);
    const [destinationList, setdestinationList] = useState([]);
    const [formData, setFormData] = useState({
        departure: '',
        destination: '',
    });
   let departureCountries = [];
   let destinationCountries = [];

    const getDepartures = async (params) => {
        try {
            const response = await fetch('https://localhost:7014/api/Departures', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            return data
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    const getDestinations = async (params) => {
        try {
            const response = await fetch('https://localhost:7014/api/Destinations', {
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
        getDepartures().then((data) => { if (data) setdepartureList(data) })
        getDestinations().then((data) => { if (data) setdestinationList(data) })
    }, [])

    const handleChangeDeparture = (e) => {
        console.log(e);
        let DeparturesSorted = departureList.find(x => (x.country.toLowerCase()).includes(e.target.value.toLowerCase()))
        console.log(DeparturesSorted)
        departureCountries = DeparturesSorted;

    };

    const handleChangeDestination = (e) => {
        console.log(e);
        let DestinationsSorted = destinationList.find(x => (x.country.toLowerCase()).includes(e.target.value.toLowerCase()))
        console.log(DestinationsSorted)
        destinationCountries = DestinationsSorted;


    };


    return (

        <main>
            <div>
                <label for="departure">departure</label>
                <input type="text" name="departure" onChange={handleChangeDeparture} />
                <div>
                 </div>
            </div>
            <div>
                <label for="destination">destination</label>
                <input type="destination" name="destination" onChange={handleChangeDeparture}/>
                <div>
                  { departureCountries.map((i) => <span>{i.country}</span>)}
                </div>
            </div>
            <button type="submit">se connecter</button>
        </main>
    )
}

export default Home