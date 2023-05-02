import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss']
})
export class MovesListComponent {
  // @Input() title!: string;
  @Input() contact?: Contact;

  constructor(private userService: UserService) {}

  get moves() {
   
    return this.userService.getUserMoves(this.contact);

     
  }
}