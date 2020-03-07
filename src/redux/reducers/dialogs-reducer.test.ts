import React from 'react';
import dialogsReducer, {setActivityDate} from './dialogs-reducer';

let state = {
  dialogs: [
    {
      id: 6138,
      userName: 'ReactDeveloper',
      hasNewMessages: true,
      lastDialogActivityDate: '2020-03-04T19:26:32.39',
      lastUserActivityDate: '2020-03-05T08:16:50.663',
      newMessagesCount: 6,
      photos: {
        small: null,
        large: null
      }
    },
    {
      id: 6234,
      userName: 'brajke',
      hasNewMessages: false,
      lastDialogActivityDate: '2020-03-04T19:04:41.423',
      lastUserActivityDate: '2020-03-03T16:55:32.84',
      newMessagesCount: 0,
      photos: {
        small: null,
        large: null
      }
    },
    ],
  messages: [],
  newMessagesCount: null ,
  lastUserActivityDate: null ,
  deletedMessages: [] ,
  spamedMessages: [],
};

it('correct activity date is returned', () => {
  //1. test data
  let type = setActivityDate(6138);
  //2. action
  let newState = dialogsReducer(state, type);
  //3. expectations
  expect(newState.lastUserActivityDate).toBe('2020-03-05T08:16:50.663');
});
