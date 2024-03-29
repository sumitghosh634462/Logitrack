import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  itemForm: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  passwordFieldType: string = 'password'; // Default to password type for toggling show password
  errorMessage: any;
  constructor(public router: Router, private formBuilder: FormBuilder, private httpService: HttpService, private authService: AuthService) {
    //form validators for login
    this.itemForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  //show password function
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  //Login function using httpService which accepts the form data  
  onLogin() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.httpService.Login(this.itemForm.value).subscribe((data: any) => {
        if (data.userNo != 0) {
          localStorage.setItem('role', data.role);
          this.authService.SetId(data.id);
          this.authService.SetRole(data.role);
          this.authService.saveToken(data.token);
          this.authService.setUsername(data.username)
          this.router.navigateByUrl('/dashboard');

          setTimeout(() => {
            window.location.reload();
          }, 1);  
        } else {
          this.showError = true;
          this.errorMessage = "Wrong User or Password";
        }
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "Invalid Username or Password. Please check and try again.";
        console.error('Login error:', error);
      });;
    }else {
      this.itemForm.markAllAsTouched();
    }
  }

}