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
import { CountryRepository } from '../../../sector/repositories/country.repository';
import { AppConfigModule } from '../../../app-config/app-config.module';
import { DatabaseModule } from '../../../database/database.module';
import { SectorRepository } from '../../repositories/sector.repository';
import { SectorService } from '../../services/sector.service';
import { SectorControllerV2 } from './sector.controller';

describe('SectorControllerV2', () => {
  let controller: SectorControllerV2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectorControllerV2],
      providers: [SectorService, SectorRepository, CountryRepository],
      imports: [DatabaseModule, AppConfigModule],
    }).compile();

    controller = module.get<SectorControllerV2>(SectorControllerV2);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
