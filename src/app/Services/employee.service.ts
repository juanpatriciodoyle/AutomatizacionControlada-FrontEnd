import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, ObservedValueOf, of} from 'rxjs';
import {Employee} from '../Employees/employee';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  private employeesUrl= 'http://localhost:8080/v1/employee'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}

  /** Get Employees from server*/
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      tap(),
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }

  addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  deleteEmployee(id : number): Observable<Employee>{
    return this.http.delete<Employee>(this.employeesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  getEmployee(id: number): Observable<Employee>{
    return this.http.get<Employee>(this.employeesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Employee>('getById'))
    )
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.employeesUrl+'/'+id, employee, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Employee>('updateEmployee'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
