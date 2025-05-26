// File: app.js
// // This file manages movie list interactions, handles CRUD operations and    updates the UI dynamically.
// Author: Carlos
// Date: 26/54/2025

// Create an array of movies:
let initMovies = [
  {title: "Panther", year: 1990, rating: 3.3},
  {title: "Closure", year: 1989, rating: 4.4},
  {title: "Pentagon Wars, The", year: 1997, rating: 1.2},
  {title: "Mike Tyson: Undisputed Truth", year: 2002, rating: 4.2},
  {title: "Lone Wolf McQuade", year: 2015, rating: 4.5},
  {title: "Uptown Saturday Night", year: 1986, rating: 2.7}
]

// Create an instance of the MoveList class:
// It takes in the rootId and the movie array.
let movieList = new MovieList('list', initMovies);
// Searching and sorting:

// Search by name Click - event      
function searchClick() {
  // Get the text element from the DOM.
  let formElements = document.getElementById("form-list-control").elements;
  // Get text from the form.
  let text = formElements["search-name"].value;
  // Validation:
  // Name is not empty.
  if (text.trim() === "") {
    alert("Please enter a movie name!");
    return;
  }
  // Run the search method.
  movieList.search(text);
}

// Search by ID Click - event 
function searchClickId() {
  // Get the text element from the DOM.
  let formElements = document.getElementById("form-list-control").elements;
  // Get text from the form.
  let idInput = formElements["search-id"].value;
  // Validations:
  // Index is not empty.
  if (idInput === "") {
    alert("ID is required!");
    return;
  }
  // Index is a number.
  if (idInput * 1 != idInput) {
    alert("Index must be a number!");
    return
  }
  // Convert to 0-based index.
  let id = Number(idInput) - 1; 
  // Validate Index (not out of bounds).
  // Index is a number.
  if (Number(idInput) < 1 || Number(idInput) > movieList.movieList.length) {
    alert("ID is out of range!");
    return;
  }
  // Run the search method.
  movieList.searchById(id);
}

// A to Z click - event
// Sort in ascending order.
function a2zClick() {
  // Run the sort method.
  movieList.sortA2Z();
}

// Z to A Click - event
// Sort in descending order.
function z2aClick() {
  // Run the sort method.
  movieList.sortZ2A();
}

// Best Movie Click - event   
// Sort by Rating  Z - A
function bestClick() {
  // Run the sort method
  movieList.sortByRating();
}

// Refresh - event 
function refreshClick() {
  movieList = new MovieList('list', initMovies);
}

// Crud functions:
// C - Create - add new content.
// R - Read - read content or display content.
// U - Update - update content.
// D - Delete - delete content.

// Add click - event:
// Add a new movie to the list - (Create) 
function addClick() {
  // Get the add form elements from the DOM.
  let formElements = document.getElementById("form-add").elements;
  // Get the movie title from the form.
  let title = formElements["title"].value;
  // Get the year from the form.
  let year = formElements["year"].value;
  // Get the rating from the form.
  let rating = formElements["rating"].value;
  // Validations:
  // Validate Title (not empty and less than 50 characters)
  if (title === "") {
    alert("Title cannot be empty!");
    return;
  }
  if (title.length > 50) {
    alert("Title must be 50 characters or less!");
    return;
  }
  // Validate Year (value is a number)
  if (isNaN(Number(year))) {
    alert("Year must be a number!");
    return;
  }
  // Validate Year (not empty and between 1950 and actual year)
  const currentYear = new Date().getFullYear();
  if (year === "") {
    alert("Year is required.");
    return;
  }
  if (Number(year) < 1950 || Number(year) > currentYear) {
    alert("Year must be between 1950 and " + currentYear + ".");
    return;
  }
  // Validate rating (not empty and between 0.0 and 5.0)
  if (rating === "") {
    alert("Rating is required.");
    return;
  }
  // Validate rating (value is a number)
  if (isNaN(Number(rating))) {
    alert("Rating must be a number!");
    return;
  }
  if (Number(rating) < 0.0 || Number(rating) > 5.0) {
    alert("Rating must be between 0.0 and 5.0.");
    return;
  }
  // Save the new movie into the list.
  movieList.add(title, Number(year), Number(rating));
  // Clear the input fields.
  formElements.title.value = "";
  formElements.year.value = "";
  formElements.rating.value = "";
}

