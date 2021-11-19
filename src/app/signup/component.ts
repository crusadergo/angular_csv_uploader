import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { userMut, userMutVariables } from './__generated__/userMut';

const CREATE_USER = gql`
    mutation createUser($login: String!, $password: String!) {
        createUser(input: { params: { login: $login, password: $password } }) {
            user {
                id
                login
            }
            token
        }
    }
`;
@Component({
    selector: 'signup-component',
    templateUrl: 'template.html',
    styleUrls: ['styles.sass'],
})
export class SignupComponent {
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
            .mutate<userMut, userMutVariables>({
                mutation: CREATE_USER,
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
