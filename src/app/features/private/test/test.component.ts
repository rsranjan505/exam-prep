import { Component, OnDestroy, OnInit } from '@angular/core';
import { TakeTestComponent } from '../../components/take-test/take-test.component';

@Component({
  selector: 'app-test',
  imports: [TakeTestComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent  {

}