// Update click - event:
// Update a movie in the list - (Update)   
function updateClick() {
  // Get all form child elements from the DOM.
  let formElements = document.getElementById("form-update").elements;
  // get the values from the input boxes.
  let index = formElements["index"].value - 1;
  let title = formElements["title"].value;
  let year = formElements["year"].value;
  let rating = formElements["rating"].value;
  // Validations:
  // Validate for empty properties.
  if (formElements["index"].value === "" || title === "" || year === "" || rating === "") {
    alert("All fields are required.");
    return;
  }
  // Validate Index (it is a number).
  if (isNaN(formElements["index"].value)) {
    alert("Index must be a number!");
  }
  // Validate Index (not out of bounds).
  if (Number(index) < 0 || Number(index) >= movieList.movieList.length) {
    alert("Index is out of range.");
    return;
  }
  // Validate Title (no more than 50 characters).
  if (title.length > 50) {
    alert("Title must be 50 characters or less.");
    return;
  }
  // Validate Year (value is a number)
  if (isNaN(Number(year))) {
    alert("Year must be a number!");
    return;
  }
  // Validate Year (between 1950 and actual year).
  const currentYear = new Date().getFullYear();
  if (Number(year) < 1950 || Number(year) > currentYear) {
    alert("Year must be between 1950 and " + currentYear + ".");
    return;
  }
  // Validate rating (value is a number)
  if (isNaN(Number(rating))) {
    alert("Rating must be a number!");
    return;
  }
  // Validate Rating (not empty and between 0.0 and 5.0).
  if (Number(rating) < 0.0 || Number(rating) > 5.0) {
    alert("Rating must be between 0.0 and 5.0.");
    return;
  }
  // Save the update to the movieList.
  movieList.update(Number(index), title, Number(year), Number(rating));
  // Clear the input boxes
  formElements.index.value = "";
  formElements.title.value = "";
  formElements.year.value = "";
  formElements.rating.value = "";
}

// Delete click - event:
// Delete a movie in the list - (Delete)
function deleteClick(){
  // Get the form element from the DOM.
  let indexElement = document.getElementById("delIndex");
  // get the value from the element. 
  // -1 to the value to get the index in the moveList array.
  // Can also test for out of bounds here too.
  let input = indexElement.value
  let index = indexElement.value - 1;
  // Validation:
  // Index is not empty.
  if (input === "") {
    alert("Index is required!");
    return
  }
  // Index is a number.
  if (input * 1 != input) {
    alert("Index must be a number!");
    return
  }
  // Index is not out of bounds.
  if (Number(input) < 1 || Number(input) > movieList.movieList.length) {
    alert("Index is out of range!");
    return
  }
  // Delete the movie from the movieList
  movieList.delete(Number(index));
  // Clear the input box.
  indexElement.value = "";
}

// UI JavaScript
// JavaScript for Tabs
// Function openForm()
// Takes in 2 parameters, and event and an action
// Returns nothing.
function openForm(evt, action) {
  // Declare variables.
  let i, tabContent, tabLinks;

  // Get All elements that have the classname of tabcontent.
  tabContent = document.getElementsByClassName('tabcontent');
  for(i = 0; i < tabContent.length; i++) {
    // Set display to none for all elements(with tabcontent).
    tabContent[i].style.display = 'none';
  }
  // Get All elements with the class name of tablinks and remove the class of active.
  tabLinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tabLinks.length; i++ ) {
    tabLinks[i].className = tabLinks[i].className.replace("active", "");
  }

  // Show the current tab, and add the active class to the button that opened the tab.
  document.getElementById(action).style.display = "block";
  evt.currentTarget.className += " active";
} 
// End of openForm()
// Open a tab by default.
document.getElementById('defaultOpen').click();

// Footer - get date and inject it into the footer:
// Get the span to inject the date into.
const dateSpan = document.getElementById("date");
// Get the current date.
const theDate = new Date();
// Add in the date to the DOM.
dateSpan.textContent = theDate.getFullYear();

// End of app.js