import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_ALL } from '../csvList/component';
import { MutVariables, Mut } from '../uploadForm/__generated__/mut';
import { getAll } from '../csvList/__generated__/getAll';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileValidators } from 'ngx-file-drag-drop';

const ADD_CSV = gql`
    mutation Mut($title: String!, $file: Upload!) {
        createCsv(input: { params: { title: $title, file: $file } }) {
            item {
                id
                title
                filename
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

    ngOnInit(): void {
        this.csvForm = new FormGroup({
            titleField: new FormControl(this.title, [
                Validators.required,
                Validators.minLength(2),
            ]),
            fileField: new FormControl(this.file, [Validators.required]),
        });
    }

    get titleField() {
        return this.csvForm.get('titleField');
    }

    get fileField() {
        return this.csvForm.get('fileField');
    }

    file: File | null = null;
    title: string = '';
    csvForm!: FormGroup;
    showTitleError: Boolean = false;
    showFileError: Boolean = false;

    setFile(files: File[] | null) {
        if (!files) {
            this.csvForm.patchValue({ file: null });

            return;
        }

        if (!(files[0] instanceof File)) {
            this.csvForm.patchValue({ file: null });

            return;
        }

        let file_type: string = files[0].type;

        if (!(file_type == 'csv' || file_type == 'text/csv')) {
            this.csvForm.patchValue({ file: null });

            return;
        }

        this.title = files[0].name;
        this.file = files[0];
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
            .subscribe((data) => {
                this.csvForm.reset({ title: '', file: null });
            });
    }
}
