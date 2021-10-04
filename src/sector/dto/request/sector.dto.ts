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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetSectorEmissionsRequestV1 {
  @ApiProperty({
    description: 'exiobase isic code of industry',
  })
  @IsNumberString()
  @Length(1, 4)
  isic: string;

  @ApiProperty({
    description: 'exiobase country or region code',
  })
  @IsString()
  @Length(2, 2)
  @IsUppercase()
  region: string;

  @ApiPropertyOptional({
    description: 'revenue in million Euro. e.g 10 equals to 10 M.Eur',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  // Query parameters are always strings so we need class-transformer to convert it to a number for us.
  @Type(() => Number)
  revenueMEUR?: number;
}

export class GetSectorEmissionsRequestV2 {
  @ApiProperty({
    description: 'exiobase isic code of industry',
  })
  @IsNumberString()
  @Length(1, 4)
  isic: string;

  @ApiProperty({
    description: 'ISO 3166-1 alpha-2 country code',
  })
  @IsString()
  @Length(2, 2)
  @IsUppercase()
  country: string;

  @ApiPropertyOptional({
    description: 'revenue in million Euro. e.g 10 equals to 10 M.Eur',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  // Query parameters are always strings so we need class-transformer to convert it to a number for us.
  @Type(() => Number)
  revenueMEUR?: number;
}
