import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../../features/courses/coursesSlice';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div>
      <table id="CourseList">
        <thead>
          {courses.length > 0 ? (
            <>
              <CourseListRow
                textFirstCell="Available courses"
                isHeader={true}
              />
              <CourseListRow
                textFirstCell="Course name"
                textSecondCell="Credit"
                isHeader={true}
              />
            </>
          ) : (
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
            />
          )}
        </thead>
        {courses.length > 0 && (
          <tbody>
            {courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
