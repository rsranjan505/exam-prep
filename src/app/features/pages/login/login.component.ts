import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // DEMO: Validate with dummy credentials
    if (this.email === 'student@example.com' && this.password === '123456') {
      alert('Login Successful!');
      // Redirect to student dashboard/home page
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials!');
    }
  }
}
