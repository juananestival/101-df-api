Each chapter has their own commit
# Call to express server API to invoke DF detectIntent
https://expressjs.com/en/resources/middleware/cors.html


1. Create an interface that will be used to recive the body in json of the request
```js
export interface DFRequest {
    queryText:string,
    languageCode:string,
    sessionId:string
    
}
```

2. the service will use the interface type to receive the request
mi interpretacion. 
la función devuelve un observable DEntro de ese observable irá la respuesta de la api que de momento es de tipo any

```ts
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

```


3. Edit the environment files to host the api endpoint
4. We will create a component

```ts
import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../../services/dialogflow.service'

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  dfRequest = {
    "queryText":"hola",
    "languageCode":"es",
    "sessionId":"abcd1235"
  }

  constructor(private dfService:DialogflowService) { }

  ngOnInit(): void {
  }
  detectIntent (){
    this.dfService.getDfIntent(this.dfRequest).subscribe(data => console.log(data.queryResult.responseMessages[0].text.text) )

  }

}
```

and its template
```html
<p>chat-box works!</p>
<button (click)="detectIntent()">d</button>

```
5. create a route
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component'

const routes: Routes = [
  { path: 'home-screen', component: HomeScreenComponent },
  { path: 'chat-box', component: ChatBoxComponent },
  { path: '',   redirectTo: '/home-screen', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```