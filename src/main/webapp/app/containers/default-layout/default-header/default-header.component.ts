import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { LoginService } from 'app/login/login.service';
import SharedModule from 'app/shared/shared.module';

@Component({
  selector: 'jhi-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [SharedModule, RouterOutlet, RouterModule],
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(
    private classToggler: ClassToggleService,
    private loginService: LoginService,
    private router: Router,
  ) {
    super();
  }

  logout(): void {
    // this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
