import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TechnicalService} from "../TechnicalServices/technicalService.model";
import {ClientModel} from "../Clients/client.model";

@Injectable({
  providedIn: 'root'
})
export class TechnicalServiceService{

  private technicalServicesUrl= 'http://localhost:8080/v1/technicalService';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}

  /** Get TechnicalServices from server*/
  getTechnicalServices(): Observable<TechnicalService[]> {
    return this.http.get<TechnicalService[]>(this.technicalServicesUrl).pipe(
      tap(),
      catchError(this.handleError<TechnicalService[]>('getTechnicalService', []))
    );
  }

  /** Get Deleted TechnicalServices from server*/
  getTechnicalServicesDeleted(): Observable<TechnicalService[]> {
    return this.http.get<TechnicalService[]>(this.technicalServicesUrl+'/Deleted').pipe(
      tap(),
      catchError(this.handleError<TechnicalService[]>('getTechnicalService', []))
    );
  }

  getTechnicalServicesMarkAsDone(): Observable<TechnicalService[]> {
    return this.http.get<TechnicalService[]>(this.technicalServicesUrl+'/MarkAsDone').pipe(
      tap(),
      catchError(this.handleError<TechnicalService[]>('getTechnicalService', []))
    );
  }


  addTechnicalService(technicalService: TechnicalService): Observable<TechnicalService>{
    return this.http.post<TechnicalService>(this.technicalServicesUrl, technicalService, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<TechnicalService>('addTechnicalService'))
    );
  }

  deleteTechnicalService(id : number): Observable<TechnicalService>{
    return this.http.delete<TechnicalService>(this.technicalServicesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<TechnicalService>('deleteTechnicalService'))
    );
  }

  getTechnicalService(id: number): Observable<TechnicalService>{
    return this.http.get<TechnicalService>(this.technicalServicesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<TechnicalService>('getById'))
    )
  }

  updateTechnicalService(id: number, technicalService: TechnicalService): Observable<TechnicalService> {
    return this.http.put<TechnicalService>(this.technicalServicesUrl+'/'+id, technicalService, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<TechnicalService>('updateTechnicalService'))
    )
  }

  markAsDoneTechnicalService(id: number): Observable<TechnicalService> {
    return this.http.put<TechnicalService>(this.technicalServicesUrl+'/MarkAsDone/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<TechnicalService>('markAsDoneTechnicalService'))
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
