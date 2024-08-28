// URL base de la API
const MyUrl = "http://localhost:8000/placesToVisit";

// GET - Obtener todos los lugares desde el servidor
async function getPlaces() {
  const response = await fetch(MyUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const places = await response.json(); // Convierte la respuesta en un objeto JSON
  return places; // Retorna el array de lugares
}

// Renderiza los lugares en el DOM
async function renderPlaces() {
  const places = await getPlaces(); //obtiene los lugares
  const placeList = document.getElementById("placeList");

  // Crear un Set con los IDs de los lugares ya renderizados en el DOM
  const renderedPlaces = new Set(Array.from(placeList.children).map(li => li.dataset.id));

  // Iterar sobre los lugares obtenidos y renderizarlos si no están en el DOM
  places.forEach((place) => {
    if (!renderedPlaces.has(place.id)) { // Evita duplicar lugares
      const li = document.createElement("li");
      li.dataset.id = place.id;  // Almacena el ID del lugar en el elemento <li>

      // Crear un <span> para el nombre del lugar
      const span = document.createElement("span");
      span.textContent = place.name; // Muestra el nombre del lugar

      if (place.completed) { // Si el lugar está marcado como visitado, añade la clase "completed"
        span.classList.add("completed");
      }

      // Crear y agregar el botón "Eliminar"
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.onclick = () => deletePlace(place.id);

      // Crear y agregar el botón "Visitado"
      const completeButton = document.createElement("button");
      completeButton.textContent = "Visitado";
      completeButton.onclick = () => updatePlace(place.id);

      li.appendChild(span);           // Añade el <span> al <li>
      li.appendChild(completeButton); // Añade el botón "Visitado" al <li>
      li.appendChild(deleteButton);   // Añade el botón "Eliminar" al <li>
      placeList.appendChild(li);      // Añade el <li> completo al contenedor <ul>
    }
  });
}

// POST - Crear un nuevo lugar en el servidor
async function createPlace() {
  const placeInput = document.getElementById("newPlace");
  const placeName = placeInput.value.trim(); // Obtén el valor del input y elimina espacios en blanco

  // Validación: Verificar si el campo de entrada está vacío
  if (!placeName) {
    alert("Por favor, escribe un nombre para el lugar antes de agregarlo.");
    return; // Salir de la función si el campo está vacío
  }

  const response = await fetch(MyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placeName, // Enviar el nombre del lugar como parte del cuerpo de la solicitud
      completed: false, // Inicialmente, el lugar no está marcado como completado
    }),
  });

  if (response.ok) {
    const newPlace = await response.json(); // Obtén la respuesta con el nuevo lugar creado
    addPlaceToDOM(newPlace); // Añádelo directamente al DOM
    placeInput.value = ""; // Limpia el campo de entrada después de agregar
  } else {
    console.error("Error al agregar el lugar");
  }
}

// Añadir un nuevo lugar al DOM
function addPlaceToDOM(place) {
  const placeList = document.getElementById("placeList");

  // Crear el elemento <li>
  const li = document.createElement("li");
  li.dataset.id = place.id; // Almacena el ID del lugar en el <li>

  // Crear un <span> para el nombre del lugar
  const span = document.createElement("span");
  span.textContent = place.name; // Muestra el nombre del lugar

  if (place.completed) {
    span.classList.add("completed"); // Si está marcado como visitado, añade la clase "completed"
  }

  // Crear y agregar el botón "Eliminar"
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = () => deletePlace(place.id);

  // Crear y agregar el botón "Visitado"
  const completeButton = document.createElement("button");
  completeButton.textContent = "Visitado";
  completeButton.onclick = () => updatePlace(place.id);

  li.appendChild(span);           // Añade el <span> al <li>
  li.appendChild(completeButton); // Añade el botón "Visitado" al <li>
  li.appendChild(deleteButton);   // Añade el botón "Eliminar" al <li>
  placeList.appendChild(li);      // Añade el <li> completo al contenedor <ul>
}

// DELETE - Eliminar un lugar del servidor
async function deletePlace(id) {
  const response = await fetch(`${MyUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    removePlaceFromDOM(id); // Elimina el lugar del DOM si se eliminó correctamente del servidor
  } else {
    console.error("Error al eliminar un lugar");
  }
}

// Eliminar un lugar del DOM
function removePlaceFromDOM(id) {
  const placeList = document.getElementById("placeList");
  const li = placeList.querySelector(`li[data-id='${id}']`);
  if (li) {
    placeList.removeChild(li); // Remueve el elemento <li> que corresponde al ID dado
  }
}

// UPDATE - Actualizar el estado de un lugar (completado/no completado) en el servidor
async function updatePlace(id) {
  const place = await getPlacesById(id); // Obtén el lugar por su ID
  place.completed = !place.completed; // Invierte el estado de "completed"

  const response = await fetch(`${MyUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(place), // Envía el lugar actualizado de vuelta al servidor
  });

  if (response.ok) {
    updatePlaceInDOM(place); // Actualiza el estado del lugar en el DOM
  } else {
    console.error("Error al actualizar un lugar");
  }
}

// Actualizar el estado de un lugar en el DOM
function updatePlaceInDOM(place) {
  const li = document.querySelector(`li[data-id='${place.id}']`);
  if (li) {
    const span = li.querySelector("span"); // Selecciona el <span> dentro del <li>
    if (place.completed) {
      span.classList.add("completed"); // Si el lugar está completado, añade la clase "completed" al <span>
    } else {
      span.classList.remove("completed"); // Si no, remueve la clase "completed" del <span>
    }
  }
}

// GET - Obtener un lugar por ID desde el servidor
async function getPlacesById(id) {
  const response = await fetch(`${MyUrl}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const place = await response.json(); // Convierte la respuesta en un objeto JSON
  return place; // Retorna el lugar obtenido
}

// Renderizar los lugares al cargar la página
renderPlaces();

