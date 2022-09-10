window.addEventListener('load', function(e) {
	console.log("SUCCESS: script.js loaded");
	init();
});

// *******************************INITIALIZATION FUNCTION***********************************
function init() {
	document.searchByNameForm.lookUpName.addEventListener('click', function(event) {
		event.preventDefault();
		let student = document.searchByNameForm.student.value;
		if(student) {
			console.log("SUCCESS: Button click to search by student name for: " + student);
			getEventsXHR(student);
		}
		});
}
// NEW FUNCTION
//function loadAllEvents() {
//	
//	let xhr = new XMLHttpRequest();
//	xhr.open("GET", "api/edEvents");
//	xhr.onreadystatechange = function() {
//		if(xhr.readyState === 4) {
//			if(xhr.status === 200) {
//				displayEventsXHR(JSON.parse(xhr.responseText));
//			} else {
//				console.error("Error loading events: " + xhr.status);
//			}
//		}
//	};
//	xhr.send();
//}
// ************************************CRUD FUNCTIONS****************************************

// CRUD: CREATE FUNCTION

function createEventForm(createEvent) {
	
}

// CRUD: RETRIEVE FUNCTIONS


// XHR GET
// The parameter to the function MATTERS, it must match the Div Id
function getEventsXHR(student) {
	console.log("IN DISPLAY EVENTS XHR");
	console.log("ARGUMENT SENT TO displayEventsXHR: " + student);
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/edEventsStudent/${student}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				let studentJson = xhr.responseText;
				let studentEvents = JSON.parse(studentJson);
				console.log("INVOKING FUNCTION: displayStudentEventsDOM");
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
	
	// DOM Function to display the students list of ed events by student name
	function displayStudentEventsDOM(studentEvents) {
		console.log("FUNCTION INVOKED: displayStudentEventsDOM");
		let eventsByNameDiv = document.getElementById('eventsByName');
		eventsByNameDiv.textContent = '';
	// Setup of the unordered list with a header of the students name
	if(studentEvents.length > 0) {
		let ul = document.createElement('ul');
		let h3 = document.createElement('h3');
		h3.textContent = "All recorded events for " + studentEvents[0].student; 
		eventsByNameDiv.appendChild(h3);
		eventsByNameDiv.appendChild(ul);
		// Iterate over the events and append them to the UL after putting each field into an li
		for(let event of studentEvents) {
			let li = document.createElement('li');
			li.textContent = event.subject + ' ' + event.date + ' ' + event.duration + ' minutes,  ' + event.location + ' ' + event.notes;
			ul.appendChild(li);
		}
	}
}



 // CRUD: UPDATE FUNCTION
 
 // CRUD: DELETE FUNCTION