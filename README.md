# CodeChallenge_WeekThree

## Description
Flatiron Movie Theater is open for business! You will be building out an
application, Flatdango, that allows a user to purchase movie tickets from the
theater.

#### Date, 2024/04/11

#### By *Caren Wanjiru Mwaka Chibwara*

## Core Deliverables

As a user, I can:

1. See the first movie's details, including its **poster, title, runtime,
   showtime, and available tickets** when the page loads. The number of
   available tickets will need to be derived by subtracting the number of
   `tickets_sold` from the theater's `capacity`. 

2. See a menu of all movies on the left side of the page in the `ul#films`
   element when the page loads. (_optional_: you can style each film in the list
   by adding the classes `film item` to each `li` element.) There is a
   placeholder `li` in the `ul#films` element that is hardcoded in the HTML —
   feel free to remove that element by editing the HTML file directly, or use
   JavaScript to remove the placeholder element before populating the list.

3. Buy a ticket for a movie. After clicking the "Buy Ticket" button, I should
   see the number of available tickets decreasing on the frontend. I should not
   be able to buy a ticket if the showing is sold out (if there are 0 tickets
   available). **A persistence mechanism is needed for this feature. Read the following paragraph for more details**.

   When a ticket is purchased, you need to do the following 
      - Persist the updated number of `tickets_sold` on
      the server. Remember, the frontend shows the number of available tickets
      based on the `tickets_sold` and the `capacity`, so only the `tickets_sold`
      should be updated on the backend when a ticket is purchased.

4. Delete a film from the server. Add a delete button next to each film in the
   `ul#films` menu. When the button is clicked, remove the film from the list
   and also delete the film on the server.

5. When a movie is sold out (when there are no available tickets remaining),
   indicate that the movie is sold out by changing the button text to "Sold
   Out". Also update the film item in the `ul#films` menu by adding a class of
   `sold-out` to the film. For reference, here's what the contents of the
   `ul#films` element should look like with a sold out film:

### Bonus Deliverables

These bonus deliverables are here if you want an extra challenge and won't
affect your score. **Make sure to commit your work to save your progress before
attempting the bonus deliverables!**

1. Click on a movie in the menu to replace the currently displayed movie's
   details with the new movie's details. Note that you may have to make an
   additional GET request to access the movie's details.


## Installation
You use git clone to be able to download the documents in the GitHub

## Installation Requirements
Git

### Installation instruction
```
Git clone https://github.com/Caren-Mwaka/code-challenge-3.git

```
# Live Link
[Git](https://caren-mwaka.github.io/code-challenge-3/)

## Technologies used
HTML
CSS
Github
Javascript

## Support and contact details
github.com/Caren-Mwaka

### License
The content of this site is licensed under the MIT license
Copyright (c) 2024.







