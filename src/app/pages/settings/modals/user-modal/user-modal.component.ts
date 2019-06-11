import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/IUser.interface';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit() { }

  hideModal() {
    document.getElementById('user-modal').classList.add('is-hidden');
  }

}
