import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, exhaustMap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, password: string){
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8oxu16ui_b2u3WtA4J4rwREHA0DmGiwk', 
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }));
    }

    login(email: string, password: string){
        return this.http
            .post<AuthResponseData>(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8oxu16ui_b2u3WtA4J4rwREHA0DmGiwk",
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration: number){
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        },expirationDuration);
    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message){
            case 'EMAIL_EXISTS': 
                errorMessage = 'This email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password invalid!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'Your user is disabled';
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuth(email: string, userId:string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}