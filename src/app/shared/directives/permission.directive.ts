import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';

@Directive({
    selector: '[appPermission]',
    standalone: true
})
export class PermissionDirective implements OnInit {
    @Input() appPermission: string | string[] | undefined;

    constructor(
        private authService: AuthService,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.checkPermission();
    }

    private checkPermission() {
        if (this.appPermission) {
            const hasPermission = this.authService.hasPermission(this.appPermission);

            if (!hasPermission) {
                this.hideElement();
            }
        }
    }

    private hideElement() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
}
