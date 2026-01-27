import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedPrimeUi } from './primeng-ui';
import { sharedMaterialUi } from './material-ui';


export const sharedUi = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...sharedPrimeUi,
    ...sharedMaterialUi,
];
