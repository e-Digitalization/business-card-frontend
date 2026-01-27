import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'auth-footer',
    templateUrl: './auth-footer.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class AuthFooterComponent {
    get currentYear(): number { return new Date().getFullYear(); }
}


