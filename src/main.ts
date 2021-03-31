import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');//context provided, we used bootstrap because it is in the bootstrap function
  const app = await NestFactory.create(AppModule); //appmodule is root module
  const port = 3000;
  app.useGlobalPipes(new ValidationPipe())//telling our application to use validation
  await app.listen(port);
  logger.log(`Application listening on port ${port}`); //note we use back hyphen and not apostrophe '
}
bootstrap();
