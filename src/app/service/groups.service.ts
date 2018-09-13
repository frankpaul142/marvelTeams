import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  headers: any;

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });

  }



}
