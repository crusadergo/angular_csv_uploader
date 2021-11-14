import { Component, OnInit, Inject, Injector } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { getAll } from '../csvList/__generated__/getAll';
import {
    destroyMut,
    destroyMutVariables,
    destroyMut_destroyCsv_csvs,
} from '../csvList/__generated__/destroyMut';
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
import { DeleteDialogComponent } from '../deleteDialog/component';
import { EditDialogComponent } from '../editDialog/component';

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

const DESTROY_CSV = gql`
    mutation destroyMut($id: Int!) {
        destroyCsv(input: { params: { id: $id } }) {
            csvs {
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
    dialogRef: MatDialogRef<EditDialogComponent> | null = null;
    destroyDialogRef: MatDialogRef<DeleteDialogComponent> | null = null;
    title: string = '';
    id: number | null = null;

    constructor(private apollo: Apollo, public dialog: MatDialog) {}

    setTitle(event: Event): void {
        this.title = (event.target as HTMLInputElement).value;
    }

    openDialog(element: updateMut_updateCsv_item): void {
        this.title = element.title;
        this.id = Number(element.id);

        this.dialogRef = this.dialog.open(EditDialogComponent, {
            data: {
                title: element.title,
                onClose: () => this.closeDialog(),
                onUpdate: () => this.updateTitle(),
                setTitle: (event: Event) => this.setTitle(event),
            },
        });
    }

    closeDialog(): void {
        this.dialogRef?.close();
        this.destroyDialogRef?.close();
    }

    destroyItem(): void {
        if (!this.id) {
            return;
        }

        this.apollo
            .mutate<destroyMut, destroyMutVariables>({
                mutation: DESTROY_CSV,
                variables: { id: this.id },
                update: (store, { data }) => {
                    const cached = store.readQuery<getAll>({
                        query: GET_ALL,
                    });

                    if (!cached) {
                        return;
                    }

                    if (!data?.destroyCsv) {
                        return;
                    }

                    const normalizedId = store.identify({
                        id: this.id,
                        __typename: 'CsvStorage',
                    });

                    store.evict({ id: normalizedId });
                    store.gc();

                    this.destroyDialogRef?.close();
                },
            })
            .subscribe();
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

        this.dialogRef?.close();
    }

    deleteRow(element: updateMut_updateCsv_item): void {
        if (!element.id) {
            return;
        }

        this.id = Number(element.id);

        this.destroyDialogRef = this.dialog.open(DeleteDialogComponent, {
            data: {
                title: element.title,
                onClose: () => this.closeDialog(),
                onDestroy: () => this.destroyItem(),
            },
        });
    }

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
