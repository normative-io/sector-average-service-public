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

import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './app-config/app-config.service';
import { Envs } from './app-config/envs.enum';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const appConfig = app.get(AppConfigService);
  if (appConfig.get<string>(Envs.ALLOW_CORS_ANY_ORIGIN) === 'true') {
    console.log('Enabling CORS');
    app.enableCors();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform requests to the actual DTO classes.
      whitelist: true, // Strip out unexpected fields.
    }),
  );

  app.setGlobalPrefix('api/sector', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: '/sentry/error-check', method: RequestMethod.GET },
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Sector Average Service')
    .setDescription('Sector emissions in different scopes')
    .setVersion('1.0')
    .addTag('sector')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/sector/openapi', app, document);

  await app.listen(3003, '0.0.0.0');
}
bootstrap();
