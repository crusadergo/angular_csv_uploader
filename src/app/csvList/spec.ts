import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvListComponent } from './component';

describe('CsvListComponent', () => {
    let component: CsvListComponent;
    let fixture: ComponentFixture<CsvListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CsvListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CsvListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
