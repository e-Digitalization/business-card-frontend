import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ftmAnimations } from '@ftm/animations';

@Component({
    selector: 'auth-confirmation-required',
    templateUrl: './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: ftmAnimations,
    imports: [RouterLink],
})
export class AuthConfirmationRequiredComponent {
    /**
     * Constructor
     */
    constructor() { }
}
