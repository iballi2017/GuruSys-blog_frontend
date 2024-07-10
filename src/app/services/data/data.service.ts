import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { UnathorizedError } from '../../common/unauthorized-error';
import { NotFoundError } from '../../common/not-found-error';
import { BadInputError } from '../../common/bad-input-error';
import { AppError } from '../../common/app-error';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  create(payload: any, urlParam: string = '') {
    return this.http
      .post(`${this.url}/${urlParam}`, payload, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  getAll(urlParam: string = '') {
    return this.http
      .get(`${this.url}/${urlParam}`, { withCredentials: true })
      .pipe(
        map((response: any) => {
          const result: any[] = response.result;
          return result.map((res) => {
            const data = {
              ...res,
              id: res._id,
            };
            return data;
          });
        }),
        catchError(this.handleError)
      );
  }

  getData(urlParam: string = '') {
    return this.http
      .get(`${this.url}/${urlParam}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  getDataById(id: string) {
    return this.http.get(`${this.url}/${id}`).pipe(
      map((response: any) => {
        return response && response.result;
      }),
      catchError(this.handleError)
    );
  }

  update(id: string, payload: any) {
    return this.http
      .put(`${this.url}/${id}`, payload, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  delete(id: string) {
    return this.http
      .delete(`${this.url}/${id}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  getExtApi(urlParam: string = '') {
    return this.http
      .get(`${this.url}/${urlParam}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 401) return throwError(() => new UnathorizedError());
    if (error.status === 404) return throwError(() => new NotFoundError());
    if (error.status === 400) return throwError(() => new BadInputError());
    return throwError(() => new AppError(error));
  }
}
