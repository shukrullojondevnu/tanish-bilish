import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from '@fastify/compress';
import { constants } from 'zlib';

// Import modules for swagger
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { InterestsModule } from './interests/interests.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    GatewayModule,
    new FastifyAdapter(),
  );

  // Public API for custom app developers
  const configForPublicApi = new DocumentBuilder()
    .setTitle('Tanish-bilish')
    .setDescription(
      "O'zbekistondagi eng ommabop tanishuv platforma ochiq api si",
    )
    .setVersion('0.1.0')
    .build();
  const publicedApiDocument = SwaggerModule.createDocument(
    app,
    configForPublicApi,
    {
      include: [AuthModule, InterestsModule],
    },
  );
  SwaggerModule.setup('api/public', app, publicedApiDocument);

  // Private API for company dvelopers
  const configForPrivateApi = new DocumentBuilder()
    .setTitle('Tanish-bilish api')
    .setDescription('Kompaniya programistlari uchun!')
    .setVersion('0.1.1')
    .build();
  const privateApiDocument = SwaggerModule.createDocument(
    app,
    configForPrivateApi,
    {
      include: [AuthModule, RolesModule, InterestsModule, UsersModule],
    },
  );
  SwaggerModule.setup('api/private', app, privateApiDocument);

  await app.register(compression, {
    brotliOptions: { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } },
  });
  await app.listen(3000);
}
bootstrap();
