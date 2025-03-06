import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Brewery} from '../interface/brewery.interface';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BreweryService {
  readonly apiUrl = 'https://api.openbrewerydb.org/v1';

  constructor(private http: HttpClient) {}

  getBreweries(): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(`${this.apiUrl}/breweries`);
  }
}
