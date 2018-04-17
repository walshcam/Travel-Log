//GLOBAL VARIABLES

let nonstop = "true";
let roundtrip = true;

// Sticky Header
$(window).scroll(function () {

    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function () {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function () {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
    }
});

// navigation scroll lijepo radi materem
$('nav a').click(function (event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});

$(document).ready(function () {
    $("#searchAirline").on("click", function () {
        let origin = $("#origin").val();
        console.log("Origin before object: " + origin);
        let destination = $("#destination").val();
        let departureDate = $("#departDate").val();
        let returnDate = $("#returnDate").val();
        let currency = "USD";
        let adults = $("#adults").val();
        let children = $("#children").val();
        let infants = $("#infants").val();
        travelClass = "ECONOMY";
        numberOfResults = 1;

        //function to create a request URL for the Amadeus API
        if (roundtrip) {
            var queryURL = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=p1YNpUhekCL0mknNyltGFNg8AAsc5yRI&origin=${origin}&destination=${destination}&departure_date=${departureDate}&return_date=${returnDate}&adults=${adults}&children=${children}&infants=${infants}&nonstop=${nonstop}&currency=${currency}&travel_class=${travelClass}&number_of_results=${numberOfResults}`;
        } else {
            var queryURL = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=p1YNpUhekCL0mknNyltGFNg8AAsc5yRI&origin=${origin}&destination=${destination}&departure_date=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&nonstop=${nonstop}&currency=${currency}&travel_class=${travelClass}&number_of_results=${numberOfResults}`;
        }

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (let i = 0; i < response.results.length; i++) {
                //Return Price of Trip
                let tripAirPrice = response.results[0].fare.total_price;
                $("#price").text(" $ " + tripAirPrice)

                //Number of Layovers for Outbound Flight
                let outboundFlightTotal = response.results[i].itineraries["0"].outbound.flights.length - 1;
                $("#outboundStops").text(outboundFlightTotal);

                //Number of Layovers for Inbound Flight
                let inboundFlightTotal = response.results[i].itineraries["0"].inbound.flights.length - 1;
                $("#inboundStops").text(inboundFlightTotal);

                //*****************Date and Time for Overall Outbound Flights */

                //Date for Outbound Flights

                let outboundInitialDate = response.results[i].itineraries["0"].outbound.flights[0].departs_at.substring(0, 10);
                let outboundFinalDate = response.results[i].itineraries["0"].outbound.flights[0].arrives_at.substring(0, 10);

                if (outboundFinalDate === outboundInitialDate) {
                    $("#outboundInitialDate").text(outboundInitialDate);
                } else {
                    $("#outboundInitialDate").text(outboundInitialDate);
                    $("#outboundFinalDate").text(outboundFinalDate);
                }

                //Time for Outbound Flights

                let outboundInitialTime = response.results[i].itineraries["0"].outbound.flights[0].departs_at.substring(11, 16);
                let outboundFinalTime = response.results[i].itineraries["0"].outbound.flights[0].arrives_at.substring(11, 16);

                $("#outboundTime").text(outboundInitialTime + " - " + outboundFinalTime)

                //*****************Date and Time for Overall Inbound Flights */

                //Date for Inbound Flights

                let inboundInitialDate = response.results[i].itineraries["0"].inbound.flights[0].departs_at.substring(0, 10);
                let inboundFinalDate = response.results[i].itineraries["0"].inbound.flights[0].arrives_at.substring(0, 10);

                if (inboundFinalDate === inboundInitialDate) {
                    $("#inboundInitialDate").text(inboundInitialDate);
                } else {
                    $("#inboundInitialDate").text(inboundInitialDate)
                    $("#inboundFinalDate").text(inboundFinalDate)
                }

                //Time for Inbound Flights

                let inboundInitialTime = response.results[i].itineraries["0"].inbound.flights[0].departs_at.substring(11, 16);
                let inboundFinalTime = response.results[i].itineraries["0"].inbound.flights[0].arrives_at.substring(11, 16);

                $("#inboundTime").text(inboundInitialTime + " - " + inboundFinalTime)

                //OUTBOUND FOR LOOP <-THIS GIVES ARRIVAL TIMES AND DATES FOR EACH FLIGHT
                //The for loop is in case of layovers
                for (let j = 0; j < response.results[i].itineraries["0"].outbound.flights.length; j++) {

                    //Departure Time / Date
                    let departureRaw = response.results[i].itineraries["0"].outbound.flights[j].departs_at;
                    let departureTime = departureRaw.substring(11, 16);
                    let departureDate = departureRaw.substring(0, 10);
                    let flightNumber = j + 1;

                    let operatingAirline = response.results[i].itineraries["0"].outbound.flights[j].operating_airline;

                    console.log(`The operating airline is: ${operatingAirline}`)
                    console.log(`The departure time for the outgoing flight ${flightNumber} is: ${departureTime}`);
                    console.log(`The departure date for the outgoing flight ${flightNumber} is: ${departureDate}`);

                    //Arrival Time / Date
                    let arrivalRaw = response.results[i].itineraries["0"].outbound.flights[j].arrives_at;
                    let arrivalTime = arrivalRaw.substring(11, 16);
                    let arrivalDate = arrivalRaw.substring(0, 10);

                    console.log(`The arrival time for the outgoing flight ${flightNumber} is: ${arrivalTime}`);
                    console.log(`The arrival date for the outgoing flight ${flightNumber} is: ${arrivalDate}`);
                }

                //INBOUND FOR LOOP <-THIS GIVES ARRIVAL TIMES AND DATES FOR EACH FLIGHT
                //The for loop is in case of layovers
                for (let j = 0; j < response.results[i].itineraries["0"].inbound.flights.length; j++) {

                    //Departure Time / Date
                    let departureRaw = response.results[i].itineraries["0"].inbound.flights[j].departs_at;
                    let departureTime = departureRaw.substring(11, 16);
                    let departureDate = departureRaw.substring(0, 10);
                    let flightNumber = j + 1;

                    let operatingAirline = response.results[i].itineraries["0"].inbound.flights[j].operating_airline;

                    console.log(`The operating airline is: ${operatingAirline}`)
                    console.log(`The departure time for the outgoing flight ${flightNumber} is: ${departureTime}`);
                    console.log(`The departure date for the outgoing flight ${flightNumber} is: ${departureDate}`);

                    //Arrival Time / Date
                    let arrivalRaw = response.results[i].itineraries["0"].inbound.flights[j].arrives_at;
                    let arrivalTime = arrivalRaw.substring(11, 16);
                    let arrivalDate = arrivalRaw.substring(0, 10);
                    console.log(`The arrival time for the outgoing flight ${flightNumber} is: ${arrivalTime}`);
                    console.log(`The arrival date for the outgoing flight ${flightNumber} is: ${arrivalDate}`);
                }
            }
        }).catch(function (err) {
            console.log(`There was an error processing the request. Desired price may be too low, the amount of people selected may be zero, or an input may be invalid`)
        });
    });
});

//*****BUTTON ANIMATION

$('#oneWay').click(function () {
    $('#roundTripSelector').animate({
        'left': "50%"
    });
    roundTrip = false;
    $("#hideReturnDate").hide();
});
$('#layovers').click(function () {
    $('#nonStopSelector').animate({
        'left': "50%"
    });
    nonstop = "false";
});
$('#roundTrip').click(function () {
    $('#roundTripSelector').animate({
        'left': "0"
    });
    roundTrip = true;
    $("#hideReturnDate").show();
});
$('#nonStop').click(function () {
    $('#nonStopSelector').animate({
        'left': "0"
    });
    nonstop = "true";
});

//TEXTBOX Resizing
function autoGrow(element) {
    element.style.height = "100px";
    element.style.height = (element.scrollHeight) + "px";
}