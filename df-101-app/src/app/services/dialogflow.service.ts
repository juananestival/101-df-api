import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DFRequest} from './../dfrequest'

@Injectable({
  providedIn: 'root'
})

export class DialogflowService {
constructor(private http: HttpClient) { }
public getDfIntent (req:DFRequest):Observable<any> {
  return this.http.post<any>(environment.dfApiUrl, req)
}
}
