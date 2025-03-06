import { Component } from '@angular/core';
import {ListComponent} from '../list/list.component';

@Component({
  selector: 'app-main',
  imports: [
    ListComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
