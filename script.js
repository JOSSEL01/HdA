// Obtén todos los checkboxes en la tabla de asistencia
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
var registroTable = document.getElementById('registro-table');

// Función para cargar el estado de las casillas desde el almacenamiento local
function cargarEstadoCasillas() {
    checkboxes.forEach(function (checkbox) {
        var id = checkbox.id;
        var estadoGuardado = localStorage.getItem(id);
        if (estadoGuardado === 'true') {
            checkbox.checked = true;
            actualizarEstilo(checkbox);
        }
    });
}

// Agrega un controlador de eventos a cada checkbox
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        // Obtén la celda padre (td) del checkbox
        var cell = this.parentElement;

        // Si el checkbox está marcado, establece el estilo como presente (verde)
        // Si no está marcado, establece el estilo como ausente (rojo)
        if (this.checked) {
            cell.className = 'presente';
        } else {
            cell.className = 'ausente';
        }

        // Obtén el nombre de la persona
        var nombrePersona = cell.previousElementSibling.textContent;

        // Obtén la fecha y hora actual
        var fechaHoraRegistro = obtenerFechaHoraActual();

        // Agrega una fila a la tabla de registro con el nombre y la fecha/hora
        var newRow = registroTable.insertRow(-1);
        var nombreCell = newRow.insertCell(0);
        var fechaHoraCell = newRow.insertCell(1);
        nombreCell.textContent = nombrePersona;
        fechaHoraCell.textContent = fechaHoraRegistro;

        // Guarda el estado del checkbox en el almacenamiento local
        localStorage.setItem(this.id, this.checked);
    });
});

// Función para obtener la fecha y hora actual en formato legible
function obtenerFechaHoraActual() {
    var ahora = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return ahora.toLocaleDateString('es-ES', options);
}

// Función para actualizar el estilo de una casilla de verificación
function actualizarEstilo(checkbox) {
    var cell = checkbox.parentElement;
    if (checkbox.checked) {
        cell.className = 'presente';
    } else {
        cell.className = 'ausente';
    }
}

// Cargar el estado de las casillas al cargar la página
cargarEstadoCasillas();
