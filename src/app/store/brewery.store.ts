import {Brewery} from '../interface/brewery.interface';
import {patchState, signalStore, withHooks, withMethods, withProps, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {BreweryService} from '../service/brewery.service';
import {firstValueFrom} from 'rxjs';

type BreweryState = {
  breweries: Brewery[];
  isLoading: boolean;
}

const initialState: BreweryState = {
  breweries: [],
  isLoading: false,
}

export const BreweryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(({ breweries }) => ({
    breweriesCount: computed(() => breweries().length)
  })),
  withMethods((store, breweryService = inject(BreweryService)) => ({
    async getAll() {
      patchState(store, { isLoading: true });
      try {
        const breweries = await firstValueFrom(breweryService.getBreweries());
        patchState(store, { breweries });
      } catch (error) {
        console.error(error);
      } finally {
        patchState(store, { isLoading: false });
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.getAll();
    },
  })
);
