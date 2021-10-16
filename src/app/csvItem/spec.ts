import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvItemComponent } from './component';

describe('CsvItemComponent', () => {
    let component: CsvItemComponent;
    let fixture: ComponentFixture<CsvItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CsvItemComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CsvItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
