let isHomePage = true;


function trending() {
    if (!isHomePage) {
        return;
    }

    const apiKeyTicketmaster = 'l8JrFVYevjoWnqEEWNgF4mP2gAjfZxkI';
    const trendingUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKeyTicketmaster}&sort=date,asc`;

    fetch(trendingUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch trending events from the server');
            }
            return response.json();
        })
        .then(trendingData => {
            console.log('Trending Events Data:', trendingData);
            displayTrendingEvents(trendingData);
        })
        .catch(error => {
            console.error('Error fetching trending events:', error);
            // Display a message or handle as needed
        });
}

function displayTrendingEvents(trendingData) {
    const eventCards = document.querySelectorAll('.event-card');

    try {
        if (trendingData._embedded && trendingData._embedded.events.length > 0) {
            trendingData._embedded.events.forEach((event, index) => {
                if (index < eventCards.length) {
                    const eventCard = eventCards[index];
                    const titleElement = eventCard.querySelector('h3');
                    const descriptionElement = eventCard.querySelector('p');

                    // Update event card with trending event data
                    titleElement.textContent = event.name;
                    descriptionElement.textContent = event.info;
                }
            });
        } else {
            // If no trending events found, display a message or handle as needed
            const eventContainer = document.querySelector('.carousel');
            eventContainer.innerHTML = '<p>No trending events found :(</p>';
        }
    } catch (error) {
        console.error('Error processing trending event data:', error);
        // Display a message or handle as needed
    }
}
