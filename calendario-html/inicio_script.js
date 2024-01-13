var currentDate = new Date();

// Array para almacenar las reservas
var reservations = [];

// Función para obtener el primer día del mes
function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Función para obtener el último día del mes
function getLastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Función para generar el calendario del mes actual
function generateCalendar() {
    var firstDay = getFirstDayOfMonth(currentDate);
    var lastDay = getLastDayOfMonth(currentDate);

    document.getElementById("currentMonthYear").innerHTML = `${currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}`;

    var calendarBody = document.getElementById("calendarBody");
    calendarBody.innerHTML = "";

    var currentDay = firstDay;

    while (currentDay <= lastDay) {
        var row = document.createElement("tr");

        for (var i = 0; i < 7; i++) {
            var cell = document.createElement("td");
            cell.textContent = currentDay.getDate();
            cell.setAttribute("data-date", currentDay.toISOString().split('T')[0]);
            cell.addEventListener("click", function(event) {
                openReservationForm(event.target);
            });

            if (currentDay.getMonth() !== currentDate.getMonth()) {
                cell.classList.add("disabled");
            }

            // Ejemplo: Agregar evento al 15 de cada mes
            if (currentDay.getDate() === 15) {
                cell.classList.add("event");
                cell.title = "¡Evento especial!";
            }

            if (currentDay.toDateString() === new Date().toDateString()) {
                cell.classList.add("current-day");
            }

            row.appendChild(cell);
            currentDay.setDate(currentDay.getDate() + 1);
        }

        calendarBody.appendChild(row);
    }
}

// Función para mostrar el mes anterior
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

// Función para mostrar el mes siguiente
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

// Función para abrir el formulario de reserva
function openReservationForm(cell) {
    var date = cell.getAttribute("data-date");
    var reservationForm = prompt("Ingrese la información de la reserva para el día " + date, "Día de inicio: " + date);
    if (reservationForm !== null) {
        addReservation(reservationForm);
    }
}

// Función para agregar una reserva al array y mostrarla en la lista
function addReservation(reservationInfo) {
    var date = reservationInfo.match(/\d{4}-\d{2}-\d{2}/)[0];
    var name = reservationInfo.replace(date, "").trim();

    reservations.push({
        startDate: date,
        endDate: date,  // En este ejemplo, la reserva dura un solo día
        name: name
    });

    displayReservations();
}

// Función para mostrar las reservas en la lista
function displayReservations() {
    var reservationsBody = document.getElementById("reservationsBody");
    reservationsBody.innerHTML = "";

    for (var i = 0; i < reservations.length; i++) {
        var row = document.createElement("tr");
        var reservation = reservations[i];

        var startDateCell = document.createElement("td");
        startDateCell.textContent = reservation.startDate;

        var endDateCell = document.createElement("td");
        endDateCell.textContent = reservation.endDate;

        var nameCell = document.createElement("td");
        nameCell.textContent = reservation.name;

        row.appendChild(startDateCell);
        row.appendChild(endDateCell);
        row.appendChild(nameCell);

        reservationsBody.appendChild(row);
    }
}

// Generar el calendario al cargar la página
generateCalendar();

var currentDate = new Date();
var reservations = [];

function openReservationForm(cell) {
    var date = cell.getAttribute("data-date");

    if (date) {
        document.getElementById("reservationForm").classList.remove("hidden");
        document.getElementById("reservationForm").setAttribute("data-date", date);
    }
}

function submitReservation() {
    var date = document.getElementById("reservationForm").getAttribute("data-date");
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dni = document.getElementById("dni").value;
    var email = document.getElementById("email").value;
    var rooms = document.getElementById("rooms").value;
    var roomType = document.getElementById("roomType").value;
    var paymentMethod = document.getElementById("paymentMethod").value;

    if (validateReservation(firstName, lastName, dni, email, rooms)) {
        reservations.push({
            startDate: date,
            endDate: date,
            name: firstName + " " + lastName,
            dni: dni,
            email: email,
            rooms: rooms,
            roomType: roomType,
            paymentMethod: paymentMethod
        });

        document.getElementById("reservationForm").classList.add("hidden");
        displayReservations();
    }
}

function validateReservation(firstName, lastName, dni, email, rooms) {
    if (firstName && lastName && dni && email && rooms > 0) {
        return true;
    } else {
        alert("Por favor, complete todos los campos del formulario.");
        return false;
    }
}

function displayReservations() {
    var reservationsBody = document.getElementById("reservationsBody");
    reservationsBody.innerHTML = "";

    for (var i = 0; i < reservations.length; i++) {
        var row = document.createElement("tr");
        var reservation = reservations[i];

        var startDateCell = document.createElement("td");
        startDateCell.textContent = reservation.startDate;

        var endDateCell = document.createElement("td");
        endDateCell.textContent = reservation.endDate;

        var nameCell = document.createElement("td");
        nameCell.textContent = reservation.name;

        row.appendChild(startDateCell);
        row.appendChild(endDateCell);
        row.appendChild(nameCell);

        reservationsBody.appendChild(row);
    }
}

// Resto de tu código anterior...



