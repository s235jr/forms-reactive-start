import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signForm: FormGroup;

  ngOnInit(): void {
    this.signForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('Username', Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signForm.get('hobbies')).controls;
  }
}
