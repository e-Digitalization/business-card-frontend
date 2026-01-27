import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-brand-footer',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [MatIconModule],
    template: `
        <footer class="mt-auto bg-primary-800 text-white dark:bg-gray-900">
            <div class="mx-auto w-full max-w-7xl px-6 py-10">
                <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div>
                        <div class="flex items-start gap-4">
                           
                            <div>
                                <div class="font-semibold">Business Card</div>
                             
                                <div class="text-white/80">Email: info@businesscard.go.tz</div>
                                <div class="mt-1 text-white/80">Phone: +255 26 296 3313</div>
                            </div>
                        </div>
                        <div class="mt-6 flex items-center gap-4">
                            <a class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700/70 text-white hover:bg-primary-700" href="#"><mat-icon class="text-white" [svgIcon]="'feather:facebook'"></mat-icon></a>
                            <a class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700/70 text-white hover:bg-primary-700" href="#"><mat-icon class="text-white" [svgIcon]="'feather:twitter'"></mat-icon></a>
                            <a class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700/70 text-white hover:bg-primary-700" href="#"><mat-icon class="text-white" [svgIcon]="'feather:instagram'"></mat-icon></a>
                            <a class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700/70 text-white hover:bg-primary-700" href="#"><mat-icon class="text-white" [svgIcon]="'feather:linkedin'"></mat-icon></a>
                        </div>
                    </div>
                    <div class="flex flex-col items-start gap-4 md:items-end">
                        <div class="text-right">
                            <div class="text-xs uppercase tracking-wider opacity-80"></div>
                            <div class="text-2xl font-extrabold">Digital Business Card</div>
                        </div>
                      
                    </div>
                </div>
                <div class="mt-8 border-t border-white/20 pt-4 text-sm text-white/80">
                    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div>© 2025 PORALG. All rights reserved.</div>
                        <div class="flex items-center gap-6">
                            <a class="hover:underline" href="#">Vigezo na Masharti</a>
                            <a class="hover:underline" href="#">Sera ya Faragha</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `,
})
export class BrandFooterComponent { }


