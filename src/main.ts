import {
  // HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
// import { LogginInterceptor } from './common/interceptors/logging.interceptor';
// import { RolesGuard } from './common/guards/roles.guard';
// import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
// import { logger } from './common/middleware/logger.middleware';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // register middleware for every route
  // app.use(logger);

  // filter for every route
  // app.useGlobalFilters(new HttpExceptionFilter());

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // app.useGlobalGuards(new RolesGuard());

  // app.useGlobalInterceptors(new LogginInterceptor())

  await app.listen(3000);
}
bootstrap();
