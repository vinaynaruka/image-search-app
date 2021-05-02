import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_KEY } from '../constants';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  /**
   * This method intercepts every http request and attaches the following header to the request.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('in interceptor');
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Authorization': `Client-ID ${ACCESS_KEY}`,
      },
    });
    return next.handle(request);
  }
}
