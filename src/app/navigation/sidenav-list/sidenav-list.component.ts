import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onClose() {
    this.closeSidenav.emit();
  }
  onLogout() {
    this.authService.logout();
  }
}
