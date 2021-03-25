import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxdate;
  constructor() {}

  ngOnInit(): void {
    this.maxdate = new Date();
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
