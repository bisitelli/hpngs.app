function searchEvents() {
    const apiKeyTicketmaster = 'l8JrFVYevjoWnqEEWNgF4mP2gAjfZxkI';
    const keyword = document.getElementById('keyword').value;
    const city = document.getElementById('city').value;

    const urlTicketmaster = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKeyTicketmaster}&keyword=${keyword}&countryCode=${city}`;

    fetch(urlTicketmaster)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from the server');
            }
            return response.json();
        })
        .then(ticketmasterData => {
            console.log('Ticketmaster Data:', ticketmasterData);
            displayEvents(ticketmasterData);
        })
        .catch(error => {
            console.error('Error:', error);
            displayNoEventsMessage(); 
        });
}

function sortEventsByDate(ticketmasterData) {
    if (ticketmasterData._embedded && ticketmasterData._embedded.events.length > 0) {
        const eventsWithTime = [];
        const eventsWithoutTime = [];
        
        ticketmasterData._embedded.events.forEach(event => {
            const startDateTime = event.dates.start;
            if (startDateTime.localTime === "00:00:00") {
                eventsWithoutTime.push(event);
            } else {
                eventsWithTime.push(event);
            }
        });

        eventsWithTime.sort((a, b) => {
            const dateA = new Date(a.dates.start.localDate + 'T' + a.dates.start.localTime);
            const dateB = new Date(b.dates.start.localDate + 'T' + b.dates.start.localTime);
            return dateA - dateB;
        });

        return eventsWithTime.concat(eventsWithoutTime);
    } else {
        return [];
    }
}

function displayEvents(ticketmasterData) {
    const eventContainer = document.getElementById('event-container');
    eventContainer.innerHTML = ''; 

    try {
        if (ticketmasterData._embedded && ticketmasterData._embedded.events.length > 0) {
            ticketmasterData._embedded.events.forEach(event => {
                
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');


                
                eventDiv.innerHTML = `
                    <h2>${event.name}</h2>
                    <p>Start Time: ${event.dates.start.localTime}</p>
                    <p>Date: ${event.dates.start.localDate}</p>
                    <p>Venue: ${event._embedded.venues[0].name}</p>
                `;

                if (event.images && event.images.length > 0) {
                    const imageUrl = event.images[0].url; 
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    imgElement.alt = event.name; 
                    imgElement.classList.add('event-image');
                    eventDiv.appendChild(imgElement);
                }

                
                eventContainer.appendChild(eventDiv);
            });
        } else {
            displayNoEventsMessage(); 
        }
    } catch (error) {
        console.error('Error processing event data:', error);
        displayNoEventsMessage(); 
    }
}

function displayNoEventsMessage() {
    const eventContainer = document.getElementById('event-container');
    eventContainer.innerHTML = '<p>No events found :(</p>';
}







