import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'delete-dialog',
    templateUrl: 'template.html',
    styleUrls: ['styles.sass'],
})
export class DeleteDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            onDestroy: () => void;
            onClose: () => void;
        }
    ) {}
}
