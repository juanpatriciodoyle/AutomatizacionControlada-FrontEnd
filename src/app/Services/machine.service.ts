import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MachineModel} from "../Machines/machine.model";
import {ClientModel} from "../Clients/client.model";

@Injectable({
  providedIn: 'root'
})
export class MachineService{

  private machinesUrl= 'http://localhost:8080/v1/machine';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}

  /** Get Machines from server*/
  getMachines(): Observable<MachineModel[]> {
    return this.http.get<MachineModel[]>(this.machinesUrl).pipe(
      tap(),
      catchError(this.handleError<MachineModel[]>('getMachine', []))
    );
  }

  /** Get Deleted Machines from server*/
  getMachinesDeleted(): Observable<MachineModel[]> {
    return this.http.get<MachineModel[]>(this.machinesUrl+'/Deleted').pipe(
      tap(),
      catchError(this.handleError<MachineModel[]>('getMachine', []))
    );
  }

  getMachinesFree(): Observable<MachineModel[]> {
    return this.http.get<MachineModel[]>(this.machinesUrl+'/Free').pipe(
      tap(),
      catchError(this.handleError<MachineModel[]>('getMachine', []))
    );
  }

  getMachine(id: number): Observable<MachineModel>{
    return this.http.get<MachineModel>(this.machinesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<MachineModel>('getById'))
    )
  }

  getMachineByClientId(id: number): Observable<MachineModel[]>{
    return this.http.get<MachineModel[]>(this.machinesUrl+'/ByClient/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<MachineModel[]>('getByClientId'))
    )
  }

  addMachine(machine: MachineModel): Observable<MachineModel>{
    return this.http.post<MachineModel>(this.machinesUrl, machine, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<MachineModel>('addMachine'))
    );
  }

  deleteMachine(id : number): Observable<MachineModel>{
    return this.http.delete<MachineModel>(this.machinesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<MachineModel>('deleteMachine'))
    );
  }

  updateMachine(id: number, machine: MachineModel): Observable<MachineModel> {
    return this.http.put<MachineModel>(this.machinesUrl+'/'+id, machine, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<MachineModel>('updateMachine'))
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
