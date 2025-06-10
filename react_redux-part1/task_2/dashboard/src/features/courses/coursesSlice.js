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
)

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: (builder) => {
      builder
        .addCase(fetchCourses.fulfilled, (state, action) =>{
          state.courses = action.payload;
        })
        .addCase(logout.type, () => initialState);
    }
})

export default coursesSlice.reducer;
