import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/component';
import { UploadFormComponent } from './uploadForm/component';
import { CsvListComponent } from './csvList/component';
import { CsvItemComponent } from './csvItem/component';

@NgModule({
    declarations: [
        RootComponent,
        UploadFormComponent,
        CsvListComponent,
        CsvItemComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
