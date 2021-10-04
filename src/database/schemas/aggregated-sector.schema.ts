// Copyright 2022 Meta Mind AB
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Prop, Schema as Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AggregatedSectorDocument = AggregatedSector & Document;

export class ScopeType {
  scope: 'Scope 1' | 'Scope 2' | 'Scope 3';
  categories: { category: string; value: number }[];
}

@Schema({
  collection: 'aggregatedSector_v3',
})
export class AggregatedSector {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  region: string;

  @Prop()
  isic: string;

  @Prop([ScopeType])
  scopes: ScopeType[];
}

export const AggregatedSectorSchema =
  SchemaFactory.createForClass(AggregatedSector);
AggregatedSectorSchema.index({ isic: 1, region: 1 });
