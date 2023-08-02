import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('------------BEFORE------------');

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`------------AFTER: ${Date.now() - now}ms------------`),
        ),
      );
  }
}
