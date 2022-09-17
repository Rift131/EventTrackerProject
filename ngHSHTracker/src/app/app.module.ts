import { EdEventService } from './services/ed-event.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// This import must be manually typed in, no auto-comlpete
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { EdEventListComponent } from './components/ed-event-list/ed-event-list.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, EdEventListComponent, AboutComponent, NavigationComponent, NotFoundComponent],
  // FormsModule allows for the use of databinding in the HTML forms (bannana in a box, [(ngForm)]). HttpClientModule allows for the link between the front end and the backend (Service to Controller).
  // The imports houses things that allready exist
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  // Providers is where we capture things we've built or have been created.   After the service is created, its name must be placed inside the providers array.
  providers: [EdEventService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
