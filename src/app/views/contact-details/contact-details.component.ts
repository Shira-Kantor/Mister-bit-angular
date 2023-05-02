import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.contactService.getContactById(id).subscribe(contact => {
       
        this.contact = contact;
      });
    }
  }
  onBack() {
    this.router.navigate(['/contacts']);
  }
  onPrev(){

  }
  onNext(){
    // next: () => this.location.back(),
  }
}
