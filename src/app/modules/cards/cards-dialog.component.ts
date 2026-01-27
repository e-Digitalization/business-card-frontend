import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { finalize } from 'rxjs';
import { CardsService } from './cards.service';
import { CardResponse } from './cards.types';
import { FtmAlertComponent, FtmAlertType } from '@ftm/components/alert';
import Swal from 'sweetalert2';

type CardsDialogData = {
    card?: CardResponse;
    viewOnly?: boolean;
};

@Component({
    selector: 'cards-dialog',
    templateUrl: './cards-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FtmAlertComponent,
    ],
})
export class CardsDialogComponent {
    private _cardsService = inject(CardsService);
    private _formBuilder = inject(FormBuilder);
    private _dialogRef = inject(MatDialogRef<CardsDialogComponent>);

    saving = false;
    tagCode = '';
    previewUrl: string | null = null;
    showAlert = false;
    alert: { type: FtmAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    form = this._formBuilder.group({
        slug: ['', Validators.required],
        fullName: ['', Validators.required],
        title: [''],
        company: [''],
        location: [''],
        phone: [''],
        email: ['', Validators.email],
        website: [''],
        whatsapp: [''],
        photoUrl: [''],
        linkedin: [''],
        twitter: [''],
        github: [''],
        active: [true],
    });

    constructor(@Inject(MAT_DIALOG_DATA) public data: CardsDialogData) {
        if (data?.card) {
            this.form.patchValue({
                slug: data.card.slug ?? '',
                fullName: data.card.fullName ?? '',
                title: data.card.title ?? '',
                company: data.card.company ?? '',
                location: data.card.location ?? '',
                phone: data.card.phone ?? '',
                email: data.card.email ?? '',
                website: data.card.website ?? '',
                whatsapp: data.card.whatsapp ?? '',
                photoUrl: data.card.photoUrl ?? '',
                linkedin: data.card.linkedin ?? '',
                twitter: data.card.twitter ?? '',
                github: data.card.github ?? '',
                active: data.card.active ?? true,
            });
            this.previewUrl = data.card.photoUrl ?? null;
        }

        if (data?.viewOnly) {
            this.form.disable();
        }
    }

    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const payload = this.form.getRawValue();
        this.saving = true;

        const request$ = this.data?.card?.id
            ? this._cardsService.update(this.data.card.id, payload)
            : this._cardsService.create(payload);

        request$
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe((response: any) => {
                console.log(response);
                this.alert = {
                    type: 'success',
                    message: this.data?.card ? 'Card updated successfully.' : 'Card created successfully.',
                };
                this.showAlert = true;
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: this.alert.message,
                    confirmButtonColor: '#2563eb',
                });
                this._dialogRef.close(true);
            });
    }

    close(): void {
        this._dialogRef.close(false);
    }

    onPhotoSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }

        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            this.previewUrl = result;
            this.form.patchValue({ photoUrl: result });
        };
        reader.readAsDataURL(file);
    }

    addTag(): void {
        if (!this.data?.card?.id || !this.tagCode.trim()) {
            return;
        }
        const code = this.tagCode.trim();
        this._cardsService.assignTag(this.data.card.id, code).subscribe((tag) => {
            this.data.card.tags = [...(this.data.card.tags ?? []), tag];
            this.tagCode = '';
        });
    }

    deactivateTag(tagId: number): void {
        this._cardsService.deactivateTag(tagId).subscribe((updated) => {
            this.data.card.tags = (this.data.card.tags ?? []).map((tag) =>
                tag.id === updated.id ? updated : tag
            );
        });
    }
}
