import { Component } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { CSV_FILES } from '../csvList/component';

const CREATE_CSV = gql`
    mutation createCsv($title: String!, $file: Upload) {
        createCsv(input: { params: { title: $title, file: $file } }) {
            csvObject {
                title
                file
            }
        }
    }
`;

type csv = {
    title: String;
};

type Response = {
    csv: csv;
};

type Variables = {
    title: string;
    file: File | null;
};

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
            .mutate<Response, Variables>({
                mutation: CREATE_CSV,
                variables: {
                    title: this.title,
                    file: this.file,
                },
                update: (store, { data: createCsv }) => {
                    const data: any = store.readQuery({ query: CSV_FILES });
                    console.log(data.csvList);
                },
            })
            .subscribe();
    }
}
