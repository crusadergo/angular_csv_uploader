import { Component } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { GET_ALL } from '../csvList/component';
import { MutVariables, Mut } from '../uploadForm/__generated__/mut';
import { getAll } from '../csvList/__generated__/getAll';

const ADD_CSV = gql`
    mutation Mut($title: String!, $file: Upload) {
        createCsv(input: { params: { title: $title, file: $file } }) {
            item {
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
            .mutate<Mut, MutVariables>({
                mutation: ADD_CSV,
                variables: {
                    title: this.title,
                    file: this.file,
                },
                update: (store, { data }) => {
                    const cached = store.readQuery<getAll>({
                        query: GET_ALL,
                    });

                    if (!cached) {
                        return;
                    }

                    if (!data?.createCsv) {
                        return;
                    }

                    const csvs = [data.createCsv.item, ...cached.csvs];

                    store.writeQuery<getAll>({
                        query: GET_ALL,
                        data: { ...cached, csvs },
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
