interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: "Pierre",
    lastName: "Cailloux",
    age: 30,
    location: "RockCity"
}

const student2: Student = {
    firstName: "Fleur",
    lastName: "Deschamps",
    age: 30,
    location: "FlowerTown"
}

const studentsList: Student[] =[student1, student2];

function renderTable(): void {
    const body = document.body;
    const table = document.createElement('table');
    const headerRow = table.insertRow();

    const firstNameHeader = headerRow.insertCell(0);
    firstNameHeader.textContent = "First Name";
    const locationHeader = headerRow.insertCell(1);
    locationHeader.textContent = "Location";

    studentsList.forEach((student) => {
        const row = table.insertRow();
        const firstNameCell = row.insertCell(0);
        firstNameCell.textContent = student.firstName;
        const locationCell = row.insertCell(1);
        locationCell.textContent = student.location;
    });

    body.appendChild(table);
}

renderTable();