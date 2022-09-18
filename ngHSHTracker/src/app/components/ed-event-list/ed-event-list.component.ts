import { DatePipe } from '@angular/common';
import { EdEvent } from './../../models/ed-event';
import { EdEventService } from './../../services/ed-event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ed-event-list',
  templateUrl: './ed-event-list.component.html',
  styleUrls: ['./ed-event-list.component.css'],
})
export class EdEventListComponent implements OnInit {
  // **********FIELDS AVAILABLE TO THE USER ON THE HTML DOCUMENT**********

  title: string = 'HomeSchool Hours Tracker';
  selected: EdEvent | null = null;
  newEdEvent: EdEvent = new EdEvent();
  editEdEvent: EdEvent | null = null;
  edEvents: EdEvent[] = [];
  allEdEvents: EdEvent[] = [];
  student: string = '';
  showListSwitch: boolean = false;
  showCreateNewEventSwitch: boolean = false;
  showConfirmCreateNewSwitch: boolean = false;
  showUpdateSwitch: boolean = false;
  showUpdatedConfirmSwitch: boolean = false;
  showDeletedConfirmSwitch: boolean = false;
  showDeleteConfirmedSwitch: boolean = false;
  // INJECT THE REQUIRED SERVICE OBJECTS INTO THE CONSTRUCTOR AS PRIVATE VARIABLES
  constructor(
    private edEventService: EdEventService,
    private dateAccomplished: DatePipe
  ) {}
  // ***********ALL FUNCTIONS FOR THE HTML DOCUMENT**********

  ngOnInit(): void {
    this.reload();
  }
  switchList() {
    if (this.showListSwitch) {
      this.showListSwitch = false;
    } else {
      this.showListSwitch = true;
    }
  }
  switchCreateNew() {
    if (this.showCreateNewEventSwitch) {
      this.showCreateNewEventSwitch = false;
    } else {
      this.showCreateNewEventSwitch = true;
    }
  }
  switchConfirmCreateNew() {
    if (this.showConfirmCreateNewSwitch) {
      this.showConfirmCreateNewSwitch = false;
    } else {
      this.showConfirmCreateNewSwitch = true;
    }
  }
  switchUpdate() {
    if (this.showUpdateSwitch) {
      this.showUpdateSwitch = false;
    } else {
      this.showUpdateSwitch = true;
    }
  }
  switchUpdateConfirm() {
    if (this.showUpdatedConfirmSwitch) {
      this.showUpdatedConfirmSwitch = false;
    } else {
      this.showUpdatedConfirmSwitch = true;
    }
  }
  switchDeleteLastChance() {
    if (this.showDeletedConfirmSwitch) {
      this.showDeletedConfirmSwitch = false;
    } else {
      this.showDeletedConfirmSwitch = true;
    }
  }
  switchDeleteConfirm() {
    if (this.showDeleteConfirmedSwitch) {
      this.showDeleteConfirmedSwitch = false;
    } else {
      this.showDeleteConfirmedSwitch = true;
    }
  }
  // Method for populating the todos variable with the required data for all other functions
  reload() {
    this.edEventService.index().subscribe({
      next: (data) => {
        this.allEdEvents = data;
      },
      error: (err) => {
        console.error('EdEventComponent.reload(): error loading EdEvents:');
        console.error(err);
      },
    });
  }

  // CRUD FUNCTIONALITY
  //**********CREATE**********/
  createEdEvent() {
    // validate complete data before invoking the create function on the backend

    this.edEventService.create(this.newEdEvent).subscribe({
      next: (data) => {
        if (this.showConfirmCreateNewSwitch) {
          this.newEdEvent = new EdEvent();
          this.reload();
        }
      },
      error: (err) => {
        console.error('TodoListComponent.create(): error creating todo:');
        console.error(err);
      },
    });
  }
  //**********RETRIEVE********
  displayEdEventsTableByStudentName() {
    this.edEventService.byName(this.student).subscribe({
      next: (data) => {
        this.edEvents = data;
        this.editEdEvent = null;
        this.reload();
      },
      error: (err) => {
        console.error(
          'EdEventListComponent.displayEdEventsTable(): error retrieving ed events by name:'
        );
        console.error(err);
      },
    });
  }

  displayEdEvent(edEvent: EdEvent) {
    this.selected = edEvent;
  }
  //**********UPDATE**********
  setEditEdEvent() {
    this.editEdEvent = Object.assign({}, this.selected);
  }

  updateEdEvent(updatedEdEvent: EdEvent) {
    this.edEventService.update(updatedEdEvent).subscribe({
      next: (data) => {
        this.selected = data;
        this.editEdEvent = null;
        this.reload();
      },
      error: (err) => {
        console.error(
          'EdEventListComponent.updateEdEvent(): error updating edEvent:'
        );
        console.error(err);
      },
    });
  }
  updateCompleted(updatedEdEvent: EdEvent) {
    this.edEventService.update(updatedEdEvent).subscribe({
      next: (data) => {
        this.reload();
      },
      error: (err) => {
        console.error(
          'EdEventListComponent.updateCompleted(): error completing the update for this edEvent:'
        );
        console.error(err);
      },
    });
  }
  //**********DELETE**********
  deleteTodo(id: number) {
    this.edEventService.destroy(id).subscribe({
      next: () => {
        this.reload();
      },
      error: (err) => {
        console.error(
          'EdEventComponent.deleteEdEvent(): error deleting edEvent:'
        );
        console.error(err);
      },
    });
  }
}
