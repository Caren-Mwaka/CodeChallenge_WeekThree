// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const poster = document.getElementById("poster");
  const title = document.getElementById("title");
  const runtime = document.getElementById("runtime");
  const showtime = document.getElementById("showtime");
  const ticketsRemaining = document.getElementById("ticket-num");
  const description = document.getElementById("film-info");
  const listOfFilms = document.getElementById("films");

  let availableTickets;

  // Load Movie Details
  function loadMovieDetails(id) {
    fetch(`http://localhost:3000/films/${id}`)
      .then((response) => response.json())
      .then((data) => {
        movieDetails(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  // Display Movie Details
  function movieDetails(film) {
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
      buyButton.addEventListener("click", () => {
        buyTicket(film.id);
      });
    }
  }
  loadMovieDetails(1);

  // Load Movie List
  function loadMovieList() {
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        moviesList(data);
        addClickEventToMovies();
      })
      .catch((error) => console.error("Error:", error));
  }

  // Display Movie List
  function moviesList(films) {
    
    // Clear the existing list
    while (listOfFilms.firstChild) {
      listOfFilms.removeChild(listOfFilms.firstChild);
    }

    // Create and append list items for each film
    films.forEach((film) => {
      const listItem = document.createElement("li");
      listItem.className = "film-item";
      listItem.textContent = film.title;
      listItem.setAttribute("data-id", film.id);

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteFilm(film.id);
      });

      if (film.capacity - film.tickets_sold === 0) {
        listItem.classList.add("sold-out");
      }

      listItem.appendChild(deleteButton);
      listOfFilms.appendChild(listItem);
    });
  }
  loadMovieList();

  // Delete Film
  function deleteFilm(id) {
    fetch(`http://localhost:3000/films/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const filmItem = document.querySelector(`#films li[data-id="${id}"]`);
        filmItem.remove();
      })
      .catch((error) => console.error("Error:", error));
  }

  // Buy Ticket
  function buyTicket(id) {
    fetch(`http://localhost:3000/films/${id}`)
      .then((response) => response.json())
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
              loadMovieDetails(id);
              recordPurchase(id, 1); // Recording 1 ticket purchase
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
  }

  // Post Ticket
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
  postTicket(28, 5);

  // Add Click Event to Movies
  function addClickEventToMovies() {
    const filmItems = document.querySelectorAll(".film-item");
    filmItems.forEach((item) => {
      item.addEventListener("click", () => {
        const filmId = item.getAttribute("data-id");
        loadMovieDetails(filmId);
      });
    });
  }

  addClickEventToMovies();
});
