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
import { GetSectorEmissionsRequestV1 } from '../../dto/request/sector.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PresentableSectorEmission } from '../../dto/response/sector-emission.response';

@Controller('v1')
export class SectorControllerV1 {
  constructor(private sectorService: SectorService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get emissions breakdown for a sector (industry) using isic code (available in exiobase) and country/region codes available in exiobase',
  })
  @ApiResponse({
    type: [PresentableSectorEmission],
  })
  async getSectorEmissions(
    @Query() params: GetSectorEmissionsRequestV1,
  ): Promise<PresentableSectorEmission[]> {
    const scopes = await this.sectorService.getSectorEmissions(
      params.isic,
      params.region,
      params.revenueMEUR,
    );

    if (scopes === null) {
      throw new NotFoundException(`no data for this (isic, region)`);
    }
    // V1 returns the scopes array directly.
    return scopes as PresentableSectorEmission[];
  }
}
