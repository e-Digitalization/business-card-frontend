import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FtmLoadingBarComponent } from '@ftm/components/loading-bar';
import {
    FtmNavigationService,
    FtmVerticalNavigationComponent,
} from '@ftm/components/navigation';
import { FtmMediaWatcherService } from '@ftm/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'pepmis-layout',
    templateUrl: './pepmis.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        FtmLoadingBarComponent,
        FtmVerticalNavigationComponent,
        MatButtonModule,
        MatIconModule,
        UserComponent,
        RouterOutlet,
    ],
})
export class PepmisLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _ftmMediaWatcherService: FtmMediaWatcherService,
        private _ftmNavigationService: FtmNavigationService
    ) { }

    get currentYear(): number {
        return new Date().getFullYear();
    }

    ngOnInit(): void {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._ftmMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void {
        const navigation =
            this._ftmNavigationService.getComponent<FtmVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            navigation.toggle();
        }
    }
}


