import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const CREATE_CSV = gql`
    mutation csvCreate($title: String!, $file: Upload) {
        createCsv(input: { params: { title: $title, file: $file } }) {
            csvObject {
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

    setFile(files: FileList) {
        this.file = files.item(0);
    }

    setTitle(event: Event): void {
        this.title = (event.target as HTMLInputElement).value;
    }

    onUpload() {
        this.apollo
            .mutate({
                mutation: CREATE_CSV,
                variables: {
                    title: this.title,
                    file: this.file,
                },
            })
            .subscribe();
    }
}
