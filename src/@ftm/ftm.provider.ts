import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    EnvironmentProviders,
    Provider,
    importProvidersFrom,
    inject,
    provideAppInitializer,
    provideEnvironmentInitializer,
} from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
    FTM_MOCK_API_DEFAULT_DELAY,
    mockApiInterceptor,
} from '@ftm/lib/mock-api';
import { FtmConfig } from '@ftm/services/config';
import { FTM_CONFIG } from '@ftm/services/config/config.constants';
import { FtmConfirmationService } from '@ftm/services/confirmation';
import {
    FtmLoadingService,
    ftmLoadingInterceptor,
} from '@ftm/services/loading';
import { FtmMediaWatcherService } from '@ftm/services/media-watcher';
import { FtmPlatformService } from '@ftm/services/platform';
import { FtmSplashScreenService } from '@ftm/services/splash-screen';
import { FtmUtilsService } from '@ftm/services/utils';

export type FtmProviderConfig = {
    mockApi?: {
        delay?: number;
        service?: any;
    };
    ftm?: FtmConfig;
};

/**
 * Ftm provider
 */
export const provideFtm = (
    config: FtmProviderConfig
): Array<Provider | EnvironmentProviders> => {
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide: FTM_MOCK_API_DEFAULT_DELAY,
            useValue: config?.mockApi?.delay ?? 0,
        },
        {
            provide: FTM_CONFIG,
            useValue: config?.ftm ?? {},
        },

        importProvidersFrom(MatDialogModule),
        provideEnvironmentInitializer(() => inject(FtmConfirmationService)),

        provideHttpClient(withInterceptors([ftmLoadingInterceptor])),
        provideEnvironmentInitializer(() => inject(FtmLoadingService)),

        provideEnvironmentInitializer(() => inject(FtmMediaWatcherService)),
        provideEnvironmentInitializer(() => inject(FtmPlatformService)),
        provideEnvironmentInitializer(() => inject(FtmSplashScreenService)),
        provideEnvironmentInitializer(() => inject(FtmUtilsService)),
    ];

    // Mock Api services
    if (config?.mockApi?.service) {
        providers.push(
            provideHttpClient(withInterceptors([mockApiInterceptor])),
            provideAppInitializer(() => {
                const mockApiService = inject(config.mockApi.service);
            })
        );
    }

    // Return the providers
    return providers;
};
