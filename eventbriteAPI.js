function searchEvents() {
   const apiKeyEventbrite = 'JK4DIYOEOEAZUGZSFPY6'
   const keyWord = document.getElementById('keyword').value;
   const city = document.getElementById('city').value;

   const urlEventbrite = `https://www.eventbriteapi.com/v3/events/search/?token=${apiKeyEventbrite}&q=${keyword}&location.address${city}`

   fetch(urlEventbrite)
        .then(response => {
           if (!response.ok) {
               throw new Error('Failed to fetch data from the server');
           }
           return response.json();
        })
        .then(eventbriteData => {
           console.log('Eventbrite Data:', eventbriteData); // Console log the Eventbrite data
           displayEvents(eventbriteData);
        })
        .catch(error => {
           console.error('Error', error);
           displayNoEventsMessage();
        })
}
