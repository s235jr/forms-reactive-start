import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({
      'projectName': new FormControl('Default Project Name',
        [Validators.required, this.projectNameValidator],
        this.projectNameAsyncValidator),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  projectNameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'projectNameIsForbidden': true};
    } else {
      return null;
    }
  }

  projectNameAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test2') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

  // genders = ['male', 'female'];
  // signForm: FormGroup;
  // forbiddenUsername = ['Chris', 'Anna'];
  //
  // ngOnInit(): void {
  //   this.signForm = new FormGroup({
  //     'userData': new FormGroup({
  //       'username': new FormControl('Username', [Validators.required, this.forbiddenNameValidator.bind(this)]),
  //       'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails]),
  //     }),
  //     'gender': new FormControl('male'),
  //     'hobbies': new FormArray([])
  //   });
  //   // this.signForm.valueChanges.subscribe(
  //   //   (value => {
  //   //     console.log(value);
  //   //   })
  //   // );
  //   this.signForm.statusChanges.subscribe(
  //     (status => {
  //       console.log(status);
  //     })
  //   );
  //   this.signForm.setValue({
  //     'userData': {
  //       'username': 'Max',
  //       'email': 'test@test.com'
  //     },
  //     'gender': 'male',
  //     'hobbies': []
  //   });
  //   this.signForm.patchValue({
  //     'userData': {
  //       'username': 'Anna'
  //     }
  //   });
  // }
  //
  // onSubmit() {
  //   console.log(this.signForm);
  //   this.signForm.reset();
  // }
  //
  // onAddHobby() {
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray>this.signForm.get('hobbies')).push(control);
  // }
  //
  // getControls() {
  //   return (<FormArray>this.signForm.get('hobbies')).controls;
  // }
  //
  // forbiddenNameValidator(control: FormControl): { [s: string]: boolean } {
  //   if (this.forbiddenUsername.indexOf(control.value) !== -1) {
  //     return {'nameIsForbidden': true};
  //   }
  //   return null;
  // }
  //
  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.pl') {
  //         resolve({'emailIsForbidden': true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //   });
  //   return promise;
  // }

}
