# Homeschool Hours Tracker
<p align="center"><img src="media/headerImage.png" width="550"></p>

## Author

<p align="left"><img src="media/kenProfT.png" width="105"> Ken Pederson (Developer, Repo Owner, Database Administrator) </p>

## Overview

For my SkillDistillery event-tracker project, I have built the backend of an application named Homeschool Hours Tracker. Full credit for the idea of this application goes to my wonderful wife who has homeschooled our boys from the very beginning after her 7-year career as a high school science teacher. The intent of this application is to solve the problem of Missouri's requirement for fellow parents who homeschool their children, to log...
* Hours invested across core and elective subjects
* The location of where the education was conducted

In the state of Missouri, once a child is the age of 7 as of 1 July, the tracking of hours is required. Parents must log...
* A minimum of 400 hours teaching the core subjects at the "regular homeschool location" (math, science, social studies, language arts, and reading)
* A minimum of 600 hours total must be recorded teaching the core subjects (non-core subjects are categorized as electives)
* A minimum of 1,000 hours must be recorded in total
per year (homeschool years begin 1 July and run through 30 June)

<p align="center"><img src="https://media.giphy.com/media/Qb6YqpuuPP4SlIdyK7/giphy.gif"/></p>

This application will provide our family and fellow Missouri parents with a solution that satisfies the Missouri hour record-keeping requirements. Any audit homeschooling parents may undergo will be easily managed through this one-stop solution. However, things change! While these requirements are not forecasted to evolve as of this writing (September of 2022), it is important to maintain situational awareness... 

> RECOMMENDED: Visit  www.hslda.org for potential requirement changes at least once each year, before beginning a new year of teaching.
> RECOMMENDED: Visit https://fhe-mo.org/ to stay informed of proposed legislative changes affecting homeshool freedom.


## Take The Homeschool Hours Tracker For A Test Drive!

If you would like to visit the Education Event tracker site, please feel free to use the link below! Reference the table within the "Testing With Postman" section below for example URI's you can use to interact with the applications backend functionality. If you have any questions or would like to discuss this project, please don't hesitate to email me at ken@kendev131.com. 

<p align="center"><a href="http://3.21.142.131:8080/HSHTracker">Click Here to Visit Homeschool Hours Tracker Project Site</a></>

## Description

The first iteration of this application is an extremely simplified approach of using only one table in the database. Multiple other tables, though not initially implemented, were created to enable greater functionality at a later time.

In this first version, the backend has been created using REST and thoroughly tested using Postman to ensure URL's invoke the desired results. THe frontend has been built, initially, with vanilla Javascript to link the backend with the frontend. 

## Methodology

One pillar at a time.

What I enjoyed most about the backend-building stage the application is the very straight forward approach of building the backend from "the ground up". Each functionality "pillar" began with the Repository (where applicable), then the Service layer, the Service Implementation layer, next the Controller and finally using Postman to prove functionality. No other functionality was started until the current capability proved successful. This approach kept each stage of functionality development clear and distinct from the others, thereby preventing getting "lost in the sauce" and ensuring troubleshooting was straight forward.

The frontend required a disciplined approach of organization. The vanilla JavaScript file used for the DOM was divided into sections based on initialization and CRUD to ensure easier navigation. My desire would be to break up these functions across several JavaScript files but givent the short amount of time to develop this stage of the project, everything was kept in one place for simplicity. Angular is the final stage of this projects development and I look forward to what it will present for options that reduce the robustness of the vanill JavaScript code.

## Testing the Backend With Postman

<p align="center"><img src="media/postman.png" width="450"></p>

To test the backend of the application, a user may visit the <a href="https://www.postman.com/">Postman</a> site. Once set up, reference the table below for URI's testing the validity of the code once you've started up the program in the SpringToolSuite4 Boot Dashboard.

> For testing a non-deployed, local version of the application, each URI is preceded with "http://localhost:8083"
> Testing in a deployed environment, the prefix to the URI is "http://3.21.142.131:8080/HSHTracker"

| HTTP Verb | URI                  | Request Body | Response Body    | Functionality                                              |
|:---------:|:---------------------|:------------:|:-----------------|:--------------------------------------------------------------------------|
| GET       | '/api/edEvents'      |              |  List of events  | Return a list of all education events                                      |
| GET       | '/api/edEvents/4'    |              |  Single event    | Return an education event by Id                                            |
| GET       | '/api/edEventsSubject/Math'         |                  |  List of events  | Return a list of education events by subject                               |
| GET       | '/api/edEventsLocation/home'|       |  List of events  | Return a list of education events by location                              |
| GET       | '/api/edEventsStudent/Billy'|       |  List of events  | Return a list of education events by student name                          |
| GET       | '/api/edEventsNotes/search/on'|     |  List of events  | Return a list of education events searching by keyword in the notes field  |
| GET       | '/api/edEventsLocSubStuOrNot/search/science'|              |  List of events  | Return a list of education events searching by keyword in the location, subject, student or notes field |
| GET       | '/api/edEvtsBtwnDts/search/date/2022-09-02T01:00:00/2022-09-04T01:00:00'|              |  List of events  | Return a list of education events occurring between submitted dates        |
| POST      | '/api/newEdEvent'     | JSON         |  Created event   | Adds a new EducationEvent (see example code for a new event below)         |
| PUT       | '/api/updateEdEvent/2'| JSON         |  Updated event   | Modifies an existing EducationEvent (6 events exist in the database)       |
| DEL       | '/api/deleteEdEvent/7'|              |                  | Deletes an EducationEvent. Assumes you have created 1 new EducationEvent   |


