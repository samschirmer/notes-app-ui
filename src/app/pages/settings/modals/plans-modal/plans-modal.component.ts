import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularTokenService } from 'angular-token';
import { IPlan } from 'src/app/models/IPlan.interface';

@Component({
  selector: 'app-plans-modal',
  templateUrl: './plans-modal.component.html',
  styleUrls: ['./plans-modal.component.css']
})
export class PlansModalComponent implements OnInit {
  @Input() plan: IPlan;
  @Input() account: number;

  constructor(
    private api: ApiService,
    private tokenService: AngularTokenService
  ) { }

  ngOnInit() {
    this.plan = {} as IPlan;
  }

  hideModal() {
    document.getElementById('plan-modal').classList.remove('is-active');
  }

}
