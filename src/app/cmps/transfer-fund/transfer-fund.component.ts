import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent {

  @Input() contact!: any;
  @Input() maxCoins!: number;
  @Output() onTransferCoins: EventEmitter<any> = new EventEmitter();

  amount!: number ;

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.amount > this.maxCoins) return;
    const user: User | undefined = this.userService.getUser();
    if (user && user.coins !== undefined && user.coins >= this.amount) {
      this.userService.addMove(this.contact, this.amount).subscribe((updatedUser: User | boolean) => {
        if (updatedUser) {
          this.onTransferCoins.emit();
        }
      });
    }
  }

}