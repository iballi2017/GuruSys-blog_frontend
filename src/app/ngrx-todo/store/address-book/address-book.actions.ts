import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { AddressBook } from './address-book.model';

export const AddressBookActions = createActionGroup({
  source: 'AddressBook/API',
  events: {
    /**LOAD ADDRESS BOOKLIST */
    'Load AddressBooks': props<{ addressBooks: AddressBook[] }>(),
    'Load AddressBooksSuccess': props<{ addressBooksSuccess: AddressBook[] }>(),
    'Load AddressBooksFailure': props<{ addressBooksFailure: AddressBook[] }>(),
    /** */
    /**ADD ADDRESS */
    'Add Address': props<{ address: AddressBook }>(),
    'Add Address Success': props<{ addressSuccess: AddressBook }>(),
    'Add Address Failure': props<{ addressFailure: AddressBook }>(),
    /** */
    'Upsert AddressBook': props<{ addressBook: AddressBook }>(),
    'Add AddressBooks': props<{ addressBooks: AddressBook[] }>(),
    'Upsert AddressBooks': props<{ addressBooks: AddressBook[] }>(),
    'Update AddressBook': props<{ addressBook: Update<AddressBook> }>(),
    'Update AddressBooks': props<{ addressBooks: Update<AddressBook>[] }>(),
    'Delete AddressBook': props<{ id: string }>(),
    'Delete AddressBooks': props<{ ids: string[] }>(),
    'Clear AddressBooks': emptyProps(),
  },
});
