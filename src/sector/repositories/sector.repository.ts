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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AggregatedSector,
  AggregatedSectorDocument,
} from '../../database/schemas/aggregated-sector.schema';

@Injectable()
export class SectorRepository {
  constructor(
    @InjectModel(AggregatedSector.name)
    private aggregatedSector: Model<AggregatedSectorDocument>,
  ) {}

  async findSectorByIsicAndRegion(
    isic: string,
    region: string,
  ): Promise<AggregatedSector | null> {
    const res = await this.aggregatedSector
      .findOne({
        isic,
        region,
      })
      .select({
        _id: 0,
        isic: 0,
        region: 0,
      })
      .lean();
    return res;
  }
}
