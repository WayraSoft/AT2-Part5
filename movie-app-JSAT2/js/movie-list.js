// File: movie-list.js
// // This file defines the MovieList class to manage movie data and update the display efficiently.
// Author: Carlos
// Date: 26/54/2025

// The MovieList Class:
// This class has 2 attributes and a few methods.
// Look at the Readme.md file for full list of methods.

class MovieList {
  constructor(rootId, movies) {
    this.rootId = rootId; // The root element where the list is to appear.
    this.movieList = movies; // The array of movies to be displayed.
    this.refresh(); 
  }

  // Methods:
  // Generate one row of the movieList:
  movieRow(title, year, rating) {
    // Get the parent element.
    const rootElement = document.getElementById(this.rootId);
    // Create the new div
    const row = document.createElement('li');
    // Adding the class and text to the element we created.
    row.classList.add('row');
    row.textContent = `${title} (${year}) - Rating: ${rating}`;
    // Add the new elements we created to the DOM.
    rootElement.appendChild(row);
  }

  // Generate all rows in our movie list: 
  genMovieList() {
    // Loop through the movieList.
    for(let i = 0; i < this.movieList.length; i++) {
      let movie = this.movieList[i];
      console.log(movie);
      // Call the movieRow function to generate a row.
      this.movieRow(movie.title, movie.year, movie.rating);
    }
  }

  // Generates a movie list based on our search term:
  genMovieSearchList(list) {
    // Remove all elements from the display
    this.removeElements();
    // Generate a new list, with the list we passed through:
    // Loop through the passed in list.
    for(let i = 0; i < list.length; i++) {
      let movie = list[i];
      // Call the movieRow function to generate a row.
      this.movieRow(movie.title, movie.year, movie.rating);
    }
  }

  // Remove all list elements from the DOM:
  removeElements() {
    // Get the parent element.
    const rootElement = document.getElementById(this.rootId);
    // Get all elements with the class name of row.
    const childNodes = document.getElementsByClassName('row');
    // childNodes is an array of htmlElements. [0,1,2,3,4,5,6,7,8]
    // Check how many children do we have.
    const len = childNodes.length - 1;
    for(let i = len; i >= 0; i--) {
      // Pull out the last child
      const child = childNodes[i];
      // Remove this child from the DOM
      rootElement.removeChild(child);
    }
  }

  // Refreshes the display:    
  refresh() {
    // Remove all elements.
    this.removeElements();
    // Generate the list to display.
    this.genMovieList();
  }
  
  // Adding a new movie - Create  
  add(title, year, rating) {
    // Add a new movie to the end of the list.
    this.movieList.push({ title: title, year: year, rating:rating});
    this.refresh();
  }

  // Update a movie - Update    
  update(index, title, year, rating) {
    // Update title.
    this.movieList[index].title = title;
    // Update the year.
    this.movieList[index].year = year;
    // Update the rating.
    this.movieList[index].rating = rating;
    // Refresh the list.
    this.refresh();
  }

  // Delete a movie - Delete
  delete(index) {
    // Remove one index from the array.
    this.movieList.splice(index, 1);
    // Refresh the list.
    this.refresh();
  }

  // Sort A - Z 
  // Compare 2 values, and A will go before B.
  // Sort the list in ascending order.
  sortA2Z(){
    this.movieList.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    this.refresh();
  }
  
  // Sort  Z - A
  // Sort the list in descending order.
  sortZ2A(){
    this.movieList.sort(function (a, b) {
      return b.title.localeCompare(a.title);
    });
    this.refresh();
  }

  // Sort by rating: Z - A, highest to lowest:
  sortByRating() {
    this.movieList.sort(function (a, b) {
      // Sort by rating in descending order.
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // If rating are equal, sort by title Z - A
      return b.title.localeCompare(a.title);
    });
    this.refresh();
  }

  // Search by partial title:
  search(nameString) {
    // Create a new list to hold search results.
    let shortList = [];
    // Use a loop to check to see if the nameString is in a movie title.
    for (let movie of this.movieList){
      // check if the nameString is in the movie title.
      if(movie.title.includes(nameString)){
        // if the nameString  is in the movie title, add this to our shortlist.
        shortList.push(movie);
      }
    }
    // Generate the list to display.
    this.genMovieSearchList(shortList);
  }

  // Search by index:
  searchById(index) {
    // Create a new list to hold search results.
    let shortList = [];
    // Check index validity. 
    if (index >= 0 && index < this.movieList.length) {
      shortList.push(this.movieList[index]);
    }
    // Generate the list to display.
    this.genMovieSearchList(shortList);
  }
}

// End of movie-list.js
