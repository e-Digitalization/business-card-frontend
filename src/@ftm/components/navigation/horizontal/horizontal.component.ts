import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { ftmAnimations } from '@ftm/animations';
import { FtmNavigationService } from '@ftm/components/navigation/navigation.service';
import { FtmNavigationItem } from '@ftm/components/navigation/navigation.types';
import { FtmUtilsService } from '@ftm/services/utils/utils.service';
import { ReplaySubject, Subject } from 'rxjs';
import { FtmHorizontalNavigationBasicItemComponent } from './components/basic/basic.component';
import { FtmHorizontalNavigationBranchItemComponent } from './components/branch/branch.component';
import { FtmHorizontalNavigationSpacerItemComponent } from './components/spacer/spacer.component';

@Component({
    selector: 'ftm-horizontal-navigation',
    templateUrl: './horizontal.component.html',
    styleUrls: ['./horizontal.component.scss'],
    animations: ftmAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'ftmHorizontalNavigation',
    imports: [
        FtmHorizontalNavigationBasicItemComponent,
        FtmHorizontalNavigationBranchItemComponent,
        FtmHorizontalNavigationSpacerItemComponent,
    ],
})
export class FtmHorizontalNavigationComponent
    implements OnChanges, OnInit, OnDestroy {
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _ftmNavigationService = inject(FtmNavigationService);
    private _ftmUtilsService = inject(FtmUtilsService);

    @Input() name: string = this._ftmUtilsService.randomId();
    @Input() navigation: FtmNavigationItem[];

    onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Navigation
        if ('navigation' in changes) {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Make sure the name input is not an empty string
        if (this.name === '') {
            this.name = this._ftmUtilsService.randomId();
        }

        // Register the navigation component
        this._ftmNavigationService.registerComponent(this.name, this);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Deregister the navigation component from the registry
        this._ftmNavigationService.deregisterComponent(this.name);

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void {
        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Execute the observable
        this.onRefreshed.next(true);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
