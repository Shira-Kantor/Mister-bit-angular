import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  userName: string = '';

  constructor(private userService: UserService, private router: Router) { }

  signup(ev: Event) {
    this.userService.signup(this.userName)
      .subscribe(savedUser => {
        this.router.navigateByUrl('/home');
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  handleChange(event: any) {
    const field = event.target.name;
    let value = event.target.value;
    switch (event.target.type) {
      case 'number':
      case 'range':
        value = +value;
        break;
      case 'checkbox':
        value = event.target.checked;
        break;
    }
    this.userName = value;
  }
}
