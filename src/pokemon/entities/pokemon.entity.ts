import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
