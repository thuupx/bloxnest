import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: CallHandler<any>,
  ): Observable<any> {
    return call$.handle().pipe(map(data => classToPlain(data)));
  }
}