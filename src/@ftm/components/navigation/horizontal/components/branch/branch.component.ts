import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    forwardRef,
    inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FtmHorizontalNavigationBasicItemComponent } from '@ftm/components/navigation/horizontal/components/basic/basic.component';
import { FtmHorizontalNavigationDividerItemComponent } from '@ftm/components/navigation/horizontal/components/divider/divider.component';
import { FtmHorizontalNavigationComponent } from '@ftm/components/navigation/horizontal/horizontal.component';
import { FtmNavigationService } from '@ftm/components/navigation/navigation.service';
import { FtmNavigationItem } from '@ftm/components/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';
import { PermissionDirective } from 'app/shared/directives/permission.directive';

@Component({
    selector: 'ftm-horizontal-navigation-branch-item',
    templateUrl: './branch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        MatMenuModule,
        NgTemplateOutlet,
        FtmHorizontalNavigationBasicItemComponent,
        forwardRef(() => FtmHorizontalNavigationBranchItemComponent),
        FtmHorizontalNavigationDividerItemComponent,
        MatTooltipModule,
        MatIconModule,
        PermissionDirective,
    ],
})
export class FtmHorizontalNavigationBranchItemComponent
    implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_child: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _ftmNavigationService = inject(FtmNavigationService);

    @Input() child: boolean = false;
    @Input() item: FtmNavigationItem;
    @Input() name: string;
    @ViewChild('matMenu', { static: true }) matMenu: MatMenu;

    private _ftmHorizontalNavigationComponent: FtmHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._ftmHorizontalNavigationComponent =
            this._ftmNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._ftmHorizontalNavigationComponent.onRefreshed
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
     * Trigger the change detection
     */
    triggerChangeDetection(): void {
        // Mark for check
        this._changeDetectorRef.markForCheck();
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
