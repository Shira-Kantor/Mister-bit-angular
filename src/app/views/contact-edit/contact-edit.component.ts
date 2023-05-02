import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  contact = this.contactService.getEmptyContact() as Contact
  subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.route.data
      .pipe(
        map(data => data['contact']),
        filter(contact => contact)
      )
      .subscribe(contact => this.contact = contact)

  }
  onSaveContact() {
    this.contactService.saveContact(this.contact)
      .subscribe({
        next: () => this.location.back(),
        error: err => console.log('err', err)

      })
      console.log(this.contact); 
  }
  
  onBack(){
    this.router.navigate(['/contacts']);
  }
  

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
}
}
