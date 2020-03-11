import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError(){
        this.error = null;
    }

    onSubmit(form: NgForm){
        if(form.invalid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }else{
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            response => {
                // console.log(response);
                this.error = null;
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;//useless now
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string){
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear()

        const component = hostViewContainerRef.createComponent(alertCmpFactory);

        component.instance.message = message;
        this.closeSub = component.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }
}