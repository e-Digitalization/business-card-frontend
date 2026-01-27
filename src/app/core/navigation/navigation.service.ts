import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FtmNavigationItem } from '@ftm/components/navigation';
import { Observable, ReplaySubject, catchError, map, of, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { navigationData } from 'app/core/navigation/navigation.data';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        if (!environment.api.navigationUrl) {
            const fallback = this._buildFallback();
            this._navigation.next(fallback);
            return of(fallback);
        }

        console.log('[NavigationService] Fetching navigation from', environment.api.navigationUrl);
        return this._httpClient
            .get<any>(environment.api.navigationUrl)
            .pipe(
                map((resp: any) => {
                    console.log('[NavigationService] Navigation response OK', resp);
                    // Normalize response: accept either {default,compact,...} or raw array of items
                    if (resp && resp.default && resp.compact && resp.futuristic && resp.horizontal) {
                        try {
                            console.log('[NavigationService] Items (default)', resp.default);
                        } catch { }
                        return resp as Navigation;
                    }

                    const items = Array.isArray(resp) ? resp : [];
                    try {
                        console.log('[NavigationService] Items (flat)', items);
                    } catch { }
                    const asNavigation: Navigation = {
                        default: items,
                        compact: items,
                        futuristic: items,
                        horizontal: items,
                    };
                    return asNavigation;
                }),
                catchError((error) => {
                    console.error('[NavigationService] Navigation fetch failed', error);
                    // Fallback to local navigation data to avoid breaking the UI
                    const fallback = this._buildFallback();
                    this._navigation.next(fallback);
                    return of(fallback);
                }),
                tap((navigation) => {
                    console.debug('[NavigationService] Navigation published', navigation);
                    this._navigation.next(navigation);
                })
            );
    }

    /**
     * Normalize raw items to FtmNavigationItem shape (convert numeric ids to strings recursively)
     */
    private _normalizeItems(items: any[]): FtmNavigationItem[] {
        return (items ?? []).map((item) => {
            const normalized: FtmNavigationItem = {
                ...item,
                id: item?.id != null ? String(item.id) : item?.id,
                children: Array.isArray(item?.children)
                    ? this._normalizeItems(item.children)
                    : undefined,
            };
            return normalized;
        });
    }

    private _buildFallback(): Navigation {
        const fallbackItems = Array.isArray(navigationData)
            ? this._normalizeItems(navigationData)
            : ([] as FtmNavigationItem[]);
        const fallback: Navigation = {
            default: fallbackItems,
            compact: fallbackItems,
            futuristic: fallbackItems,
            horizontal: fallbackItems,
        };
        console.info('[NavigationService] Using fallback static navigation');
        try {
            console.log('[NavigationService] Items (fallback default)', fallback.default);
        } catch { }
        return fallback;
    }
}
