let userFlightQuery = {
    // Assigning Variables for the queryURL from targeted elements
    // origin: $(),
    // destination: $(),
    // departureStartDate: $(),
    // departureEndDate: $(),
    // durationStart: $(),
    // durationEnd: $(),
    // maxPrice: $(),
    // currency: $(),
    // adults: $(),
    // children: $(),
    // infants: $(),
    // nonstop: $(),
    // travelClass: $(),
    // numberOfResults: $(),
    origin: "BOS",
    destination: "LAX",
    departureDate: "2018-06-25",
    returnDate: "2018-07-15",
    durationStart: 5,
    durationEnd: 7,
    maxPrice: "2000",
    currency: "USD",
    adults: 1,
    children: 0,
    infants: 0,
    nonstop: true,
    travelClass: "ECONOMY",
    numberOfResults: 5,

    //function to create a request URL for the Amadeus API
    flightQuery: function() {
        var queryURL= `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=p1YNpUhekCL0mknNyltGFNg8AAsc5yRI&origin=${userFlightQuery.origin}&destination=${userFlightQuery.destination}&departure_date=${userFlightQuery.departureDate}&return_date=${userFlightQuery.returnDate}&adults=${userFlightQuery.adults}&children=${userFlightQuery.children}&infants=${userFlightQuery.infants}&nonstop=${userFlightQuery.nonstop}&max_price=${userFlightQuery.maxPrice}&currency=${userFlightQuery.currency}&travel_class=${userFlightQuery.travelClass}&number_of_results=${userFlightQuery.numberOfResults}`;
        // var queryURL = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?
        // origin=${userFlightQuery.origin}
        // &destination=${userFlightQuery.destination}
        // &departure_date=&apikey=p1YNpUhekCL0mknNyltGFNg8AAsc5yRI`
        // &duration=${userFlightQuery.durationStart}--${userFlightQuery.durationEnd}
        // &max_price=${userFlightQuery.maxPrice}
        // &currency=${userFlightQuery.currency}
        // &adults=${userFlightQuery.adults}
        // &children=${userFlightQuery.children}
        // &infants=${userFlightQuery.infants}
        // &nonstop=${userFlightQuery.nonstop}
        // &travel_class=${userFlightQuery.travelClass}
        // &number_of_results=${userFlightQuery.numberOfResults}

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            for (let i = 0; i < response.results.length; i++) {
                //Return Price of Trip
                let tripAirPrice = response.results[0].fare.total_price;
                console.log(`The Price Of The Ticket is ${tripAirPrice}`);

                //Number of Layovers for Outbound Flight
                let outboundFlightTotal = response.results[i].itineraries["0"].outbound.flights.length - 1;
                console.log(`The number of layovers for the outbound flight is: ${outboundFlightTotal}`);

                //Number of Layovers for Inbound Flight
                let inboundFlightTotal = response.results[i].itineraries["0"].inbound.flights.length - 1;
                console.log(`The number of layovers for the inbound flight is: ${inboundFlightTotal}`);

                //OUTBOUND FOR LOOP <-THIS GIVES ARRIVAL TIMES AND DATES FOR EACH FLIGHT
                    //The for loop is in case of layovers
                for (let j = 0; j < response.results[i].itineraries["0"].outbound.flights.length; j++) {
                    
                    //Departure Time / Date
                    let departureRaw = response.results[i].itineraries["0"].outbound.flights[j].departs_at;
                    let departureTime = departureRaw.substring(11,16);
                    let departureDate = departureRaw.substring(0,10);
                    let flightNumber = j+1;
                    console.log(`The departure time for the outgoing flight ${flightNumber} is: ${departureTime}`);
                    console.log(`The departure date for the outgoing flight ${flightNumber} is: ${departureDate}`);
                
                    //Arrival Time / Date
                    let arrivalRaw = response.results[i].itineraries["0"].outbound.flights[j].arrives_at;
                    let arrivalTime = arrivalRaw.substring(11,16);
                    let arrivalDate = arrivalRaw.substring(0,10);
                    console.log(`The arrival time for the outgoing flight ${flightNumber} is: ${arrivalTime}`);
                    console.log(`The arrival date for the outgoing flight ${flightNumber} is: ${arrivalDate}`);
                }

                //INBOUND FOR LOOP <-THIS GIVES ARRIVAL TIMES AND DATES FOR EACH FLIGHT
                //The for loop is in case of layovers
                for (let j = 0; j < response.results[i].itineraries["0"].inbound.flights.length; j++) {
                
                    //Departure Time / Date
                    let departureRaw = response.results[i].itineraries["0"].inbound.flights[j].departs_at;
                    let departureTime = departureRaw.substring(11,16);
                    let departureDate = departureRaw.substring(0,10);
                    let flightNumber = j+1;
                    console.log(`The departure time for the outgoing flight ${flightNumber} is: ${departureTime}`);
                    console.log(`The departure date for the outgoing flight ${flightNumber} is: ${departureDate}`);
                
                    //Arrival Time / Date
                    let arrivalRaw = response.results[i].itineraries["0"].inbound.flights[j].arrives_at;
                    let arrivalTime = arrivalRaw.substring(11,16);
                    let arrivalDate = arrivalRaw.substring(0,10);
                    console.log(`The arrival time for the outgoing flight ${flightNumber} is: ${arrivalTime}`);
                    console.log(`The arrival date for the outgoing flight ${flightNumber} is: ${arrivalDate}`);
                }

            }


        }).catch(function(err) {
            console.log(`There was an error processing the request. Desired price may be too low, the amount of people selected may be zero, or an input may be invalid`)
        });
    }
};
userFlightQuery.flightQuery();