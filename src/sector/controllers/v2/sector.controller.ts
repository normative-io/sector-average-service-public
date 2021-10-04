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

import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { SectorService } from '../../services/sector.service';
import { GetSectorEmissionsRequestV2 } from '../../dto/request/sector.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetSectorEmissionsResponseV2 } from '../../dto/response/sector-emission.response';
import { sectorEmissionResponseGenerator } from '../../dto/response/response.generators';

@Controller('v2')
export class SectorControllerV2 {
  constructor(private sectorService: SectorService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get emissions breakdown for a sector (industry) using isic code (available in exiobase) and alpha-2 standard country code.',
  })
  @ApiResponse({
    type: GetSectorEmissionsResponseV2,
  })
  async getSectorEmissions(
    @Query() params: GetSectorEmissionsRequestV2,
  ): Promise<GetSectorEmissionsResponseV2> {
    const region = this.sectorService.getRegionForCountry(params.country);
    const scopes = await this.sectorService.getSectorEmissions(
      params.isic,
      region,
      params.revenueMEUR,
    );
    if (scopes === null) {
      throw new NotFoundException(`no data for this (isic, region)`);
    }
    return sectorEmissionResponseGenerator(scopes);
  }
}
