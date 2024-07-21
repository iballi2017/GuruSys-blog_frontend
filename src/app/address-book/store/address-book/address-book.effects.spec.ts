import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AddressBookEffects } from './address-book.effects';

describe('AddressBookEffects', () => {
  let actions$: Observable<any>;
  let effects: AddressBookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressBookEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AddressBookEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
