interface DirectorInterface {
  workFromeHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
};

class Director implements DirectorInterface {
  workFromeHome(): string {
    return "Working from home";
  }
  getCoffeeBreak(): string {
    return "Getting a coffee break";
  }
  workDirectorTasks(): string {
    return "Getting a director task";
  }
};


interface TeacherInterface {
  workFromeHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
};

class Teacher implements TeacherInterface {
  workFromeHome(): string {
    return "Cannot work from home";
  }
  getCoffeeBreak(): string {
    return "Cannot have a break";
  }
  workTeacherTasks(): string {
    return "Getting to work";
  }
};

function createEmployee(salary: string | number): Director | Teacher {
  let newSalary: number
  if (typeof salary === 'string') {
    newSalary = Number(salary.replace('$', ''));
  } else {
    newSalary = salary;
  }

  if (newSalary > 500) {
    return new Director();
  } else {
    return new Teacher();
  }
};

function isDirector(employee: Director | Teacher): employee is Director {
  return employee instanceof Director;
};

function executeWork(employee: Director | Teacher): string {
  if (isDirector(employee)) {
    return employee.workDirectorTasks();
  } else {
    return employee.workTeacherTasks();
  }
};

type Subjects = 'Math' | 'History';

function teachClass(todayClass: Subjects): string {
  return (`Teaching ${todayClass}`);
};