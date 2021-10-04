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
import { ScopeType } from '../../database/schemas/aggregated-sector.schema';
import { CountryRepository } from '../repositories/country.repository';
import { SectorRepository } from '../repositories/sector.repository';

const DEFAULT_REVENUE_MULTIPLIER = 10;

@Injectable()
export class SectorService {
  constructor(
    private sectorRepository: SectorRepository,
    private countryRepository: CountryRepository,
  ) {}

  getRegionForCountry(country: string): string {
    if (country == 'WF') {
      // Special case for 'Wallis and Futuna' which collides with 'Africa' region
      // but really is in Asia. It is not in the currently known list of countries
      // and should always be mapped to Asia region (WA).
      return 'WA';
    }
    return this.countryRepository.findRegionForCountryIfNeeded(country);
  }

  async getSectorEmissions(
    isic: string,
    region: string,
    revenueMultiplier?: number,
  ): Promise<ScopeType[] | null> {
    let aggregatedSector =
      await this.sectorRepository.findSectorByIsicAndRegion(isic, region);
    if (aggregatedSector === null) {
      // attempt with country mapped to region (in case a specific sector is missing in a specific country)
      const mappedRegion = this.countryRepository.findRegionForCountry(region);
      aggregatedSector = await this.sectorRepository.findSectorByIsicAndRegion(
        isic,
        mappedRegion,
      );
    }
    if (aggregatedSector === null) {
      return null;
    }

    const scale = revenueMultiplier ?? DEFAULT_REVENUE_MULTIPLIER;
    aggregatedSector.scopes.forEach((scope) => {
      scope.categories.forEach((cat) => {
        cat.value *= scale;
      });
    });

    return aggregatedSector.scopes;
  }
}
