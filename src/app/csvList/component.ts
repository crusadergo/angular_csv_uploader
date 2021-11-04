import { Component, OnInit, Inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { getAll } from '../csvList/__generated__/getAll';
import { Mut_createCsv_item as csvItem } from '../uploadForm/__generated__/mut';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material/dialog';

export const GET_ALL = gql`
    query getAll {
        csvs {
            title
            filename
        }
    }
`;

@Component({
    selector: 'csv-list',
    templateUrl: 'template.html',
    styleUrls: ['style.sass'],
})
export class CsvListComponent implements OnInit {
    loading = true;
    csv_files: getAll[] = [];
    displayedColumns: string[] = ['title', 'filename', 'actions'];
    is_edit_dialog_opened = false;
    dialogRef: MatDialogRef<editDialog> | null = null;

    constructor(private apollo: Apollo, public dialog: MatDialog) {}

    openDialog(element: csvItem): void {
        this.dialogRef = this.dialog.open(editDialog, {
            data: { title: element.title, onClose: () => this.closeDialog() },
        });
    }

    closeDialog(): void {
        this.dialogRef?.close();
    }

    deleteRow(): void {}

    ngOnInit() {
        this.apollo
            .watchQuery({
                query: GET_ALL,
            })
            .valueChanges.subscribe((result: any) => {
                // TODO: Add types
                this.csv_files = result?.data?.csvs;
            });
    }
}

@Component({
    selector: 'edit-dialog',
    templateUrl: 'dialog.html',
})
export class editDialog {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { title: string; onClose: () => void }
    ) {}
}
