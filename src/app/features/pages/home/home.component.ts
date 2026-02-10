import { Component } from '@angular/core';
import { JoinTest } from "../../components/join-test/join-test";

@Component({
  selector: 'app-home',
  imports: [JoinTest],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
