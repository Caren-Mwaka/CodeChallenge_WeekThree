// Initial Load
// ensures that my JavaScript runs after the HTML document has been completely loaded.
document.addEventListener("DOMContentLoaded", () => {

  // My DOM Elements - selecting various DOM elements using getElementById() method and storing them in variables.
  // The getElementById() method of the document interface returns an element object representing the element whose id property matches the specified string.   
  const poster = document.getElementById("poster");
  const title = document.getElementById("title");
  const runtime = document.getElementById("runtime");
  const showtime = document.getElementById("showtime");
  const ticketsRemaining = document.getElementById("ticket-num");
  const description = document.getElementById("film-info");
  const listOfFilms = document.getElementById("films");
  let availableTickets;

  // Load Film Details
  function loadFilmDetails(id) {
    fetch(`http://localhost:3000/films/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load film details');
      }
      return response.json();
    })
      .then((data) => {
        filmDetails(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  // Display Film Details
  function filmDetails(film) {
    poster.src = film.poster;
    title.textContent = film.title;
    runtime.textContent = `${film.runtime} minutes`;
    showtime.textContent = film.showtime;
    description.textContent = film.description;

    availableTickets = film.capacity - film.tickets_sold;
    ticketsRemaining.textContent = availableTickets;

    const buyButton = document.getElementById("buy-ticket");
    if (availableTickets === 0) {
      buyButton.textContent = "Sold Out";
      buyButton.setAttribute("disabled", "true");
    } else {
      buyButton.textContent = "Buy Ticket";
      buyButton.removeAttribute("disabled");
      buyButton.addEventListener("click", (e) => {
        e.preventDefault();// Prevents the default action of the button click,ensureS that clicking the button only executes the JS code inside the event listener
        buyTicket(film.id);
      });
//I used the .setAttribute() and .removeAttribute() methods to add and remove the disabled attribute of the button.
//When the disabled attribute is present on the HTML button element, the button becomes unclickable.

    }
  }
  loadFilmDetails(1);

  // Load Film List
  function loadFilmList() {
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        filmList(data);
        addClickEventToFilms();
      })
      .catch((error) => console.error("Error:", error));
  }

// Display Film List
  function filmList(films) {

// Clearing the existing list
    while (listOfFilms.firstChild) {
      listOfFilms.removeChild(listOfFilms.firstChild);
    }
//The while loop iterates over the child nodes of listOfFilms.
//The listOfFilms.removeChild() method removes each child node (movie list item) from listOfFilms one by one.

// Creating and appending a list items for each film
    films.forEach((film) => {
      const listItem = document.createElement("li");
      listItem.className = "film-item";
      listItem.textContent = film.title;
      listItem.setAttribute("data-id", film.id);
//iterating through the array of film objects using films.forEach((film) => {...}) to create new list items for each film and append them to the DOM.
//also set its class name and text content, and added a delete button to each film item.

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteFilm(film.id);
      });

      if (film.capacity - film.tickets_sold === 0) {
        listItem.classList.add("sold-out");
      }//also added a "sold-out" class to the list item. This caters for when there are no available tickets for a particular movie.

      listItem.appendChild(deleteButton);// appending the delete button to the new list element.
      listOfFilms.appendChild(listItem);// appending the new list of items to the unordered list.
    });
  }
  loadFilmList();

  // Deleting a film
  function deleteFilm(id) {
    fetch(`http://localhost:3000/films/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Delete request failed');
      }
      return response.json();
    })
      .then(() => {
        const filmItem = document.querySelector(`#films li[data-id="${id}"]`);
        filmItem.remove();
      })
      .catch((error) => console.error("Error:", error));
  }
//deleteFilm(id) is a function that takes a film ID as an argument.
//Inside this function,the fetch() function is used to send a DELETE request to the server to delete a film with the specified id.
//Once the film is successfully deleted from the server, it removes the corresponding film item from the DOM by selecting the film item using its data-id attribute and removing it from its parent element.

  // Buying a ticket
  function buyTicket(id) {
    //The buyTicket(id) function allows a user to buy a ticket for a specific film.
    //It first fetches the film details to check if tickets are available.
    //If tickets are available, it updates the tickets_sold count for that film on the server using a PATCH request.

    fetch(`http://localhost:3000/films/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to buy a ticket');
      }
      return response.json();
    })
      .then((film) => {
        if (film.tickets_sold < film.capacity) {
          const newTicketsSold = film.tickets_sold + 1;
          fetch(`http://localhost:3000/films/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tickets_sold: newTicketsSold,
            }),
          })
            .then(() => {
              loadFilmDetails(id);
              recordPurchase(id, 1); // records the purchase of 1 ticket for a film of a particular id.
            })
            .catch((error) => console.error("Error:", error));
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function recordPurchase(filmId, numberOfTickets) {
    console.log(
      `Purchased ${numberOfTickets} ticket(s) for film with ID: ${filmId}`
    );
    //recordPurchase is a function that logs a message to the console when a ticket purchase is recorded.
    //It displays the film ID and the number of tickets purchased in the console log.
  }

  // Posting a ticket
  function postTicket(filmId, numberOfTickets) {
    fetch("http://localhost:3000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        film_id: filmId,
        number_of_tickets: numberOfTickets,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Ticket purchased:", data))
      .catch((error) => console.error("Error:", error));
  }
  //the fetch function is used to send a POST request to the server to add a new ticket.
  //postTicket is a function that posts a new ticket purchase to the server.
  postTicket(28, 5);

  // Adding Click Event to Films
  function addClickEventToFilms() {
    const filmItems = document.querySelectorAll(".film-item");
    filmItems.forEach((item) => {
      item.addEventListener("click", () => {
        const filmId = item.getAttribute("data-id");
        loadFilmDetails(filmId);
      });
    });
  }
 //addClickEventToFilms is a function that adds a click event listener to each film item displayed on the webpage.
 //When a film item is clicked, it retrieves the film id from the data-id attribute and loads the details of the clicked film.
  addClickEventToFilms();
});
