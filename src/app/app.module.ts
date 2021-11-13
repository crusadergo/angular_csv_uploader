import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/component';
import { UploadFormComponent } from './uploadForm/component';
import { CsvListComponent } from './csvList/component';
import { CsvItemComponent } from './csvItem/component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [
        RootComponent,
        UploadFormComponent,
        CsvListComponent,
        CsvItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GraphQLModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatInputModule,
        NgxFileDragDropModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
