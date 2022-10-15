# Base Angular app
Resources
https://www.youtube.com/watch?v=dFN79tEr_bc
https://stackoverflow.com/questions/58813245/401-unauthenticated-for-detect-intent-dialogflow
https://chatbotslife.com/dialogflow-v2-rest-api-communication-6cf7ab66ab36
https://www.npmjs.com/package/google-oauth-jwt
https://www.npmjs.com/package/@google-cloud/dialogflow-cx
https://github.com/googleapis/nodejs-dialogflow-cx/blob/main/samples/detect-intent-event.js
1. Create angular app
```sh
new df-101-app --style=scss --routing=true
```

2.  Add Material dependendies. We will use routing
```sh
ng add @angular/material --theme indigo-pink --typography true --animations true
```

3. Add the HomeScreen
```sh
ng g c screens/HomeScreen
```

4. Edit app-routing module with a route to home screen
```js
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
const routes: Routes = [
  { path: 'home-screen', component: HomeScreenComponent },
];
```

5. Install http server. It will be usefull for multilanguage testing 
```sh
npm install -D http-server
```

6. Add Header component
```sh
ng generate component components/Header
```


7. Edit the app-module to include Buttos, Icons and Toolbar
```ts
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
```

8. Add header component template
```html
<mat-toolbar color="primary">
  <span>101 Dialogflow App</span>
  <span class="spacer"></span>
  <button mat-icon-button>
    <mat-icon>refresh</mat-icon>
  </button>
  <button mat-icon-button>
    <mat-icon>share</mat-icon>
  </button>
</mat-toolbar>
```
9. Add the spacer to the scss
```css
.spacer {
    flex: 1 1 auto;
  }
```
10. Edit the app.component.html
```html
<app-header></app-header>
<router-outlet></router-outlet>
```

# Backend
1. npm init
2. backend/app.js
3. npm packages

```sh
npm i @google-cloud/dialogflow express dotenv dialogflow-v2 @google-cloud/dialogflow-cx cors nodemon
```
https://www.npmjs.com/package/@google-cloud/dialogflow-cx

2. code
```js
const express = require('express')
require('dotenv').config()
const dialogflow = require('@google-cloud/dialogflow-cx')
const fs = require('fs')
const PORT = process.env.PORT
const CREDENTIALS = JSON.parse(fs.readFileSync('/Users/juanantonioestival/.keys/hospitality-demo-361210-a223fae5fb99.json'))
const projectId = CREDENTIALS.project_id;
const location = 'global';
const agentId = 'fcb0a3b6-8299-4a9d-87e0-3731db89eab2';
const query = 'Estado de mi pedido';
const languageCode = 'es'
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}
const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const client = new SessionsClient(CONFIGURATION);
const app = express()

app.use(express.json())
app.get('/', (req, res)=>{
    res.send('Hola')
})
app.post('/api/dialogflow', async(req, res) => {
  const request = {
    session:client.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      req.body.sessionId
    ),
    queryInput: {
      text: {
        text: req.body.queryText,
      },
      languageCode:req.body.languageCode,
    },
  };
  const [response] = await client.detectIntent(request);
  res.send(response)
})

app.listen(PORT, ()=> {
  console.log(`Server runing ${PORT}`)
})
```
To test in postman dialgofflow/express
```json
{
    "queryText":"hola",
    "languageCode":"ca",
    "sessionId":"abcd1234"
}
```

# Adding the Webservice call to pokemon api
1. Generate the interface that will host the response of the api call

```sh
ng generate interafce pokemon
```
Edit the interface
```ts
export interface Pokemon {
    id:number,
    name:string,
    forms:Forms[],
    abilities:ability[],
    moves:move[],
    types:type[],
    sprites: {
        front_default:string,
        other: {
            dream_world: {
                front_default:string
            }
    
        }
    },
   
}
interface Forms {
    name:string,
    url:string
}
interface ability {
    ability: {
        name:string,
        url:string
    }
   
}
interface move {
    move: {
        name: string,
        url:string
    },
}
interface type {
    type: {
        name: string
    },
}  
   
```

2. Edit the app.module
```ts
import { HttpClientModule } from '@angular/common/http';
```

3. generate the service
```sh
ng generate service pokemon
```

4. inject the http in the service
```ts
import { HttpClient, HttpParams } from '@angular/common/http';
constructor(private http: HttpClient) { }
}
```

5. Add a method called get to get pokemon info

```ts
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
return this.http.get<Pokemon>(environment.apiUrl + 'pokemon/' + pokemon);
```

6. edit the environment files to host the base url of pokemon api

```ts
export const environment = {
  production: true,
  apiUrl: 'https://pokeapi.co/api/v2/',
};
```

7. Generate a component to show a pokemon card

```sh
ng generate component components/Pokemon
```

8. Check the material elements in app.module
```ts
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
```

9. Edit the pokemon comonent
* Interface
* servcie
* constructor
* search
* Input

```ts
import { Pokemon } from '../../pokemon';
import { PokemonService } from '../../pokemon.service';
pokemon: Pokemon | undefined;
constructor(private pokemonService: PokemonService) { }
search(pokemon: string) {
    this.pokemonService.getPokemon(pokemon).subscribe(pokemon => this.pokemon = pokemon);
  }
```
Full component code:
```ts
import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../../pokemon';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})

export class PokemonComponent implements OnInit {
  @Input() item = '';
  pokemon: Pokemon | undefined;
  samplePokemon = ['pikachu', 'charmander', 'raichu'];
  constructor(private pokemonService: PokemonService) { 
  }

  ngOnInit(): void {
    this.search(this.item)
  }
  
  search(pokemonId: string) {
    console.log(`searching ${pokemonId}`)
    this.pokemonService.getPokemon(pokemonId).subscribe(pokemonreceived => this.pokemon = pokemonreceived);
  }
}
```
Template
```html
      <mat-card *ngIf="pokemon">
        <mat-card-header >
          <mat-card-title><span class="name">Pokemon Name: </span>{{ pokemon.name }}</mat-card-title>
        </mat-card-header>
        <mat-card-subtitle>      
        </mat-card-subtitle>
        <mat-card-content>
          <img
          mat-card-image
          src="{{ pokemon.sprites.other.dream_world.front_default }}"
          alt="Pokemon Image"
        />
        </mat-card-content>
      </mat-card>
```
9. Edit homescreen to show 4 random pokemons

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  currentItem = "pikachu"
  currentItem2 = "charmander"
  number = Math.floor(Math.random() * 500) + 1
  items = [0]

  constructor() { }

  ngOnInit(): void {
    this.items = Array.from({length: 4}, () => Math.floor(Math.random() * 400));
  }
 
  createRange(){
  return this.items
}

}
```
Template

```html
<div class="col">
        <div *ngFor="let test of createRange(); let currentElementIndex" class="col1">
            <app-pokemon [item]="(test.toString())"></app-pokemon>
        </div>   
</div>
```

# Add the servie to call DF API


### pd
38


I had the same problem. I solved it by following those steps :

1/ First, you have to connect your firebase account > firebase login

2/ Next, check if the connection is alright (you need to create your project on firebase in a first place to see it in the result) > firebase projects:list

3/ Then, you need to initialize firebase > firebase init

4/ And now you can add the following command > ng add @angular/fire
