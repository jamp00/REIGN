import {NgModule} from '@angular/core';

import {
    MatExpansionModule
} from '@angular/material/expansion';

import {
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatExpansionModule
    ],
    exports: [
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatExpansionModule
    ]
})

export class materialModule{}