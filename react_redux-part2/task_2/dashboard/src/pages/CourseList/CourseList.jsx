import { StyleSheet, css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';
import { selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';

const styles = StyleSheet.create({
  courses: {
    margin: '130px auto',
    width: '90%',
    height: '33vh',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '2px solid rgb(161, 161, 161)',
  },
  thtd: {
    border: '2px solid rgb(161, 161, 161)',
  },
});

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
    <div className={css(styles.courses)}>
      <table id="CourseList" className={css(styles.table)}>
        <thead>
          {courses.length > 0 ? (
            <>
              <CourseListRow
                textFirstCell="Available courses"
                isHeader={true}
                style={styles.thtd}
              />
              <CourseListRow
                textFirstCell="Course name"
                textSecondCell="Credit"
                isHeader={true}
                style={styles.thtd}
              />
            </>
          ) : (
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
              style={styles.thtd}
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
                style={styles.thtd}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