* Example code to use for POST routes below. Note that the date and subject may be omitted due to default values being set in the service file.

> {
    "date" : "2022-09-04T12:59:11.332",
    "duration" : 15,
    "subject" : "Language Arts",
    "location" : "Home",
    "student" : "Sally",
    "notes" : "Test adding event, all fields included."
}

* Example code to use for PUT URI can utilize any variation of the code above. The example URI in the table is set to 2 but may be changed to 3 through 6 or any events added with the POST route. Please do not modify EducationEvent 1 due to all JUnit tests being written for its original data.

* Example URL to test searching for events between two dates in Postman below.

> http://3.21.142.131:8080/HSHTracker/api/edEvtsBtwnDts/search/date/2022-09-02T01:00:00/2022-09-04T01:00:00

## Lessons Learned

This project proved vital in gaining the following experience...
* How the Controllers mapping annotation directly links with what appears in the URL
* The strict syntax requirements of the methods listed in the Repository for successful SQL queries (specific references to fields of an entity and exact wording for "finding" what you're looking for)
* The inability to write in certain methods in the Repository (such as findAll, findById, adding new instances of an event, etc.). These examples all cause the application to break, leading to a quick realization of the appropriate types of methods that belong in the Repository.
* The requirement for Controllers to use wrapper classes in order to function
* The use of the @CreationTimestamp greatly simplifies the use of LocalDateTime fields
* The use of Postman for testing code and correlating the direct relationship of the URL to the methods as well as further verification of changes through writing SQL queries to the database in the zsh Terminal.
* The creation of HTML elements through the DOM was especially insightful for ensuring the page only presents data when it's asked for


## Technologies 

* AWS- EC2
* Bootstrap
* Git
* GitHub
* Gradle
* Java 
* JavaScript (DOM)
* MySQL Workbench
* Postman
* RESTful Services
* SpringToolSuite4
* Spring Data JPA
* Spring Boot
* Spring MVC
* Terminal -zsh

## Stretch/Future Goals

<p align="center"><img src="media/dbSchema.png" width="450"></p>

After a minimum viable product is produced, the intent for this application is to incorporate the remaining tables of the database as seen above. At this time, only the "education_event" table is utilized. It is my intent to also use this first concept, once fully functional, to inspire new ideas beyond what I've already imagined. Current stretch goals include...
* Google Maps through the address table for parents to be able to remember a site should they choose to later revisit and share the location with fellow homeschool families.
* Create a login functionality 
* Allow users to download an Excel or Numbers version of their data as a backup or for audit purposes
* Create charts and graphs that show progress over time through each grade year
* Allow for tracking of resources used to teach different subjects across each grade
* Use the application as a centerpiece for a homeschool forum
* The final HTML file should be extremely limited with only the options to view the different data presented. Once viewed, each resulting data field should be closable to ensure minimal clutter.

After careful consideration of all the desired functionality with my wife has been made, work will begin on a separate branch while retaining the original work. 

## A Few Screen Shots Of Code Taken During The Backend Creation Journey

* Code excerpt for adding a new Education Event in the database. Extra code was written to ensure default values for the subject being recorded and the date when the event occurred. By setting the subject to "Not Declared" the intent is to raise awareness to the user so they will update then event with the correct subject. The date is set to "now" as this will most likely be the case if the user is recording updates in real time. Regardless, it serves as a starting point.

 <p align="center"><img src="media/codeAddEvent.png" width="350"></p>
 
* Code excerpt of how an event is updated. Every field is verified through if/else logic.

 <p align="center"><img src="media/codeUpdateEvent.png" width="350"></p>
 
* Code excerpt of how an event is deleted and ensuring a 404 code is returned when the event being referred to no longer exists.

 <p align="center"><img src="media/codeControllerDelete.png" width="350"></p>
 
* Example code excerpt showing the verboseness of using vanilla Javascript to tie the backend to the frontend. This excerpt uses the DOM to populate the HTML file with a pre-populated form for the user to perform updates to a record and continues past what you see here. 

 <p align="center"><img src="media/vanillaJSExample.png" width="350"></p>
