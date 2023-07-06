import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import emailjs from '@emailjs/browser';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{
  constructor(private toast: NgToastService) {}

  public options = [
    { name: 'Parent/Guardian/Carer', value: 'parent'},
    { name: 'School', value: 'school'},
    { name: 'Professional Organisation', value: 'organisation'},
    { name: 'Other', value: 'other'}
  ]

  public submitted = false;

  public profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required ,Validators.email]),
    phoneNum: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    typeParent: new FormControl(false),
    typeSchool: new FormControl(false),
    typeOrg: new FormControl(false),
    typeOther: new FormControl(false),
  });

  get typeParent() {
    return this.profileForm.value.typeParent
  }

  get typeSchool() {
    return this.profileForm.value.typeSchool
  }

  get typeOrg() {
    return this.profileForm.value.typeOrg
  }

  get typeOther() {
    return this.profileForm.value.typeOther
  }

  public checkboxValid() {
  const booleans = [this.typeParent, this.typeSchool, this.typeOrg, this.typeOther];
    return booleans.filter((bool) => bool === true).length === 1;
  }

  private getCheckboxDesc() {
    const booleans = [this.typeParent, this.typeSchool, this.typeOrg, this.typeOther];
    const index = booleans.findIndex((bool) => bool === true)
    return this.options[index].name
  }

  get formValid() {
    return this.profileForm.valid && this.checkboxValid()
  }

  public submitForm() {
    if (this.profileForm.valid && this.checkboxValid()) {
      this.submitted = true;
      emailjs.send('service_v3t8qfn', 'template_ti9m9n7', {
        firstname: this.profileForm.value.firstName,
        surname: this.profileForm.value.surname,
        email: this.profileForm.value.email,
        phoneNum: this.profileForm.value.phoneNum,
        content: this.profileForm.value.content,
        type: this.getCheckboxDesc()
      }, 'cyi9BS9zA9CZXuomt')
        .then(() => {
          this.submitted = false;
          this.toast.success({
            detail: 'Successfully Sent',
            summary: 'Thanks for getting in touch, I will reply as soon as possible.',
            sticky: true
          })
        })
        .catch(() => {
          this.submitted = false;
          this.toast.error({
            detail: 'Oops, error',
            summary: 'Your request wasn\'t send, please try again.',
            sticky: true
          })
        })
        .finally(() => {
          this.profileForm.reset()
        })
    }
  }
}
