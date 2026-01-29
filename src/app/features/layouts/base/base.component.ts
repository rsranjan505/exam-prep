import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent {}
