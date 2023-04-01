class Calendar {
    constructor(year) {
      this.year = year;
    }
  
    getMonthDays(month) {
      return new Date(this.year, month + 1, 0).getDate();
    }
  
    getFirstDayOfMonth(month) {
      const firstDay = new Date(this.year, month, 1).getDay();
      return firstDay === 0 ? 7 : firstDay;
    }
  
    getWeekNumber(date) {
      const yearStart = new Date(this.year, 0, 1);
      const weekNumber = Math.ceil(((date - yearStart) / 86400000 + yearStart.getDay() + 1) / 7);
      return weekNumber;
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
  
      const shift = calendar.getFirstDayOfMonth(month) - 1;
      const totalDays = calendar.getMonthDays(month);
  
      let weekCount = 1;
      let lastWeekday = 0;
      let weekElement;
  
      for (let day = 1; day <= totalDays; day++) {
        if (lastWeekday === 6 || lastWeekday === 0) {
          weekElement = document.createElement("div");
          weekElement.className = "week";
          calendarElement.appendChild(weekElement);
          lastWeekday = 0;
          weekCount++;
        }
        const dayElement = document.createElement("div");
        dayElement.className = "day";
        dayElement.textContent = day;
  
        const weekday = (shift + day - 1) % 7;
        if (weekday === 5 || weekday === 6) {
          dayElement.classList.add("red");
        } else {
          dayElement.classList.add("blue");
        }
  
        const weekNumber = calendar.getWeekNumber(new Date(year, month, day));
        dayElement.setAttribute("data-week", weekNumber);
  
        weekElement.appendChild(dayElement);
        lastWeekday++;
      }
      for (let i = lastWeekday; i < 7; i++) {
        const emptyDayElement = document.createElement("div");
        emptyDayElement.className = "day";
        weekElement.appendChild(emptyDayElement);
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
  