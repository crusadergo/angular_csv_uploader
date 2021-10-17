import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
    selector: 'csv-list',
    templateUrl: 'template.html',
    styleUrls: ['style.sass'],
})
export class CsvListComponent implements OnInit {
    loading = true;
    testField = '';

    constructor(private apollo: Apollo) {}

    ngOnInit() {
        this.apollo
            .watchQuery({
                query: gql`
                    {
                        testField
                    }
                `,
            })
            .valueChanges.subscribe((result: any) => {
                this.testField = result?.data?.testField;
            });
    }
}
