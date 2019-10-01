import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ClientModel} from "../Clients/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService{

  private clientsUrl= 'http://localhost:8080/v1/client';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}

  /** Get Clients from server*/
  getClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(this.clientsUrl).pipe(
      tap(),
      catchError(this.handleError<ClientModel[]>('getClients', []))
    );
  }

  addClient(client: ClientModel): Observable<ClientModel>{
    return this.http.post<ClientModel>(this.clientsUrl, client, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<ClientModel>('addClient'))
    );
  }

  deleteClient(id : number): Observable<ClientModel>{
    return this.http.delete<ClientModel>(this.clientsUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<ClientModel>('deleteClient'))
    );
  }

  getClient(id: number): Observable<ClientModel>{
    return this.http.get<ClientModel>(this.clientsUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<ClientModel>('getById'))
    )
  }

  updateClient(id: number, client: ClientModel): Observable<ClientModel> {
    return this.http.put<ClientModel>(this.clientsUrl+'/'+id, client, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<ClientModel>('updateClient'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
