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

  // *******VARIABLE ASSIGNMENTS******
  ngOnInit(): void {
    this.reload();
  }

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
  reloadStudent() {
    this.edEventService.byName(this.student).subscribe({
      next: (data) => {
        this.edEvents = data;
      },
      error: (err) => {
        console.error('EdEventComponent.reload(): error loading EdEvents:');
        console.error(err);
      },
    });
  }

  selectedAssignToEdEvent(edEvent: EdEvent) {
    this.switchListOff();
    this.selected = edEvent;
    this.setEditEdEvent();
  }
  setEditEdEvent() {
    this.editEdEvent = Object.assign({}, this.selected);
  }
  editEdEventToNull() {
    this.editEdEvent = null;
    this.switchUpdateOff();
  }

  // CRUD FUNCTIONALITY
  //**********CREATE**********/
  createEdEvent() {
    // validate complete data before invoking the create function on the backend
    this.switchCreateNewOff();
    this.edEventService.create(this.newEdEvent).subscribe({
      next: (data) => {
        if (this.showConfirmCreateNewSwitch) {
          this.newEdEvent = new EdEvent();
          this.reload();
          this.reloadStudent();
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
    this.switchCreateNewOff();
    this.switchDeleteLastChanceOff();
    this.switchDeleteConfirmOff();
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

  //**********UPDATE**********

  updateEdEvent(updatedEdEvent: EdEvent) {
    this.switchUpdateOn();
    this.edEventService.update(updatedEdEvent).subscribe({
      next: (data) => {
        this.selected = data;
        this.editEdEvent = null;
        this.switchUpdateConfirmOn();
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

  //**********DELETE**********
  deleteEdEvent(id: number) {
    this.edEventService.destroy(id).subscribe({
      next: () => {
        this.switchDeleteLastChanceOff();
        this.editEdEventToNull();
        this.switchDeleteConfirmOn();
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
  // *******ON/OFF SWITCHES******
  switchListOn() {
    if (!this.showListSwitch) {
      this.reloadStudent();
      this.showListSwitch = true;
    }
  }
  switchListOff() {
    if (this.showListSwitch) {
      this.showListSwitch = false;
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
  switchCreateNewOff() {
    if (this.showConfirmCreateNewSwitch) {
      this.showConfirmCreateNewSwitch = false;
      this.showCreateNewEventSwitch = false;
    }
  }
  switchUpdateOn() {
    if (!this.showUpdateSwitch) {
      this.showUpdateSwitch = true;
    }
  }
  switchUpdateOff() {
    if (this.showUpdateSwitch) {
      this.switchUpdateConfirmOn();
      this.showUpdateSwitch = false;
    }
  }
  switchUpdateConfirmOn() {
    if (!this.showUpdatedConfirmSwitch) {
      this.showUpdatedConfirmSwitch = true;
    }
  }
  switchUpdateConfirmOff() {
    if (this.showUpdatedConfirmSwitch) {
      this.showUpdatedConfirmSwitch = false;
    }
  }
  switchDeleteLastChanceOn() {
    if (!this.showDeletedConfirmSwitch) {
      this.showDeletedConfirmSwitch = true;
    }
  }
  switchDeleteLastChanceOff() {
    if (this.showDeletedConfirmSwitch) {
      this.showDeletedConfirmSwitch = false;
    }
  }
  switchDeleteConfirmOn() {
    if (!this.showDeleteConfirmedSwitch) {
      this.showDeleteConfirmedSwitch = true;
    }
  }
  switchDeleteConfirmOff() {
    if (this.showDeleteConfirmedSwitch) {
      this.showDeleteConfirmedSwitch = false;
    }
  }
}
