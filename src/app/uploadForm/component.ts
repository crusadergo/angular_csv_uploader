import { Component } from '@angular/core';

@Component({
    selector: 'upload-form',
    templateUrl: './template.html',
    styleUrls: ['./style.sass'],
})
export class UploadFormComponent {
    fileToUpload: File | null = null;

    handleFile(files: FileList) {
        this.fileToUpload = files.item(0);
    }
}
