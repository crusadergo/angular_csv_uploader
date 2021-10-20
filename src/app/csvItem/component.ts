import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'csv-item',
    templateUrl: 'template.html',
    styleUrls: ['style.sass'],
})
export class CsvItemComponent implements OnInit {
    @Input() csv_file: Record<string, string> = {};

    constructor() {}

    ngOnInit() {}
}
