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

import { ApiProperty } from '@nestjs/swagger';

export class PresentableCategory {
  @ApiProperty({
    description: 'the category found in the GHG protocols for each scope',
  })
  category: string;
  @ApiProperty({
    description: 'the value of emission of carbon based on kg of CO2. eq',
  })
  value: number;
}

export class PresentableSectorEmission {
  @ApiProperty({
    description: 'scope of emission based on GHG protocol',
  })
  scope: 'Scope 1' | 'Scope 2' | 'Scope 3';

  @ApiProperty({
    description: 'breakdown of categories',
    type: [PresentableCategory],
  })
  categories: PresentableCategory[];
}

export class GetSectorEmissionsResponseV2 {
  @ApiProperty({
    description: 'emissions data grouped by GHG scope',
    type: [PresentableSectorEmission],
  })
  scopes: PresentableSectorEmission[];
}
