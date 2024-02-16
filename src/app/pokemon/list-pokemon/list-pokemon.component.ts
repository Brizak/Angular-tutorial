import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  //Constructeur
  // this.pokemonList = []; PAS D'INITIALISATION DANS LE CONSTRUCTEUR!!!! DECLARATION DANS NGONINIT
  // Pratiquement toujours vide même pour récupération des données d'un serveur distant -> dans ngoninit

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokeList) => (this.pokemonList = pokeList));
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
