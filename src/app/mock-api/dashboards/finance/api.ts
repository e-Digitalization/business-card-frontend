import { Injectable } from '@angular/core';
import { FtmMockApiService } from '@ftm/lib/mock-api';
import { finance as financeData } from 'app/mock-api/dashboards/finance/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class FinanceMockApi {
    private _finance: any = financeData;

    /**
     * Constructor
     */
    constructor(private _ftmMockApiService: FtmMockApiService) {
        // Register Mock API handlers
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
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._ftmMockApiService
            .onGet('api/dashboards/finance')
            .reply(() => [200, cloneDeep(this._finance)]);
    }
}
