import {Component, input} from '@angular/core';
import {Brewery} from '../../interface/brewery.interface';

@Component({
  selector: 'app-brewery-card',
  imports: [],
  templateUrl: './brewery-card.component.html',
  styleUrl: './brewery-card.component.scss'
})
export class BreweryCardComponent {
  data = input<Brewery>();
}
