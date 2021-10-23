import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export const GET_ALL = gql`
    query getAll {
        csvs {
            title
            file
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
                query: GET_ALL,
            })
            .valueChanges.subscribe((result: any) => {
                // TODO: Add types
                this.csv_files = result?.data?.csvs;
            });
    }
}
