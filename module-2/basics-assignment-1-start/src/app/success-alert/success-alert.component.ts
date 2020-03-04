import { Component } from "@angular/core";

@Component({
    selector: 'app-success-alert',
    templateUrl: './success-alert.component.html',
    styles: [`
        .success {
            background-color: lightgreen;
            text-align: center;
            width: 20%;
        }
    `]
})
export class SuccessAlertComponent {

}