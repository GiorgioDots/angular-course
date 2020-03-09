import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  status = ['Stable', 'Critical', 'Finished'];
  formData: FormGroup;

  ngOnInit() {
    this.formData = new FormGroup({
      'projectname': new FormControl(null, [Validators.required], this.forbiddenNameAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
    this.formData.statusChanges
      .subscribe((value) => {
        console.log(value);
      })
  }

  onSubmit() {
    console.log(this.formData);
  }

  forbiddenName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { 'projectNameIsForbidden': true }
    }
    else {
      return null;
    }
  }

  forbiddenNameAsync(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ 'projectNameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 500)
    });
  }
}
