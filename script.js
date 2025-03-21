document.addEventListener("DOMContentLoaded", function () {
    const malaysiaHolidays = {
        "2025-01-01": "New Year",
        "2025-02-01": "Federal Territory Day",
        "2025-02-10": "Chinese New Year",
        "2025-02-11": "Chinese New Year Holiday",
        "2025-05-01": "Labour Day",
        "2025-05-17": "Hari Raya Aidilfitri",
        "2025-05-18": "Hari Raya Aidilfitri Holiday",
        "2025-12-25": "Christmas",
    };

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let calendarBody = document.getElementById("calendar-body");

    let row = document.createElement("tr");
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        let cell = document.createElement("td");
        cell.textContent = day;

        if (malaysiaHolidays[dateString]) {
            cell.classList.add("holiday");
            cell.title = malaysiaHolidays[dateString];
        }

        row.appendChild(cell);
        if ((day + firstDay) % 7 === 0 || day === daysInMonth) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }
});
