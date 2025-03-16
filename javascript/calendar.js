const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDay = null;
let selectedMonth = currentMonth;
let selectedYear = currentYear;
let today = new Date().getDate();
let todayMonth = new Date().getMonth();
let todayYear = new Date().getFullYear();

function renderCalendar() {
    document.getElementById("month").innerText = months[currentMonth];
    document.getElementById("year").innerText = currentYear;
    const daysContainer = document.getElementById("days");
    daysContainer.innerHTML = "";
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement("div");
        day.classList.add("day", "inactive");
        day.innerText = prevLastDate - i;
        if (selectedDay === prevLastDate - i && selectedMonth === currentMonth - 1 && selectedYear === currentYear) {
            day.classList.add("selected");
        }
        day.onclick = () => selectDay(prevLastDate - i, currentMonth - 1, currentYear);
        daysContainer.appendChild(day);
    }
    
    for (let i = 1; i <= lastDate; i++) {
        const day = document.createElement("div");
        day.classList.add("day");
        day.innerText = i;
        if (i === today && currentMonth === todayMonth && currentYear === todayYear) {
            day.classList.add("today");
        }
        if (i === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear) {
            day.classList.add("selected");
        }
        day.onclick = () => selectDay(i, currentMonth, currentYear);
        daysContainer.appendChild(day);
    }
    
    const remainingCells = 42 - (firstDay + lastDate);
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "inactive");
        day.innerText = i;
        if (selectedDay === i && selectedMonth === currentMonth + 1 && selectedYear === currentYear) {
            day.classList.add("selected");
        }
        day.onclick = () => selectDay(i, currentMonth + 1, currentYear);
        daysContainer.appendChild(day);
    }
}

function selectDay(day, month, year) {
    selectedDay = day;
    selectedMonth = month;
    selectedYear = year;
    renderCalendar();
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function changeYear(direction) {
    currentYear += direction;
    renderCalendar();
}