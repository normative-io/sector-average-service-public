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
import { countryMapping, knownCountries } from './country.constants';

@Injectable()
export class CountryRepository {
  isKnownCountry(country: string): boolean {
    return knownCountries.includes(country);
  }

  findRegionForCountryIfNeeded(country: string): string {
    if (this.isKnownCountry(country)) {
      return country;
    } else {
      return this.findRegionForCountry(country);
    }
  }

  findRegionForCountry(country: string): string {
    return countryMapping[country];
  }
}
