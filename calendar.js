// Events object containing all the upcoming events
const events = {
    "2024-10-30": { 
        name: "Halloween Horror Movie Night", 
        type: "social", 
        date: "October 30, 2024", 
        description: "Join us for a spooky Halloween movie night with costumes, popcorn, and fun! Costumes are encouraged.",
        location: "Room 101, Student Center",
        signupLink: "https://example.com/signup-halloween"
    },
    "2024-11-07": { 
        name: "Fall Bake Sale", 
        type: "social", 
        date: "November 7, 2024", 
        description: "Enjoy delicious homemade treats and support the BMB-GSA at our annual fall bake sale!",
        location: "Main Hall",
        signupLink: "https://example.com/signup-bakesale"
    },
    "2024-11-21": { 
        name: "Lab Trivia Night", 
        type: "social", 
        date: "November 21, 2024", 
        description: "Test your knowledge on lab-related trivia and compete with your peers for prizes!",
        location: "Campus Pub",
        signupLink: "https://docs.google.com/forms/d/e/1FAIpQLSdIKCSfioewLCbAuifyavSR6XhVQKleR-_VPbVzvlgcWs5WYQ/viewform?usp=sf_link"
    },
    "2024-12-06": { 
        name: "Construct Gingerbread Houses with the BMB-GSA", 
        type: "social", 
        date: "December 6, 2024", 
        description: "Bring out your creativity by building gingerbread houses with us! Supplies are provided.",
        location: "Room 204, Student Center",
        signupLink: "https://example.com/signup-gingerbread"
    },
    "2024-12-18": { 
        name: "Holiday Party", 
        type: "social", 
        date: "December 18, 2024", 
        description: "Celebrate the end of the year with the BMB-GSA holiday party! Food, drinks, and festivities included.",
        location: "Event Hall, Campus Center",
        signupLink: "https://example.com/signup-holidayparty"
    },
    "2025-01-14": { 
        name: "Super Smash Bros Competition + Jackbox Party Games", 
        type: "social", 
        date: "January 14, 2025", 
        description: "Join us for a night of gaming with a Super Smash Bros tournament and fun Jackbox party games.",
        location: "Game Room, Student Center",
        signupLink: "https://example.com/signup-gamingnight"
    },
    "2025-03-07": { 
        name: "Poster Presentation Session", 
        type: "academic", 
        date: "March 7, 2025", 
        description: "Showcase your research and see what your peers are working on at our poster presentation session.",
        location: "Conference Hall A",
        signupLink: "https://example.com/signup-poster"
    },
    "2025-04-10": { 
        name: "Graduate Research Seminar", 
        type: "academic", 
        date: "April 10, 2025", 
        description: "Attend our graduate research seminar to learn about current research in the department.",
        location: "Lecture Hall B",
        signupLink: "https://example.com/signup-seminar"
    },
    "2025-05-20": { 
        name: "Workshop on Thesis Writing", 
        type: "academic", 
        date: "May 20, 2025", 
        description: "Join this workshop for guidance and tips on writing your thesis effectively and efficiently.",
        location: "Room 303, Library",
        signupLink: "https://example.com/signup-thesisworkshop"
    }
};



let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

document.getElementById("prev-month").addEventListener("click", prevMonth);
document.getElementById("next-month").addEventListener("click", nextMonth);

// Event details panel functions
function openEventDetails(eventKey) {
    const event = events[eventKey];
    if (event) {
        // Populate event details content
        document.getElementById("event-details-content").innerHTML = `
            <h2>${event.name}</h2>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <p><a href="${event.signupLink}" target="_blank">Sign Up Here</a></p>
        `;
        // Show the panel by adding the active class
        document.getElementById("event-details-panel").classList.add("active");
    }
}

// Function to close the event details panel
function closeEventDetails() {
    document.getElementById("event-details-panel").classList.remove("active");
}

// Load calendar function with clickable event boxes
function loadCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const calendarTable = document.querySelector("#calendar-table tbody");

    calendarTable.innerHTML = ""; // Clear previous calendar

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                row.appendChild(cell); // Empty cell for days before the 1st of the month
            } else if (date > daysInMonth) {
                break; // Stop after the last date of the month
            } else {
                cell.setAttribute("data-date", date);
                

                const eventKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

                if (events[eventKey]) {
                    const event = events[eventKey];
                    cell.classList.add("highlighted-event");

                    // Create a div for the event box
                    const eventBox = document.createElement("div");
                    eventBox.classList.add("event-box");
                    eventBox.innerHTML = `${event.name}`;
                    eventBox.onclick = () => openEventDetails(eventKey); // Click handler to open panel

                    if (event.type === "social") {
                        eventBox.classList.add("social-event");
                    } else if (event.type === "academic") {
                        eventBox.classList.add("academic-event");
                    }

                    cell.appendChild(eventBox);
                }

                row.appendChild(cell);
                date++;
            }
        }

        calendarTable.appendChild(row);
        if (date > daysInMonth) {
            break;
        }
    }

    document.getElementById("current-month").innerText = `${monthNames[month]} ${year}`;
}

function prevMonth() {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
    loadCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
    loadCalendar(currentMonth, currentYear);
}

// Load current month on page load
loadCalendar(currentMonth, currentYear);