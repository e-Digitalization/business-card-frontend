import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation,
    inject,
    ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CardsService } from './cards.service';
import { CardListItem, CardResponse } from './cards.types';
import { CardsDialogComponent } from './cards-dialog.component';

@Component({
    selector: 'cards',
    templateUrl: './cards.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
    ],
})
export class CardsComponent implements OnInit, AfterViewInit {
    private _cardsService = inject(CardsService);
    private _dialog = inject(MatDialog);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    selectedCardId: number | null = null;
    displayedColumns = [
        'no',
        'avatar',
        'fullName',
        'title',
        'company',
        'slug',
        'contact',
        'tags',
        'active',
        'actions',
    ];
    dataSource = new MatTableDataSource<CardResponse>([]);

    ngOnInit(): void {
        this.reload();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    reload(): void {
        this._cardsService.list().subscribe((items: CardListItem[]) => {
            const cards = (items ?? []).map((item) => ({
                ...item.card,
                tags: item.tags ?? [],
            }));
            this.dataSource.data = cards;
            if (this.paginator) {
                this.dataSource.paginator = this.paginator;
                this.paginator.length = cards.length;
            }
        });
    }

    applyFilter(value: string): void {
        this.dataSource.filter = value.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getRowNumber(index: number): number {
        if (!this.paginator) {
            return index + 1;
        }
        return this.paginator.pageIndex * this.paginator.pageSize + index + 1;
    }

    formatTagCodes(tags: { tagCode: string }[] | null | undefined): string {
        if (!tags || tags.length === 0) {
            return '';
        }
        return tags.map((tag) => tag.tagCode).join(', ');
    }

    openEdit(card: CardResponse): void {
        this.selectedCardId = card.id ?? null;
        this._dialog
            .open(CardsDialogComponent, {
                width: '900px',
                data: { card, viewOnly: false },
            })
            .afterClosed()
            .subscribe((saved) => {
                if (saved) {
                    this.reload();
                }
            });
    }

    openView(card: CardResponse): void {
        this._dialog.open(CardsDialogComponent, {
            width: '900px',
            data: { card, viewOnly: true },
        });
    }

    openCreate(): void {
        this.selectedCardId = null;
        this._dialog
            .open(CardsDialogComponent, {
                width: '900px',
            })
            .afterClosed()
            .subscribe((saved) => {
                if (saved) {
                    this.reload();
                }
            });
    }
}
