import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment';
import {
    CardListItem,
    CardRequest,
    CardResponse,
    CardCore,
    CardTagSummary,
} from './cards.types';

@Injectable({ providedIn: 'root' })
export class CardsService {
    private _httpClient = inject(HttpClient);

    list(): Observable<CardListItem[]> {
        return this._httpClient
            .get<{ data?: CardListItem[] } | CardListItem[]>(
                `${environment.api.baseUrl}/api/admin/cards`
            )
            .pipe(map((response) => (Array.isArray(response) ? response : response?.data ?? [])));
    }

    get(id: number): Observable<CardResponse> {
        return this._httpClient.get<CardResponse>(
            `${environment.api.baseUrl}/api/admin/cards/${id}`
        );
    }

    create(request: CardRequest): Observable<CardCore> {
        return this._httpClient.post<CardCore>(
            `${environment.api.baseUrl}/api/admin/cards`,
            request
        );
    }

    update(id: number, request: CardRequest): Observable<CardCore> {
        return this._httpClient.put<CardCore>(
            `${environment.api.baseUrl}/api/admin/cards/${id}`,
            request
        );
    }

    assignTag(cardId: number, tagCode: string): Observable<CardTagSummary> {
        return this._httpClient.post<CardTagSummary>(
            `${environment.api.baseUrl}/api/admin/cards/${cardId}/tag`,
            { tagCode }
        );
    }

    deactivateTag(tagId: number): Observable<CardTagSummary> {
        return this._httpClient.put<CardTagSummary>(
            `${environment.api.baseUrl}/api/admin/tags/${tagId}/deactivate`,
            {}
        );
    }
}
