// 🌸 1️⃣ Calendar Functionality
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

    function generateCalendar() {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let calendarBody = document.getElementById("calendar-body");

        // Clear previous content
        calendarBody.innerHTML = "";

        let row = document.createElement("tr");

        // Fill empty cells for days before the 1st of the month
        for (let i = 0; i < firstDay; i++) {
            row.appendChild(document.createElement("td"));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            let cell = document.createElement("td");
            cell.textContent = day;

            // Highlight holidays
            if (malaysiaHolidays[dateString]) {
                cell.classList.add("holiday");
                cell.setAttribute("title", malaysiaHolidays[dateString]);
            }

            row.appendChild(cell);

            // Move to a new row every Sunday or at the end of the month
            if ((day + firstDay) % 7 === 0 || day === daysInMonth) {
                calendarBody.appendChild(row);
                row = document.createElement("tr");
            }
        }
    }

    generateCalendar();
});

// 🌸 2️⃣ Smooth Section Scrolling
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll('.content-section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    // Activate first section by default
    sections[0].classList.add('active');

    function switchToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections.forEach(sec => sec.classList.remove('active'));
            sections[index].classList.add('active');
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSectionIndex = index;
        }
    }

    // Navbar Click Event
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let targetId = this.getAttribute('href').substring(1);
            let targetIndex = Array.from(sections).findIndex(sec => sec.id === targetId);
            switchToSection(targetIndex);
        });
    });

    // Scroll Detection for Manual Scrolling
    window.addEventListener('wheel', function (event) {
        if (isScrolling) return;
        isScrolling = true;

        if (event.deltaY > 0) {
            // Scroll Down
            switchToSection(currentSectionIndex + 1);
        } else if (event.deltaY < 0) {
            // Scroll Up
            switchToSection(currentSectionIndex - 1);
        }

        setTimeout(() => (isScrolling = false), 800);
    });
});
