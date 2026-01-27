import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ftmAnimations } from '@ftm/animations';
import { FtmAlertService } from '@ftm/components/alert/alert.service';
import {
    FtmAlertAppearance,
    FtmAlertType,
} from '@ftm/components/alert/alert.types';
import { FtmUtilsService } from '@ftm/services/utils/utils.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'ftm-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: ftmAnimations,
    exportAs: 'ftmAlert',
    imports: [MatIconModule, MatButtonModule],
})
export class FtmAlertComponent implements OnChanges, OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_dismissible: BooleanInput;
    static ngAcceptInputType_dismissed: BooleanInput;
    static ngAcceptInputType_showIcon: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _ftmAlertService = inject(FtmAlertService);
    private _ftmUtilsService = inject(FtmUtilsService);

    @Input() appearance: FtmAlertAppearance = 'soft';
    @Input() dismissed: boolean = false;
    @Input() dismissible: boolean = false;
    @Input() name: string = this._ftmUtilsService.randomId();
    @Input() showIcon: boolean = true;
    @Input() type: FtmAlertType = 'primary';
    @Output() readonly dismissedChanged: EventEmitter<boolean> =
        new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            'ftm-alert-appearance-border': this.appearance === 'border',
            'ftm-alert-appearance-fill': this.appearance === 'fill',
            'ftm-alert-appearance-outline': this.appearance === 'outline',
            'ftm-alert-appearance-soft': this.appearance === 'soft',
            'ftm-alert-dismissed': this.dismissed,
            'ftm-alert-dismissible': this.dismissible,
            'ftm-alert-show-icon': this.showIcon,
            'ftm-alert-type-primary': this.type === 'primary',
            'ftm-alert-type-accent': this.type === 'accent',
            'ftm-alert-type-warn': this.type === 'warn',
            'ftm-alert-type-basic': this.type === 'basic',
            'ftm-alert-type-info': this.type === 'info',
            'ftm-alert-type-success': this.type === 'success',
            'ftm-alert-type-warning': this.type === 'warning',
            'ftm-alert-type-error': this.type === 'error',
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Dismissed
        if ('dismissed' in changes) {
            // Coerce the value to a boolean
            this.dismissed = coerceBooleanProperty(
                changes.dismissed.currentValue
            );

            // Dismiss/show the alert
            this._toggleDismiss(this.dismissed);
        }

        // Dismissible
        if ('dismissible' in changes) {
            // Coerce the value to a boolean
            this.dismissible = coerceBooleanProperty(
                changes.dismissible.currentValue
            );
        }

        // Show icon
        if ('showIcon' in changes) {
            // Coerce the value to a boolean
            this.showIcon = coerceBooleanProperty(
                changes.showIcon.currentValue
            );
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the dismiss calls
        this._ftmAlertService.onDismiss
            .pipe(
                filter((name) => this.name === name),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // Dismiss the alert
                this.dismiss();
            });

        // Subscribe to the show calls
        this._ftmAlertService.onShow
            .pipe(
                filter((name) => this.name === name),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // Show the alert
                this.show();
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
     * Dismiss the alert
     */
    dismiss(): void {
        // Return if the alert is already dismissed
        if (this.dismissed) {
            return;
        }

        // Dismiss the alert
        this._toggleDismiss(true);
    }

    /**
     * Show the dismissed alert
     */
    show(): void {
        // Return if the alert is already showing
        if (!this.dismissed) {
            return;
        }

        // Show the alert
        this._toggleDismiss(false);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Dismiss/show the alert
     *
     * @param dismissed
     * @private
     */
    private _toggleDismiss(dismissed: boolean): void {
        // Return if the alert is not dismissible
        if (!this.dismissible) {
            return;
        }

        // Set the dismissed
        this.dismissed = dismissed;

        // Execute the observable
        this.dismissedChanged.next(this.dismissed);

        // Notify the change detector
        this._changeDetectorRef.markForCheck();
    }
}
