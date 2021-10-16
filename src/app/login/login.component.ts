import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    employeeId: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.login(this.loginForm.value.employeeId, this.loginForm.value.password);
  }
}
