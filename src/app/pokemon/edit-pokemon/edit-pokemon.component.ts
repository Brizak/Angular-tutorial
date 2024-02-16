import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <div *ngIf="pokemon">
      <div class="center">
        <h2>Editer {{ pokemon.name }}</h2>
        <img *ngIf="pokemon" [src]="pokemon.picture" />
      </div>
      <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
    </div>
    <h3 *ngIf="!pokemon" class="center">
      <app-loader></app-loader>
    </h3>
  `,
  styles: [],
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon));
    }
  }
}
