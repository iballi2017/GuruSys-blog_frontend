import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Roles } from '../../models/enums/roles';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit, AfterContentChecked {
  isEditor: boolean | undefined;
  constructor(public _authSvc: AuthService) {
    console.log('public: ', this._authSvc.isLoggedIn());
  }

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    this.isEditor = this._authSvc.isUserEditor(Roles.Editor);
  }
}
