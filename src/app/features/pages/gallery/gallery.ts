import { Component } from '@angular/core';
import { JoinTest } from "../../components/join-test/join-test";

@Component({
  selector: 'app-gallery',
  imports: [JoinTest],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {

  activeFilter = 'all';
}
