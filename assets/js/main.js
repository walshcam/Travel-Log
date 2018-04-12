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
    returnDate: "2018-4-15",
    durationStart: "5",
    durationEnd: "7",
    maxPrice: "900",
    currency: "USD",
    adults: "1",
    children: "2",
    infants: "1",
    nonstop: true,
    travelClass: "ECONOMY",
    numberOfResults: "5",

    //function to create a request URL for the Amadeus API
    flightQuery: function() {
        var queryURL= `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=p1YNpUhekCL0mknNyltGFNg8AAsc5yRI&origin=${userFlightQuery.origin}&destination=${userFlightQuery.destination}&departure_date=${this.departureDate}&return_date=2018-07-10&adults=2&children=1&infants=1&nonstop=true&max_price=980&currency=USD&travel_class=ECONOMY&number_of_results=5`;
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
        });
    }
};
userFlightQuery.flightQuery();