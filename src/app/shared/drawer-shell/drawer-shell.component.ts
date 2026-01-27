import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-drawer-shell',
    standalone: true,
    imports: [NgClass],
    template: `
        <div class="flex h-full min-h-0 flex-col" [ngClass]="{
            'w-full': size === 'full',
            'sm:w-128 w-full': size === 'half'
        }">
            <ng-content></ng-content>
        </div>
    `,
})
export class DrawerShellComponent {
    @Input() size: 'half' | 'full' = 'half';
}


