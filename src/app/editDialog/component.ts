import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'edit-dialog',
    templateUrl: 'template.html',
    styleUrls: ['styles.sass'],
})
export class EditDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            title: string;
            onClose: () => void;
            onUpdate: () => void;
            onDestroy: () => void;
            setTitle: (event: Event) => void;
        }
    ) {}
}
