import { EdEvent } from './../models/ed-event';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EdEventService {
  private baseUrl = 'http://localhost:8083/api'; // adjust port to match server
  private url = this.baseUrl + '/edEvents'; // change 'todos' to your API path

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  index() {
    return this.http.get<EdEvent[]>(this.baseUrl + '/edEvents').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'EdEventService.index():error retrieving EdEvent list: ' + err
            )
        );
      })
    );
  }

  create(edEvent: EdEvent) {
    return this.http.post<EdEvent>(this.baseUrl + '/newEdEvent', edEvent).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.create():error creating Todo: ' + err)
        );
      })
    );
  }

  update(edEvent: EdEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put<EdEvent>(this.baseUrl + '/updateEdEvent/' + edEvent.id, edEvent)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('TodoService.update():error updating Todo: ' + err)
          );
        })
      );
  }

  destroy(id: number) {
    return this.http.delete<void>(this.baseUrl + '/deleteEdEvent/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.destroy():error deleting Todo: ' + err)
        );
      })
    );
  }
}
