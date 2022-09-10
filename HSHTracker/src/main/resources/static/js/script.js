window.addEventListener('load', function(e) {
	console.log("SUCCESS: script.js loaded");
	init();
});

// *******************************INITIALIZATION FUNCTIONS***********************************
function init() {
	document.searchByNameForm.lookUpName.addEventListener('click', function(event) {
		event.preventDefault();
		let student = document.searchByNameForm.student.value;
		if(student) {
			console.log("SUCCESS: Button click to search by student name for: " + student);
			getEventsXHR(student);
		}
		});
		
	document.addEdEventForm.addEdEvent.addEventListener('click', function(e) {
		e.preventDefault();
		console.log("Adding edEvent");
		let educationEvent = {};
		educationEvent.date = addEdEventForm.date.value;
		educationEvent.duration = addEdEventForm.duration.value;
		educationEvent.subject = addEdEventForm.subject.value;
		educationEvent.location = addEdEventForm.location.value;
		educationEvent.student = addEdEventForm.student.value;
		educationEvent.notes = addEdEventForm.notes.value;
		console.log("BEFORE CALLING CREATE FUNCTION");
		console.log(educationEvent);
		createEventForm(educationEvent);
});
// Last curly brace for initialization of forms and buttons
}
// NEW FUNCTION

// ************************************CRUD FUNCTIONS****************************************

// CRUD: CREATE FUNCTIONS
// function loadNewEvent() {
	
	//let xhr = new XMLHttpRequest();
	//xhr.open("GET", "api/edEvents");
	//xhr.onreadystatechange = function() {
		//if(xhr.readyState === 4) {
			//if(xhr.status === 200) {
				//displayEventsXHR(JSON.parse(xhr.responseText));
			//} else {
				//console.error("Error loading events: " + xhr.status);
			//}
		//}
	//};
	//xhr.send();
//}


function createEventForm(educationEvent) {
	console.log("CREATE EVENT FORM: " + educationEvent);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/newEdEvent');
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			console.log("XHR Code after first if statement: " + xhr.status);
		if(xhr.status === 201) {
			console.log("Ready to invoke display function.");
			// display the new record to the user in an unordered list NOTE: used educationEvent as argument to display
			displayNewStudentEventDOM(JSON.parse(xhr.responseText));
		} else if(xhr.status === 400) {
			displayError("Invalid data");
		} else {
			displayError("Error recording this event: " + xhr.status);
		}
	}
	}
	// convert to JSON and send new entry to the controller
	xhr.setRequestHeader("Content-type", "application/json");
	let edEventJson = JSON.stringify(educationEvent);
	console.log("SUCCESS: new edEvent sent to the controller");
	xhr.send(edEventJson);
}

// CRUD: RETRIEVE FUNCTIONS

//  FUNCTION TO DISPLAY 

function displayNewStudentEventDOM(educationEvent) {
	let dataDiv1 = document.getElementById("newEdEvent");
	dataDiv1.textContent = '';
	
	let student = document.createElement('h1');
	student.textContent = `Your update for ${educationEvent.student} has been recorded!`;
	dataDiv1.appendChild(student);
	
	let ul = document.createElement('ul');
	
	let subject = document.createElement('li');
	subject.textContent = "Subject: " + educationEvent.subject;
	ul.appendChild(subject);

	let date = document.createElement('li');
	date.textContent = "Date: " + educationEvent.date;
	ul.appendChild(date);
	
	let duration = document.createElement('li');
	duration.textContent = "Duration (minutes): " + educationEvent.duration;
	ul.appendChild(duration);

	let location = document.createElement('li');
	location.textContent = "Location: " + educationEvent.location;
	ul.appendChild(location);

	let notes = document.createElement('blockquote');
	notes.textContent = "Notes: " + educationEvent.notes;
	ul.appendChild(notes);
	
	dataDiv1.appendChild(ul);
	
	document.body.appendChild(ul);
}


// XHR GET
// The parameter to the function MATTERS, it must match the Div Id
function getEventsXHR(student) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/edEventsStudent/${student}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 201) {
				let studentJson = xhr.responseText;
				let studentEvents = JSON.parse(studentJson);
				displayStudentEventsDOM(studentEvents);
			} else if (xhr.status === 404) {
				displayError("A student by that name was not found");
			} else {
				displayError("There was a problem with the request: " + xhr.status);
			}
		};	
	};
	xhr.send();
	}
// DISPLAY ERROR FUNCTIONS
function displayError(msg) {
	let dataDiv = document.getElementById('eventsByName');
	dataDiv.textContent = '';
	dataDiv.textContent = msg;
}
	
// DOM Function to display the students list of ed events by student name
function displayStudentEventsDOM(studentEvents) {
	console.log("FUNCTION INVOKED: displayStudentEventsDOM");
	let eventsByNameDiv = document.getElementById('eventsByName');
	eventsByNameDiv.textContent = '';
	// Setup of the unordered list with a header of the students name
	if(studentEvents.length > 0) {
		// LIST CODE
			//let ul = document.createElement('ul');
			//let h3 = document.createElement('h3');
			//h3.textContent = "All recorded events for " + studentEvents[0].student; 
			//eventsByNameDiv.appendChild(h3);
			//eventsByNameDiv.appendChild(ul);
			// Iterate over the events and append them to the UL after putting each field into an li
				//for(let event of studentEvents) {
					// let li = document.createElement('li');
					// li.textContent = event.subject + ' ' + event.date + ' ' + event.duration + ' minutes,  ' + event.location + ' ' + event.notes;
					// ul.appendChild(li);
		// TABLE CODE
		let table = document.createElement('table');
		createTableHead(table, studentEvents);
		createTableBody(table, studentEvents);
		eventsByNameDiv.appendChild(table);	
		}
		
	}


// FUNCTION FOR THE TABLE HEAD
let createTableHead = function(table, studentEvents) {
  let thead = document.createElement('thead');
  let trow = document.createElement('tr');
  for (property in studentEvents[0]) {
	if(property !== 'student') {
    let th = document.createElement('th');
    th.textContent = property.toUpperCase();
    trow.appendChild(th);
    }
  }
  thead.appendChild(trow);
  table.appendChild(thead);
}

// FUNCTION FOR TABLE BODY
let createTableBody = function(table, studentEvents) {
  let tbody = document.createElement('tbody');
  // iterate to fill out each row
  studentEvents.forEach(function(studentEvents) {
	// Establish a row to populate for the current iteration
    let row = document.createElement('tr');
    
    // Assign the id to a column for current row
    let id = document.createElement('td');
    id.textContent = studentEvents.id;
    row.appendChild(id);
    
    // Assign the date to a column for current row
    let date = document.createElement('td');
    date.textContent = studentEvents.date;
    row.appendChild(date);


    // Assign the Duration to a column for current row
    let duration = document.createElement('td');
    duration.textContent = studentEvents.duration + " mins";
    row.appendChild(duration);
   
    // Assign the Subject to a column for current row
    let subject = document.createElement('td');
    subject.textContent = studentEvents.subject;
    row.appendChild(subject);

    // Assign the Location to a column for current row
    let location = document.createElement('td');
    location.textContent = studentEvents.location;
    row.appendChild(location);
    
    // Assign the Notes to a column for current row
    let notes = document.createElement('td');
    notes.textContent = studentEvents.notes;
    row.appendChild(notes);
    
    //Append the completed loop before next iteration of the next row
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
}
 // CRUD: UPDATE FUNCTION
 
 // CRUD: DELETE FUNCTION