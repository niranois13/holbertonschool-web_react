import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

const ENDPOINTS = {
  courses: 'http://localhost:5173/courses.json',
};

const mockData = [
  { "id": 1, "name": "ES6", "credit": 60 },
  { "id": 2, "name": "Webpack", "credit": 20 },
  { "id": 3, "name": "React", "credit": 40 },
];

const prevState = {
  courses: [{ id: 1, name: 'ES6', credit: 60}],
};

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
})

afterEach(() => {
  mock.restore();
})

describe('courseSlice', () => {
  it('should return the initial state by default', () => {
    expect(
      coursesReducer(undefined, { type: undefined })).toEqual({ courses: [] }
      );
  });

  it('should fetch courses data and update the state', async () => {
    const mockCourses = mockData;
    mock.onGet(ENDPOINTS.courses).reply(200, { courses: mockCourses });

    const store = configureStore({ reducer: { courses: coursesReducer }});
    await store.dispatch(fetchCourses());

    const state = store.getState().courses;
    expect(state.courses).toEqual(mockCourses);
  });

  it('should reset courses array to empty on logout', () => {
    const nextState = coursesReducer(prevState, logout());
    expect(nextState.courses).toEqual([]);
  });
})
