import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from "rxjs/operators";
import { Constants } from '../providers/constants';
@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  headers: any;
  keyParams: string;
  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });

  }

  getComicsByName(name: any) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(Constants.API_URL + '/comics?format=comic&limit=10&titleStartsWith=' + name + Constants.KEY_PARAM, options).pipe(
      map((response: Response) => response.json()));
  }



  getCharactersByComicId(comicId: any) {
    let options = new RequestOptions({ headers: this.headers });
    return new Promise((resolve, reject) => {
      this.http.get(Constants.API_URL + '/comics/' + comicId + '/characters?limit=5' + Constants.KEY_PARAM, options).toPromise()
        .then(res => resolve(res.json()));
    });

  }

}
