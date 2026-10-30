import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = ((window as any).__APP_CONFIG__?.apiUrl as string)
    ?? window.location.origin;

  baseURL = `${this.apiUrl}/user`;

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/all');
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.baseURL + '/delete/' + id);
  }

  addUser(firstname: string, lastname: string): Observable<any> {
    const body = { firstName: firstname, lastName: lastname };
    return this.httpClient.post(this.baseURL + '/add', body);
  }
}
