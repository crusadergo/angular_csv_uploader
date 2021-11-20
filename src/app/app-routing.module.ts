import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvListComponent } from './csvList/component';
import { SignInComponent } from './signIn/component';
import { SignupComponent } from './signup/component';

const routes: Routes = [
    {
        path: '',
        component: CsvListComponent,
        pathMatch: 'full',
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
    },
    {
        path: 'signin',
        component: SignInComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
