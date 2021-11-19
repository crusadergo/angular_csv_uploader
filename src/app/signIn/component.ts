import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import {SignInUser_signinUser_user ,SignInUserVariables} from './__generated__/SignInUser'

const SIGN_IN = gql`
    mutation SignInUser($login: String!, $password: String!) {
        signinUser(input: { params: { login: $login, password: $password } }) {
            token
            user {
                login
                id
            }
        }
    }
`;

@Component({
    selector: 'signin-form',
    templateUrl: 'template.html',
    styleUrls: ['styles.sass'],
})
export class SignInComponent {
    constructor(private apollo: Apollo) {}

    login: string = '';
    password: string = '';
    token: string = '';
    userForm!: FormGroup;

    ngOnInit(): void {
        this.userForm = new FormGroup({
            loginField: new FormControl(this.login, [
                Validators.required,
                Validators.minLength(2),
            ]),
            passwordField: new FormControl(this.password, [
                Validators.required,
                Validators.minLength(4),
            ]),
        });
    }

    get loginField() {
        return this.userForm.get('loginField');
    }

    get passwordField() {
        return this.userForm.get('passwordField');
    }

    setLogin(event: Event): void {
        this.login = (event.target as HTMLInputElement).value;
    }
    setPassword(event: Event): void {
        this.password = (event.target as HTMLInputElement).value;
    }

    onClick(): void {
        this.apollo
            .mutate<SignInUser_signinUser_user, SignInUserVariables>({
                mutation: SIGN_IN,
                variables: {
                    login: this.login,
                    password: this.password,
                },
                update: (store, { data }) => {
                    console.log(store, data);
                },
            })
            .subscribe((data) => {
                console.log(data);
            });
    }
}
