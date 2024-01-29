import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@coreui/angular';
import SharedModule from 'app/shared/shared.module';

@Component({
  selector: 'jhi-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
  standalone: true,
  imports: [SharedModule, RouterOutlet],
})
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
