import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { PublicCardService } from './public-card.service';

@Component({
    selector: 'public-card',
    templateUrl: './public-card.component.html',
    styleUrls: ['./public-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatIconModule],
})
export class PublicCardComponent {
    private _route = inject(ActivatedRoute);
    private _publicCardService = inject(PublicCardService);

    card$ = this._route.paramMap.pipe(
        map((params) => params.get('slug')),
        switchMap((slug) => (slug ? this._publicCardService.getBySlug(slug) : of(null)))
    );

    getVcardUrl(slug: string): string {
        return this._publicCardService.getVcardUrl(slug);
    }

    getPhoneList(phone: string | null | undefined): string[] {
        if (!phone) {
            return [];
        }
        return phone
            .split(/[;,]/)
            .map((value) => value.trim())
            .filter((value) => value.length > 0);
    }
}
