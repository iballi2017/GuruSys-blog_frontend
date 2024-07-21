import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AddressBook } from './address-book.model';
import { AddressBookActions } from './address-book.actions';

export const addressBooksFeatureKey = 'addressBooks';

export interface State extends EntityState<AddressBook> {
  // additional entities state properties
  addressBook: any[];
  isLoading: boolean;
  isSubmitAddress: boolean;
}

export const adapter: EntityAdapter<AddressBook> =
  createEntityAdapter<AddressBook>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  addressBook: [],
  isLoading: false,
  isSubmitAddress: false,
});

export const reducer = createReducer(
  initialState,
  /**LOAD ADDRESS BOOKLIST */
  on(AddressBookActions.loadAddressBook, (state, action) =>
    {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(AddressBookActions.loadAddressBookSuccess, (state, action) =>
    adapter.setAll(action.addressBookSuccess, state)
  ),
  on(AddressBookActions.loadAddressBookSuccess, (state, action) =>
    {
      return {
        ...state,
        isLoading: false,
      };
    }
  ),
  on(AddressBookActions.loadAddressBookFailure, (state, action) =>
    {
      return {
        ...state,
        error: action?.error,
        isLoading: false,
      };
    }
  ),
  /** */
  /**ADD ADDRESS BOOK */
  on(AddressBookActions.addAddress, (state, action) =>
    adapter.addOne(action.address, state)
  ),
  on(AddressBookActions.addAddressSuccess, (state, action) =>
    adapter.addOne(action.addressSuccess, state)
  ),
  on(AddressBookActions.addAddressFailure, (state, action) =>
    adapter.addOne(action.addressFailure, state)
  ),
  /** */
  on(AddressBookActions.upsertAddressBook, (state, action) =>
    adapter.upsertOne(action.addressBook, state)
  ),
  on(AddressBookActions.addAddressBooks, (state, action) =>
    adapter.addMany(action.addressBooks, state)
  ),
  on(AddressBookActions.upsertAddressBooks, (state, action) =>
    adapter.upsertMany(action.addressBooks, state)
  ),
  on(AddressBookActions.updateAddressBook, (state, action) =>
    adapter.updateOne(action.addressBook, state)
  ),
  on(AddressBookActions.updateAddressBooks, (state, action) =>
    adapter.updateMany(action.addressBooks, state)
  ),
  on(AddressBookActions.deleteAddressBook, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(AddressBookActions.deleteAddressBooks, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(AddressBookActions.clearAddressBooks, (state) => adapter.removeAll(state))
);

export const addressBooksFeature = createFeature({
  name: addressBooksFeatureKey,
  reducer,
  extraSelectors: ({ selectAddressBooksState }) => ({
    ...adapter.getSelectors(selectAddressBooksState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  addressBooksFeature;
