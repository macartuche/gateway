import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { Menu } from 'app/core/auth/menu.model';
import { INavData } from '@coreui/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosInicio } from 'app/shared/model/datos-inicio-response.model';
import SharedModule from 'app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule, ReactiveFormsModule],
})
export default class HomeComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    establecimiento: new FormControl('', Validators.required),
  });

  fechaActual?: Date;
  datosInicio?: DatosInicio | null = null;
  account: Account | null = null;
  menu: Menu[] = [];
  public navItems: INavData[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));

    this.spinner.show();
    this.fechaActual = new Date();
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

    this.spinner.hide();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
