import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export type FtmMockApiReplyCallback =
    | ((data: {
        request: HttpRequest<any>;
        urlParams: { [key: string]: string };
    }) => [number, string | any] | Observable<any>)
    | undefined;

export type FtmMockApiMethods =
    | 'get'
    | 'post'
    | 'patch'
    | 'delete'
    | 'put'
    | 'head'
    | 'jsonp'
    | 'options';
