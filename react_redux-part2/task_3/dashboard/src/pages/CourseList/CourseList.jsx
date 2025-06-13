import { useSelector, useDispatch } from 'react-redux';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';
import { selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';
import './CourseList.css';

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  const onChangeRow = (id, checked) => {
    if (checked) {
      dispatch(selectCourse(id));
    } else {
      dispatch(unSelectCourse(id));
    }
  };

  return (
    <div className="course-list-container">
      <table id="CourseList" className="course-table">
        <thead>
          {courses.length > 0 ? (
            <>
              <CourseListRow
                textFirstCell="Available courses"
                isHeader={true}
                style={{ className: 'course-thtd' }}
              />
              <CourseListRow
                textFirstCell="Course name"
                textSecondCell="Credit"
                isHeader={true}
                style={{ className: 'course-thtd' }}
              />
            </>
          ) : (
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
              style={{ className: 'course-thtd' }}
            />
          )}
        </thead>
        {courses.length > 0 && (
          <tbody>
            {courses.map((course) => (
              <CourseListRow
                key={course.id}
                id={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isChecked={course.isSelected}
                onChange={onChangeRow}
                style={{ className: 'course-thtd' }}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
