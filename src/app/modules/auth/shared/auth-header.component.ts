import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'auth-header',
    templateUrl: './auth-header.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RouterLink],
})
export class AuthHeaderComponent { }


