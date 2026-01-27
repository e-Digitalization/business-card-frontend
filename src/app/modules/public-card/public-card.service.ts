import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PublicCard } from './public-card.types';

@Injectable({ providedIn: 'root' })
export class PublicCardService {
    private _httpClient = inject(HttpClient);

    getBySlug(slug: string): Observable<PublicCard | null> {
        return this._httpClient.get<PublicCard | null>(
            `${environment.api.baseUrl}/api/public/profile/${slug}`
        );
    }

    getVcardUrl(slug: string): string {
        return `${environment.api.baseUrl}/api/public/profile/${slug}/vcard`;
    }
}
