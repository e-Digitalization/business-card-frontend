import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FtmNavigationService } from '@ftm/components/navigation/navigation.service';
import { FtmNavigationItem } from '@ftm/components/navigation/navigation.types';
import { FtmVerticalNavigationComponent } from '@ftm/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'ftm-vertical-navigation-spacer-item',
    templateUrl: './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
})
export class FtmVerticalNavigationSpacerItemComponent
    implements OnInit, OnDestroy {
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _ftmNavigationService = inject(FtmNavigationService);

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
}
