import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
