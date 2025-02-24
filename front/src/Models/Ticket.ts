export interface Ticket
{
    idTicket : number;
    departure_date: string;
    boarding_hour: string;
    arrival_hour: string;
    travel_time: string;
    travel_number : string;
    sit_number: string;
    idDestination: number;
    idDeparture: number
    price: number; 
    user_ticket_id: number;

}

export interface departure{
    idDeparture: number;
    country: string;
}

export interface destination{
    idDestination: number;
    desCountry: string;
}