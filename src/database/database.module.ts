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

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Envs } from '../app-config/envs.enum';
import { AppConfigService } from '../app-config/app-config.service';

import {
  AggregatedSector,
  AggregatedSectorSchema,
} from './schemas/aggregated-sector.schema';

const schemas = [
  { name: AggregatedSector.name, schema: AggregatedSectorSchema },
];
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (appConfigService: AppConfigService) => {
        const uri = appConfigService.get<string>(Envs.MONGO_URI);
        return {
          uri,
        };
      },
      inject: [AppConfigService],
    }),
    MongooseModule.forFeature(schemas),
  ],
  exports: [MongooseModule.forFeature(schemas)],
})
export class DatabaseModule {}
