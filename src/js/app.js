import { NoteStorage } from "./notes-storage";
import '../styles/site.css';
import '../styles/calendar.css';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDay = new Date().getDate();
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

    // Render previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement("div");
        day.classList.add("day", "inactive");
        day.innerText = prevLastDate - i;
        if (selectedDay === prevLastDate - i && selectedMonth === currentMonth - 1 && selectedYear === currentYear) {
            day.classList.add("selected");
        }
        if (NoteStorage.getNote(currentYear, currentMonth - 1, prevLastDate - i)) {
            day.classList.add("hasnote", "hasnote-othermonth");
        }
        day.onclick = () => selectDay(prevLastDate - i, currentMonth - 1, currentYear);
        daysContainer.appendChild(day);
    }

    // Render current month days
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
        if (NoteStorage.getNote(currentYear, currentMonth, i)) {
            day.classList.add("hasnote");
        }
        day.onclick = () => selectDay(i, currentMonth, currentYear);
        daysContainer.appendChild(day);
    }

    // Render next month days
    const remainingCells = 42 - (firstDay + lastDate);
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "inactive");
        day.innerText = i;
        if (selectedDay === i && selectedMonth === currentMonth + 1 && selectedYear === currentYear) {
            day.classList.add("selected");
        }
        if (NoteStorage.getNote(currentYear, currentMonth + 1, i)) {
            day.classList.add("hasnote", "hasnote-othermonth");
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
    updateNotesTitle();
    loadNote();
}

function updateNotesTitle() {
    const notesTitle = document.getElementById("notes-title");
    if (notesTitle) {
        notesTitle.innerText = `${selectedDay} ${months[selectedMonth]} ${selectedYear}`;
    }
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

function loadNote() {
    const noteText = NoteStorage.getNote(selectedYear, selectedMonth, selectedDay);
    document.getElementById("notes-text").value = noteText ? noteText : '';
}

function saveNote() {
    const noteContent = document.getElementById("notes-text").value.trim();
    if (noteContent) {
        NoteStorage.saveNote(selectedYear, selectedMonth, selectedDay, noteContent);
    } else {
        NoteStorage.deleteNote(selectedYear, selectedMonth, selectedDay);
    }
    renderCalendar();
}

document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
    updateNotesTitle();
    document.getElementById("notes-button").addEventListener("click", saveNote);
    document.getElementById("previous-year").addEventListener("click", () => changeYear(-1));
    document.getElementById("next-year").addEventListener("click", () => changeYear(1));
    document.getElementById("previous-month").addEventListener("click", () => changeMonth(-1));
    document.getElementById("next-month").addEventListener("click", () => changeMonth(1));
});
