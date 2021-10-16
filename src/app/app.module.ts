import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/component';
import { UploadFormComponent } from './uploadForm/component';

@NgModule({
    declarations: [RootComponent, UploadFormComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
