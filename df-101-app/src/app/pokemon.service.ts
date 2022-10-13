import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }
  getPokemon(pokemon: string): Observable<Pokemon> {
    const options = new HttpParams()
    //.set('units', 'metric')
    return this.http.get<Pokemon>(environment.apiUrl + 'pokemon/' + pokemon);
  }
}
