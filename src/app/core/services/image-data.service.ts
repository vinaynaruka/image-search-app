import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BASE_URL } from '../constants/service-endpoints';
import { ImageSearchResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  imageData: any;
  constructor(private http: HttpClient) {}

  getImageData(page = 1, query = `office`): Observable<ImageSearchResponse> {
    const url = `${BASE_URL}?page=${page}&query=${query}`;
    return this.http.get<ImageSearchResponse>(url).pipe(
      tap(data => this.imageData = data),
      catchError((err) => throwError(err))
    );
  }
}
