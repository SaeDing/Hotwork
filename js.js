class Calendar {
    constructor(year) {
        this.year = year;
    }

    getMonthDays(month) {
        return new Date(this.year, month + 1, 0).getDate();
    }

    getFirstDayOfMonth(month) {
        return new Date(this.year, month, 1).getDay();
    }
}

function createCalendar(year) {
    const calendarElement = document.getElementById("calendar");
    calendarElement.innerHTML = "";
    const calendar = new Calendar(year);
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

    for (let month = 0; month < 12; month++) {
        const monthElement = document.createElement("div");
        monthElement.className = "month";
        monthElement.textContent = months[month];
        calendarElement.appendChild(monthElement);

        const weekdaysElement = document.createElement("div");
        weekdaysElement.className = "weekdays";
        weekdays.forEach(weekday => {
            const weekdayElement = document.createElement("div");
            weekdayElement.className = "weekday";
            weekdayElement.textContent = weekday;
            weekdaysElement.appendChild(weekdayElement);
        });
        calendarElement.appendChild(weekdaysElement);

        const shift = (calendar.getFirstDayOfMonth(month) + 6) % 7;
        for (let i = 0; i < shift; i++) {
            const emptyDayElement = document.createElement("div");
            emptyDayElement.className = "day";
            calendarElement.appendChild(emptyDayElement);
        }

        const totalDays = calendar.getMonthDays(month);
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement("div");
            dayElement.className = "day";
            dayElement.textContent = day;

            if (Math.floor(((day - 1) + shift) / 7) % 2 === 0) {
                dayElement.classList.add("red");
            } else {
                dayElement.classList.add("blue");
            }

            calendarElement.appendChild(dayElement);
        }
    }
}

document.getElementById("switchColors").addEventListener("click", () => {
    const days = document.querySelectorAll(".day");
    days.forEach(day => {
        if (day.classList.contains("red")) {
            day.classList.remove("red");
            day.classList.add("blue");
        } else if (day.classList.contains("blue")) {
            day.classList.remove("blue");
            day.classList.add("red");
        }
    });
});

createCalendar(2023);
