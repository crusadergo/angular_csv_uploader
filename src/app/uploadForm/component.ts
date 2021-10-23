import { Component } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { GET_ALL } from '../csvList/component';
import {
    new_csv_create_createdCsv,
    new_csvVariables,
    new_csv_create,
    new_csv,
} from '../uploadForm/__generated__/new_csv';
import { getAll } from '../csvList/__generated__/getAll';

const NEW_CSV = gql`
    mutation new_csv($title: String!, $file: Upload) {
        create(input: { params: { title: $title, file: $file } }) {
            createdCsv {
                title
                file
            }
        }
    }
`;

@Component({
    selector: 'upload-form',
    templateUrl: './template.html',
    styleUrls: ['./style.sass'],
})
export class UploadFormComponent {
    constructor(private apollo: Apollo) {}

    file: File | null = null;
    title: string = '';

    setFile(target: EventTarget | null) {
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        if (!target.files) {
            return;
        }

        this.file = target.files.item(0);
    }

    setTitle(event: Event): void {
        this.title = (event.target as HTMLInputElement).value;
    }

    onUpload() {
        this.apollo
            .mutate<new_csv, new_csvVariables>({
                mutation: NEW_CSV,
                variables: {
                    title: this.title,
                    file: this.file,
                },
                update: (store, { data: upload }) => {
                    const data = store.readQuery<getAll>({
                        query: GET_ALL,
                    });

                    if (!data) {
                        return;
                    }

                    if (!upload?.create) {
                        return;
                    }

                    const csvs = [upload.create.createdCsv, ...data.csvs];

                    store.writeQuery<getAll>({
                        query: GET_ALL,
                        data: { ...data, csvs },
                    });
                },
            })
            .subscribe(
                ({ data }) => {
                    console.log('got data', data);
                },
                (error) => {
                    console.log('there was an error sending the query', error);
                }
            );
    }
}
