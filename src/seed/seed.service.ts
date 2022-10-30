import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const { results } = await this.axiosAdapter.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemonsToInsert: Pokemon[] = results.map(({ name, url }) => {
      const no: number = +url.split('/').at(-2);
      return { no, name };
    });
    await this.pokemonModel.insertMany(pokemonsToInsert);
    return `Seed executed`;
  }
}
