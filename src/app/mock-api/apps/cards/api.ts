import { Injectable } from '@angular/core';
import { FtmMockApiService } from '@ftm/lib/mock-api';
import { cards as cardsData } from 'app/mock-api/apps/cards/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class CardsMockApi {
    private _cards = cardsData;

    /**
     * Constructor
     */
    constructor(private _ftmMockApiService: FtmMockApiService) {
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Cards - GET
        // -----------------------------------------------------------------------------------------------------
        this._ftmMockApiService.onGet('api/cards').reply(({ request }) => {
            const slug = request.params.get('slug');
            const cards = cloneDeep(this._cards);

            if (slug) {
                const card = cards.find((item) => item.slug === slug) ?? null;
                return [200, card];
            }

            return [200, cards];
        });
    }
}
