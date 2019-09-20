import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {EmployeeModel} from "../Employees/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  private employeesUrl= 'http://localhost:8080/v1/employee';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}

  /** Get Employees from server*/
  getEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.employeesUrl).pipe(
      tap(),
      catchError(this.handleError<EmployeeModel[]>('getEmployees', []))
    );
  }

  addEmployee(employee: EmployeeModel): Observable<EmployeeModel>{
    return this.http.post<EmployeeModel>(this.employeesUrl, employee, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<EmployeeModel>('addEmployee'))
    );
  }

  deleteEmployee(id : number): Observable<EmployeeModel>{
    return this.http.delete<EmployeeModel>(this.employeesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<EmployeeModel>('deleteEmployee'))
    );
  }

  getEmployee(id: number): Observable<EmployeeModel>{
    return this.http.get<EmployeeModel>(this.employeesUrl+'/'+id, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<EmployeeModel>('getById'))
    )
  }

  updateEmployee(id: number, employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(this.employeesUrl+'/'+id, employee, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<EmployeeModel>('updateEmployee'))
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
