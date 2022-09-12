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
		// Ensure Minimum Inputs
		let minDataCk =  verifyMinData(educationEvent.duration, educationEvent.location, educationEvent.student);
		if(minDataCk.length === 0) {
			createEventForm(educationEvent);
			clearErrors();
			clearForm();
		} else {
			
			let dataDiv = document.getElementById('missingEntries');
			dataDiv.className = "alert";
			
			let errMessage = document.createElement('h3');
			errMessage.style.color = 'red';
			errMessage.textContent = minDataCk;
			dataDiv.appendChild(errMessage);
			
			let reqStudent = document.getElementById('student');
			if(reqStudent.value === '') {
				reqStudent.style.border="3px solid red";
			} else if (reqStudent.value !== '') {
			reqStudent.style.border="1px solid black";
			} 
			
			let reqDuration = document.getElementById('duration');
			if(reqDuration.value === '') {
				reqDuration.style.border="3px solid red";
			} else if(reqDuration.value !== '') {
			reqDuration.style.border="1px solid black";
			}
			
			let reqLocation = document.getElementById('location');
			if(reqLocation.value === '') {
				reqLocation.style.border="3px solid red";
			} else if (reqLocation.value !== '') {
			reqLocation.style.border="1px solid black";
			}
			
		}
	});
}
// NEW FUNCTION

// ************************************CRUD FUNCTIONS****************************************

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
			console.log("XHR.RESPONSETEXT: " + xhr.responseText);
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

function updateEventForm(edEvent) {
	console.log("UPDATE EVENT FORM: " + edEvent);
	let id = edEvent.id;
	let xhr = new XMLHttpRequest();
	xhr.open(`PUT`, `api/updateEdEvent/${id}`);
	console.log("ON READYSTATECHANGE CK: " + xhr.onreadystatechange);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			console.log(xhr.status);
		if(xhr.status === 204) {
			// const responseJSON = (JSON.parse(xhr.responseText));
			// debugger;
			// displayUpdatedRecord();
			let updateG2G = "The record has been updated!";
			alert(updateG2G);
		} else if(xhr.status === 400) {
			displayError("Invalid data");
		} else {
			displayError("Error recording this event: " + xhr.status);
		}
		}
	}
	// convert to JSON and send new entry to the controller
	xhr.setRequestHeader("Content-type", "application/json");
	let edEventUpdateJson = JSON.stringify(edEvent);
	console.log("SUCCESS: Updated edEvent sent to the controller");
	xhr.send(edEventUpdateJson);
}

