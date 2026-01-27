import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-brand-header',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [MatIconModule, MatMenuModule, NgIf, NgFor],
    template: `
        <header class="sticky top-0 z-50 w-full bg-white shadow-sm">
            <!-- Top utility bar -->
            <div class="border-b border-slate-200 bg-white">
                <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-slate-600">
                    <div class="flex items-center gap-6">
                        <span class="inline-flex items-center gap-2">
                            <mat-icon class="icon-size-4" [svgIcon]="'heroicons_solid:phone'"></mat-icon>
                            +255 700 000 000
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <mat-icon class="icon-size-4" [svgIcon]="'heroicons_solid:envelope'"></mat-icon>
                            contact@swahilisystems.com
                        </span>
                    </div>
                    <div class="hidden items-center gap-4 md:flex">
                        <button class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
                            <mat-icon class="icon-size-4" [svgIcon]="'heroicons_outline:magnifying-glass'"></mat-icon>
                            Search
                        </button>
                        <button class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900" [matMenuTriggerFor]="langMenu">
                            <mat-icon class="icon-size-4" [svgIcon]="'heroicons_outline:globe-alt'"></mat-icon>
                            EN
                            <mat-icon class="icon-size-4" [svgIcon]="'heroicons_solid:chevron-down'"></mat-icon>
                        </button>
                        <a class="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-700" href="/sign-in">
                            Log in
                        </a>
                    </div>
                </div>
            </div>

            <!-- Main navigation -->
            <div class="bg-white">
                <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div class="flex items-center gap-3">
                        <img src="images/logo/logo.svg" alt="Swahili Systems" class="h-9 w-9" />
                        <div class="text-lg font-semibold text-slate-900">Swahili Systems</div>
                    </div>

                    <nav class="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
                        <a *ngFor="let item of navItems" class="hover:text-slate-900" [href]="item.href">
                            {{ item.label }}
                        </a>
                    </nav>

                    <div class="hidden items-center gap-3 md:flex">
                        <a class="rounded-full border border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50" href="/contact">
                            Contact us
                        </a>
                    </div>

                    <button class="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" (click)="open = !open" aria-label="Toggle menu">
                        <mat-icon class="icon-size-6" [svgIcon]="'heroicons_solid:bars-3'"></mat-icon>
                    </button>
                </div>
            </div>

            <!-- Mobile menu -->
            <div *ngIf="open" class="border-t border-slate-200 bg-white md:hidden">
                <div class="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-sm text-slate-700">
                    <a *ngFor="let item of navItems" class="rounded-lg px-3 py-2 hover:bg-slate-100" [href]="item.href">
                        {{ item.label }}
                    </a>
                    <a class="rounded-full bg-primary-600 px-4 py-2 text-center text-xs font-semibold text-white" href="/sign-in">
                        Log in
                    </a>
                </div>
            </div>

            <mat-menu #langMenu="matMenu" xPosition="before" yPosition="below">
                <button mat-menu-item>EN</button>
                <button mat-menu-item>SW</button>
            </mat-menu>
        </header>
    `,
})
export class BrandHeaderComponent {
    open = false;

    navItems = [
        { label: 'Co-create the Next', href: '/home' },
        { label: 'Capabilities', href: '/home' },
        { label: 'Products', href: '/home' },
        { label: 'Partners', href: '/home' },
        { label: 'Insights', href: '/home' },
        { label: 'About Us', href: '/home' },
    ];
}


