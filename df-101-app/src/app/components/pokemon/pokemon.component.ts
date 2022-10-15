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
