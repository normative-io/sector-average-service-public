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

import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from '../../app-config/app-config.module';
import { DatabaseModule } from '../../database/database.module';
import { CountryRepository } from '../repositories/country.repository';
import { SectorRepository } from '../repositories/sector.repository';
import { SectorService } from './sector.service';

describe('SectorService', () => {
  let service: SectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectorService, SectorRepository, CountryRepository],
      imports: [DatabaseModule, AppConfigModule],
    }).compile();

    service = module.get<SectorService>(SectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should map WF to WA', () => {
    // 'Wallis and Futuna' collides with 'Africa' region but it is really in Asia.
    // It is not in the currently known list of countries and should always be mapped to Asia region (WA).
    expect(service.getRegionForCountry('WF')).toBe('WA');
  });
});
