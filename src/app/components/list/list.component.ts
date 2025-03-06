import {Component, inject} from '@angular/core';
import {BreweryCardComponent} from '../brewery-card/brewery-card.component';
import {BreweryStore} from '../../store/brewery.store';

@Component({
  selector: 'app-list',
  imports: [
    BreweryCardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  breweryStore = inject(BreweryStore);

  breweries = this.breweryStore.breweries;
}
