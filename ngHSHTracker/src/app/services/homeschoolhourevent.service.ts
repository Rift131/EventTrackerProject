import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeschoolhoureventService {
  private baseUrl = 'http://localhost:8083/'; // adjust port to match server
  private url = this.baseUrl + 'api/edEvents'; // change 'todos' to your API path

  constructor(private http: HttpClient) {}
}
