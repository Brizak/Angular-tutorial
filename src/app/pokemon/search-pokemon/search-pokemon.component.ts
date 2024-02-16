import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-search-pokemon',
    templateUrl: './search-pokemon.component.html',
    standalone: true,
    imports: [NgFor, AsyncPipe]
})
export class SearchPokemonComponent implements OnInit {
  // {..."a".."ab"..."abz".."ab"..."abc".....} stocker les recherches successives, flux dans le temps des recherches
  searchTerms = new Subject<string>(); //piloter l'observable
  // {...pokemonList(a)..pokemonList(ab).....}
  pokemons$: Observable<Pokemon[]>; //un observable on ne peut que le consommer pour recevoir les données dans le temps

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"..."abz"."ab"...."abc"......}
      debounceTime(300), //opérateur qui élimine les search qui ont moins de 300ms d'attente apr ès
      // {....."ab"...."ab"...."abc"......}
      distinctUntilChanged(), //opérateur qui attend qu'il y ai un changement dans les search
      // {....."ab".........."abc"......}
      // map((term) => this.pokemonService.searchPokemonList(term))
      // {.....Observable<"ab">..........Observable<"abc">......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {.....pokemonList("ab")......  ....pokemonList("abc")......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
