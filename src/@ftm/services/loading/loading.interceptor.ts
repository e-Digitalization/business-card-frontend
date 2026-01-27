import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { FtmLoadingService } from '@ftm/services/loading/loading.service';
import { Observable, finalize, take } from 'rxjs';

export const ftmLoadingInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const ftmLoadingService = inject(FtmLoadingService);
    let handleRequestsAutomatically = false;

    ftmLoadingService.auto$.pipe(take(1)).subscribe((value) => {
        handleRequestsAutomatically = value;
    });

    // If the Auto mode is turned off, do nothing
    if (!handleRequestsAutomatically) {
        return next(req);
    }

    // Set the loading status to true
    ftmLoadingService._setLoadingStatus(true, req.url);

    return next(req).pipe(
        finalize(() => {
            // Set the status to false if there are any errors or the request is completed
            ftmLoadingService._setLoadingStatus(false, req.url);
        })
    );
};
