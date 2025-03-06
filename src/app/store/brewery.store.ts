import {Brewery} from '../interface/brewery.interface';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {BreweryService} from '../service/brewery.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {distinctUntilChanged, pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';

type BreweryState = {
  breweries: Brewery[];
  isLoading: boolean;
}

const initialState: BreweryState = {
  breweries: [],
  isLoading: false,
}

export const BreweryStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({ breweries }) => ({
    breweriesCount: computed(() => breweries.length),
  })),
  withMethods((store, breweryService = inject(BreweryService)) => ({
    getAll: rxMethod(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, {isLoading: true})),
        switchMap(() => breweryService.getBreweries().pipe(
          tapResponse({
            next: (breweries) => patchState(store, { breweries }),
            error: console.error,
            finalize: () => patchState(store, {isLoading: false}),
          })
        )),
      )
    )
  }))
)
