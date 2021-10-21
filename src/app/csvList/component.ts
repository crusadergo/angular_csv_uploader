import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export const CSV_FILES = gql`
    {
        csvList {
            title
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
    csv_files: Array<Record<string, string>> = [];

    constructor(private apollo: Apollo) {}

    ngOnInit() {
        this.apollo
            .watchQuery({
                query: CSV_FILES,
            })
            .valueChanges.subscribe((result: any) => {
                this.csv_files = result?.data?.csvList;
            });
    }
}
