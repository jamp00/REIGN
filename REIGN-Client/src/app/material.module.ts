import {NgModule} from '@angular/core';

import {
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatExpansionModule,
        MatTableModule
    ],
    exports: [
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatExpansionModule,
        MatTableModule
    ]
})

export class materialModule{}