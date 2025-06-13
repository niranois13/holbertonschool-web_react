import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';
import axios from 'axios';

const initialState = {
  courses: [],
};

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    try {
      const response = await axios.get(ENDPOINTS.courses);
      return response.data.courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectCourse: (state, action) => {
      const course = state.courses.find(course => course.id === action.payload);
      if (course) {
        course.isSelected = true;
      }
    },
    unSelectCourse: (state, action) => {
      const course = state.courses.find(course => course.id === action.payload);
      if (course) {
        course.isSelected = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload.map(course => ({
          ...course,
          isSelected: false,
        }));
      })
      .addCase(logout.type, () => initialState);
  },
});

export const { selectCourse, unSelectCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
