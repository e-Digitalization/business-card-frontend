import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    forwardRef,
    inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FtmNavigationService } from '@ftm/components/navigation/navigation.service';
import { FtmNavigationItem } from '@ftm/components/navigation/navigation.types';
import { FtmVerticalNavigationBasicItemComponent } from '@ftm/components/navigation/vertical/components/basic/basic.component';
import { FtmVerticalNavigationCollapsableItemComponent } from '@ftm/components/navigation/vertical/components/collapsable/collapsable.component';
import { FtmVerticalNavigationDividerItemComponent } from '@ftm/components/navigation/vertical/components/divider/divider.component';
import { FtmVerticalNavigationSpacerItemComponent } from '@ftm/components/navigation/vertical/components/spacer/spacer.component';
import { FtmVerticalNavigationComponent } from '@ftm/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';
import { PermissionDirective } from 'app/shared/directives/permission.directive';

@Component({
    selector: 'ftm-vertical-navigation-group-item',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        MatIconModule,
        FtmVerticalNavigationBasicItemComponent,
        FtmVerticalNavigationCollapsableItemComponent,
        FtmVerticalNavigationDividerItemComponent,
        forwardRef(() => FtmVerticalNavigationGroupItemComponent),
        FtmVerticalNavigationSpacerItemComponent,
        PermissionDirective,
    ],
})
export class FtmVerticalNavigationGroupItemComponent
    implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_autoCollapse: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _ftmNavigationService = inject(FtmNavigationService);

    @Input() autoCollapse: boolean;
    @Input() item: FtmNavigationItem;
    @Input() name: string;

    private _ftmVerticalNavigationComponent: FtmVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._ftmVerticalNavigationComponent =
            this._ftmNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._ftmVerticalNavigationComponent.onRefreshed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