function getEducationEventByRow(id) {
	console.log("EVENT ROW OBJECT: " + id);
	let xhr = new XMLHttpRequest();
	let edEvent = xhr.open('GET', `api/edEvents/${id}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			console.log("XHR FOR EVENT BY ID: " + xhr.status);
		if(xhr.status === 200) {
			console.log("XHR GET EVENT BY ID STATUS CODE 200 G2G.");
			// display the new record to the user in an unordered list NOTE: used educationEvent as argument to display
			displayEdEventToEdit(JSON.parse(xhr.responseText));
		} else if(xhr.status === 400) {
			displayError("Invalid data" + xhr.status);
		} else {
			displayError("Error recording this event: " + xhr.status);
		}
	}
	}
	// convert to JSON and send new entry to the controller
	xhr.setRequestHeader("Content-type", "application/json");
	let singleEdEventJson = JSON.stringify(edEvent);
	xhr.send(singleEdEventJson);
}

// CRUD: RETRIEVE FUNCTIONS

//  FUNCTION TO DISPLAY NEWLY CREATED EDUCATION EVENT

function displayNewStudentEventDOM(educationEvent) {
	let dataDiv1 = document.getElementById("newEdEvent");
	dataDiv1.textContent = '';
	
	let student = document.createElement('h3');
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

// DOM Function to display the students list of ed events by student name
function displayStudentEventsDOM(studentEvents) {
	console.log("FUNCTION INVOKED: displayStudentEventsDOM");
	let eventsByNameDiv = document.getElementById('eventsByName');
	eventsByNameDiv.textContent = '';
	// Setup of the unordered list with a header of the students name
	if(studentEvents.length > 0) {
		
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
    let byId = studentEvents.id;
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
    
    // Assign a button with an event listener to edit an entry, tied to an update function
    let editBtn = document.createElement('button');
   		editBtn.type='submit';
    		editBtn.name='edit';
    		editBtn.innerHTML = 'Edit';
    		editBtn.onclick = function(event){
		event.preventDefault();
		
    		// Send the object to update function
    		updateEdEvent(byId);
};
    row.appendChild(editBtn);
    //Append the completed loop before next iteration of the next row
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  //document.searchByNameForm.eventsByName.edit.addEventListener('click', updateEdEvent);
}

function displayEdEventToEdit(editEvent) {
	console.log("INSIDE DISPLAY EDEVENT TO EDIT: " + editEvent);
	let singleEventDiv = document.getElementById('editEvent');
	singleEventDiv.textContent = '';
	
	let br = document.createElement('br');
	let br1 = document.createElement('br');
	let br2 = document.createElement('br');
	let br3 = document.createElement('br');
	let br4 = document.createElement('br');
	let br5 = document.createElement('br');
	let br6 = document.createElement('br');
	let br7 = document.createElement('br');
	let br8 = document.createElement('br');
	
	let form = document.createElement('form');
	form.name = "editEventForm";
	
	let header = document.createElement('h2');
	header.textContent = "Edit this Record";
	
	singleEventDiv.appendChild(header);
	
	singleEventDiv.appendChild(form);
	
	// FORM WITH PREPOPULATED FIELDS
	let studentNameLabel = document.createElement('label');
		studentNameLabel.for = "student";
		studentNameLabel.innerHTML = "Student Name ";
		form.appendChild(studentNameLabel);
	let studentNameInput = document.createElement('input');
		studentNameInput.type = 'text';
		studentNameInput.name = 'student';
		studentNameInput.id = 'student';
		studentNameInput.required = 'required';
		studentNameInput.value = editEvent.student;
		form.appendChild(studentNameInput);
	
		form.append(br1);
		
	let subjectLabel = document.createElement('label');
		subjectLabel.for = "subject";
		subjectLabel.innerHTML = "Subject ";
		form.appendChild(subjectLabel);
		// Find the option selected
	let subjectInput = document.createElement('select');
		subjectInput.name = 'subject';
		subjectInput.id = 'subjectMain';
		subjectInput.value = document.querySelector('subjectMain');
		form.appendChild(subjectInput);
		console.log("VALUE FROM DROP DOWN SUBJECT: " + subjectInput.value)
		
		form.append(br2);
	
		let subjectOptionElective = document.createElement('option');
			subjectOptionElective.innerHTML = "Elective";
			subjectInput.appendChild(subjectOptionElective);
		
		let subjectOptionLanguageArts = document.createElement('option');
			subjectOptionLanguageArts.innerHTML = "Language Arts";
			subjectInput.appendChild(subjectOptionLanguageArts);
		
		let subjectOptionMath = document.createElement('option');
			subjectOptionMath.innerHTML = "Math";
			subjectInput.appendChild(subjectOptionMath);
		
		let subjectOptionReading = document.createElement('option');
			subjectOptionReading.innerHTML = "Reading";
			subjectInput.appendChild(subjectOptionReading);
		
		let subjectOptionScience = document.createElement('option');
			subjectOptionScience.innerHTML = "Science";
			subjectInput.appendChild(subjectOptionScience);
		
		let subjectOptionSocialStudies = document.createElement('option');
			subjectOptionSocialStudies.innerHTML = "Social Studies";
			subjectInput.appendChild(subjectOptionSocialStudies);
		
			
	let dateLabel = document.createElement('label');
		dateLabel.for = "date";
		dateLabel.innerHTML = "Date ";
		form.appendChild(dateLabel);
	let dateInput = document.createElement('input');
		dateInput.name = 'date';
		dateInput.type = 'datetime-local';
		dateInput.value = editEvent.date;
		form.appendChild(dateInput);
		
		form.append(br3);
			
	let durationLabel = document.createElement('label');
		durationLabel.for = "duration";
		durationLabel.innerHTML = "Duration (minutes) ";
		singleEventDiv.appendChild(durationLabel);
		form.appendChild(durationLabel);
	let durationInput = document.createElement('input');
		durationInput.name = 'duration';
		durationInput.type = 'number';
		durationInput.value = editEvent.duration;
		form.appendChild(durationInput);
		
		form.append(br4);
			
	let locationLabel = document.createElement('label');
		locationLabel.for = "location";
		locationLabel.innerHTML = "Location ";
		form.appendChild(locationLabel);
	let locationInput = document.createElement('input');
		locationInput.name = 'location';
		locationInput.type = 'text';
		locationInput.value = editEvent.location;
		form.appendChild(locationInput);
		
		form.append(br5);
			
	let notesLabel = document.createElement('label');
		notesLabel.for = "notes";
		notesLabel.innerHTML = "Notes ";
		form.appendChild(notesLabel);
	let notesInput = document.createElement('textArea');
		notesInput.id = 'notes';
		notesInput.rows = '4';
		notesInput.cols = '40';
		notesInput.name = 'notes';
		notesInput.value = editEvent.notes;
		form.appendChild(notesInput);
		
		form.append(br6);
		form.append(br7);
		
	let saveBtn = document.createElement('button');
   		saveBtn.type='submit';
    		saveBtn.name='save';
    		saveBtn.innerHTML = 'Save Changes';
    		saveBtn.onclick = function(event){
		event.preventDefault();
		// Verify Any Errors (duration, location, student) and route to function for check
		let minDataCk =  verifyMinData(durationInput.value, locationInput.value, studentNameInput.value);
		console.log("UPDATE FORM ERROR STRING: " + minDataCk);
		// variable representing the updated object
	
		editEvent.student = studentNameInput.value;
		editEvent.subject = subjectInput.value;
		editEvent.date = dateInput.value;
		editEvent.duration = durationInput.value;
		editEvent.location = locationInput.value;
		editEvent.notes = notesInput.value;
    		// Send the updated object to an XHR function for the server to receive the data
    		updateEventForm(editEvent);
};
		form.appendChild(saveBtn);
		
		let deleteBtn = document.createElement('button');
   		deleteBtn.class='delete';
    		deleteBtn.name='deleteEdEvent';
    		deleteBtn.innerHTML = 'Delete';
    		deleteBtn.onclick = function(event){
		event.preventDefault();
		if(confirm(`Delete this eudcation record for ${studentNameInput.value}?`)) {
			deleteEvent(editEvent);
		}
		
		};
		form.append(deleteBtn);
		form.append(br8);
}
function displayUpdatedRecord(jsonText) {
	console.log("INSIDE DISPLAYUDATEDRECORD FUNCTION" + jsonText);
}
 // CRUD: UPDATE FUNCTION
 function updateEdEvent(id) {
	console.log("Edit button clicked and function invoked.");
	// Call on an XHR function to route for a display result that populates a div, making a new form appear
	getEducationEventByRow(id);
	 
		// append a 'save' button that records the event
		
		// make a bulleted list appear of the event with the new changes
		
		// clean out the form
		 
	
}
 // CRUD: DELETE FUNCTION
 function deleteEvent(deleteEd) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/deleteEdEvent/${deleteEd.id}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			console.log("DELETE XHR Code after first if statement: " + xhr.status);
		if(xhr.status === 204 || 200) {
			// display the new record to the user in an unordered list NOTE: used educationEvent as argument to display
			alert("The record has been deleted.");
		} else if(xhr.status === 404) {
			displayError("ERROR: Event not found.");
		} else {
			displayError("Error recording this event: " + xhr.status);
		}
		}
	}
	// convert to JSON and send new entry to the controller
	xhr.setRequestHeader("Content-type", "application/json");
	let edEventDelJson = JSON.stringify(deleteEd);
	console.log("SUCCESS: new edEvent sent to the controller");
	xhr.send(edEventDelJson);
}
 
// *******************************MESSAGES, ERRORS AND CLEANUP FUNCTIONS********************************************
function displayError(msg) {
	let dataDiv = document.getElementById('eventsByName');
	dataDiv.textContent = '';
	dataDiv.textContent = msg;
}

function displayErrorNewEvent(msg) {
	let dataDiv = document.getElementById('newEdEvent');
	dataDiv.textContent = '';
	dataDiv.textContent = msg;
}

let verifyMinData = function(duration, location, student) {
	let errors = [];
	 if(!duration > 0 || location === '' || student === '') {
		errors.push("The student name, duration and location fields cannot be blank. Duration must be greater than 0.")
	}
	return errors;
}	

function clearErrors() {
	let errors = document.getElementById("missingEntries");
	while (errors.firstElementChild) {
		errors.removeChild(errors.firstElementChild);
	}
	console.log("Errors removed");
}

function clearForm() {
	
	
	let reqStudent = document.getElementById('student');
	if(reqStudent.value !== '') {
		reqStudent.style.border="1px solid black";
		}

	let reqDuration = document.getElementById('duration');
	if(reqDuration.value !== '') {
		reqDuration.style.border="1px solid black";
		}
		
	let reqLocation = document.getElementById('location');
	if(reqLocation.value !== '') {
		reqLocation.style.border="1px solid black";
		}
	let cleanName = document.getElementById('student');
	cleanName.value = '';
	
	let cleanDuration = document.getElementById('duration');
	cleanDuration.value = '';
	
	let cleanLocation = document.getElementById('location');
	cleanLocation.value = '';
	
	let cleanNotes = document.getElementById('notes');
	cleanNotes.value = '';
}

