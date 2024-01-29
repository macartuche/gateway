import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { INavData } from '@coreui/angular';
import { Menu } from 'app/core/auth/menu.model';
import SharedModule from 'app/shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { DefaultFooterComponent } from './default-footer/default-footer.component';

@Component({
  standalone: true,
  selector: 'jhi-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],

  imports: [SharedModule, RouterOutlet, DefaultHeaderComponent, DefaultFooterComponent],
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: INavData[] = [];

  menu: Menu[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.navItems.push({
      name: 'Home',
      url: '/',
      icon: 'fas fa-house',
    });

    this.accountService.identity().subscribe(account => {
      if (account) {
        this.menu = account.menu;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.menu === null) {
          this.menu = [];
        }
        this.menu.forEach(m => {
          const padre: INavData = {
            name: m.nombre,
            icon: m.icono,
            children: [],
          };
          m.hijos.forEach((h: any) => {
            padre.children?.push({
              name: h.nombre,
              icon: h.icono,
              url: h.url,
              linkProps: {
                routerLinkActiveOptions: {
                  exact: true,
                },
              },
            });
          });
          this.navItems.push(padre);
        });
      }
    });
  }
}
