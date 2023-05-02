import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  user: User | undefined;
  user$: Observable<User[]> = this.userService.users$;

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('Loading users...');
    this.user = this.userService.getUser()
    console.log(this.user);
    
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onContacts() {
    this.router.navigate(['/contacts']);
  }
}
