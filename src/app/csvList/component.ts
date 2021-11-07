import { Component, OnInit, Inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { getAll } from '../csvList/__generated__/getAll';
import {
    updateMutVariables,
    updateMut,
    updateMut_updateCsv_item,
} from '../csvList/__generated__/updateMut';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material/dialog';

export const GET_ALL = gql`
    query getAll {
        csvs {
            id
            title
            filename
        }
    }
`;

const UPDATE_CSV = gql`
    mutation updateMut($title: String!, $id: Int!) {
        updateCsv(input: { params: { title: $title, id: $id } }) {
            item {
                id
                title
                filename
            }
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
    title: string = '';
    id: number | null = null;

    constructor(private apollo: Apollo, public dialog: MatDialog) {}

    setTitle(event: Event): void {
        this.title = (event.target as HTMLInputElement).value;
    }

    openDialog(element: updateMut_updateCsv_item): void {
        if (this.is_edit_dialog_opened) {
            return;
        }

        this.title = element.title;
        this.id = Number(element.id);

        this.dialogRef = this.dialog.open(editDialog, {
            data: {
                title: element.title,
                onClose: () => this.closeDialog(),
                onUpdate: () => this.updateTitle(),
                setTitle: (event: Event) => this.setTitle(event),
            },
        });

        this.is_edit_dialog_opened = true;
    }

    closeDialog(): void {
        this.is_edit_dialog_opened = false;

        this.dialogRef?.close();
    }

    updateTitle(): void {
        if (!this.id) {
            return;
        }

        this.apollo
            .mutate<updateMut, updateMutVariables>({
                mutation: UPDATE_CSV,
                variables: { title: this.title, id: this.id },
            })
            .subscribe();

        this.is_edit_dialog_opened = false;
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
    templateUrl: 'update_dialog.html',
})
export class editDialog {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            title: string;
            onClose: () => void;
            onUpdate: () => void;
            setTitle: (event: Event) => void;
        }
    ) {}
}
