import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { getAll } from '../csvList/__generated__/getAll';

export const GET_ALL = gql`
    query getAll {
        csvs {
            title
            filename
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
    displayedColumns: string[] = ['title', 'filename'];

    constructor(private apollo: Apollo) {}

    ngOnInit() {
        this.apollo
            .watchQuery({
                query: GET_ALL,
            })
            .valueChanges.subscribe((result: any) => {
                // TODO: Add types
                this.csv_files = result?.data?.csvs;
                console.log(this.csv_files);
            });
    }
}
