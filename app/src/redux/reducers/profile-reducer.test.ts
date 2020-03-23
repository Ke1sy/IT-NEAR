import React from 'react';
import profileReducer, {addPostText} from './profile-reducer';

let state = {
  posts: [
    {id: 1, text: 'Hi, how are you?', likesCount: 12},
    {id: 2, text: 'It is my first post', likesCount: 11},
    {id: 3, text: 'Blabla', likesCount: 11},
    {id: 4, text: 'Dada', likesCount: 11}
  ],
  profile: null,
  status: null
};

it('new post is added', () => {
  //1. test data
  let action = addPostText('text 2');
  //2. action
  let newState = profileReducer(state, action);

  //3. expectations
  expect(newState.posts.length).toBe(5);

});

it('check message', () => {
  //1. test data
  let action = addPostText('text 2');
  //2. action
  let newState = profileReducer(state, action);

  //3. expectations
  expect(newState.posts[4].text).toBe('text 2');
});

it('check likes count', () => {
  //1. test data
  let action = addPostText('text 2');
  //2. action
  let newState = profileReducer(state, action);

  //3. expectations
  expect(newState.posts[4].likesCount).toBe(0);
});