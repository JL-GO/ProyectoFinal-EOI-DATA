const url = "https://backhouses.jose-luislui964.repl.co/casas/";

function muestraProductos(datos) {
  document.getElementById("panel").innerHTML = "";
  datos.forEach(casa => {
    let icono = Math.round(casa['precio_estimado']) < Math.round(casa['precio_venta']) ? 'caro.png':'barato.png'; 
    
    let marmol = ''
    if (casa['marmol_blanco'] == 1){
      marmol = 'Blanco'
    }else if(casa['marmol_negro'] == 1){
      marmol = 'Negro'
    }else{
      marmol = 'Indio'
    }
    let extras = '';
    extras = '<b>Incluye </b>: ';
    extras += casa['electricidad'] == 1 ? ' - Red eléctrica ' : '';
    extras += casa['fibra'] == 1? ' - Fibra telefónica ' : '';
    extras += casa['jardin'] == 1? ' - Jardín ' : '';
    extras += casa['piscina'] == 1? ' - Piscina ' : '';
    extras += casa['puertas_cristal'] == 1? ' - Puertas de cristal ' : '';
    extras += casa['solar'] == 1? ' - Placas solares ' : '';  

    if(extras === '<b>Incluye </b>: '){
      extras = 'No incluye extras'
    }

    let color = ''
    color = Math.round(casa['precio_estimado']) < Math.round(casa['precio_venta']) ? 'red':'green';
    
    document.getElementById("panel").innerHTML += 
      `
      <div class="card m-1 col-4 min" style="width: 20rem;">
      <img class="" src="img/${icono}" class="card-img-top" alt="icono casa">
        <div class="card-body">
          <h5 class="card-title text-center"> ${casa['nombre']} </h5>
        <p class="card-text">
        <ul>
          <li>Área: ${Math.round(casa['area'])}</li>
          <li>Garajes: ${Math.round(casa['garaje'])}</li>
          <li>Chimeneas: ${Math.round(casa['chimenea'])}</li>
          <li>Baños: ${Math.round(casa['aseos'])}</li>
          <li>ciudad: ${Math.round(casa['ciudad'])}</li>
          <li>Pisos: ${Math.round(casa['pisos'])}</li>
          <li>Tipo Marmol: ${marmol}</li>
        </ul>
        <p style="min-height: 70px;"> ${extras}</p>
        </p>
        <p>
          Precio promedio: ${casa['precio_estimado']} € <br>
          <b style="color: ${color};" >Precio de venta: ${casa['precio_venta']} € </b>
        </p>
        <p class= "d-flex justify-content-center">
        <button class="btn btn-outline-info me-3 ps-4 pe-4"
        onclick="obtenerCasa(${casa.id})" >Editar</button>
        <button class="btn btn-outline-danger  ps-4 pe-4" 
        onclick="deleteProducto(${casa.id}, '${casa.nombre}')">Borrar</button>
        </p>
      </div>
    </div>`;
  });
}

function obtenerDatos (){

  var formulario = document.getElementById("form");
  var campos = formulario.elements;
  var datos = {};
  datos["marmol_blanco"] = 0;
  datos["marmol_negro"] = 0;
  datos["marmol_indio"] = 0;

  for (var i = 0; i < campos.length; i++) {
    var campo = campos[i];

    if (campo.type === "checkbox") {
          datos[campo.id] = campo.checked; 
    }else if(campo.id === 'marmol') {
          switch (parseInt(campo.value)){
              case 0: 
                datos['marmol_blanco'] = 1;
                break;
              case 1:
                datos['marmol_negro'] = 1;
                break;
              case 2:
                datos['marmol_indio'] = 1;
                break;
              }
      }else if (campo.id === 'nombre'){
          datos[campo.id] = campo.value
      }else{
        datos[campo.id] = parseInt(campo.value);
        }
  }
  datos["electricidad"] = datos["electricidad"]? 1 : 0;
  datos["fibra"] = datos["fibra"]? 1 : 0;
  datos["piscina"] = datos["piscina"]? 1 : 0;
  datos["puertas_cristal"] = datos["puertas_cristal"]? 1 : 0;
  datos["solar"] = datos["solar"]? 1 : 0;
  datos["jardin"] = datos["jardin"]? 1 : 0;
  delete datos['enviar']
  delete datos['']
  
  return datos;
}

function obtenerCasa(id){

  fetch(`${url}${id}`, { method: 'GET' })
    .then(respuesta => respuesta.json())
    .then(datos => mostrarActualizar(datos))
    .catch();
}

function getProductos() {
  fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => muestraProductos(datos))
    .catch(() => muestraError());
}

function postProducto() {

  casa = obtenerDatos();
  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(casa)
  };
  
  fetch(url, opciones)
    .then(respuesta => respuesta.json())
    .then(() => cerrarModal() )
    .catch(() => muestraError());
  
}

function putProducto(id) {

  casa = obtenerDatos();
  const opciones = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(casa)
      };
      
      fetch(`${url}${id}`, opciones)
        .then(respuesta => respuesta.json())
        .then(() => cerrarModal())
        .catch(() => muestraError()); 

}

function deleteProducto(id, nombre) {
  Swal.fire({
    icon: "error",
    title: `¿Estás seguro de borrar la casa '${nombre}'?`,
    text: "Esta acción no se puede deshacer",
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${url}${id}`, { method: 'DELETE' })
        .then(() => getProductos())
        .catch(() => muestraError());    
    }
  })
}


function cerrarModal(){
  var modal = document.getElementById('staticBackdrop')
  var instancia = bootstrap.Modal.getInstance(modal) 
  instancia.hide()

  const form = document.getElementById('form');
  form.reset();
  form.classList.remove('was-validated');

  document.getElementById("botonera").innerHTML = `
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button id="enviar" type="submit" class="btn btn-info">Consultar</button>
  ` 
  window.location.reload()
}

function validacion() {
  const form = document.getElementById('form');

  form.addEventListener('submit', event => {
    if (form.checkValidity()) postProducto();

    event.preventDefault();
    event.stopPropagation();

    form.classList.add('was-validated');
  }, false);
}

function muestraError() {
  Swal.fire({
    icon: "warning",
    title: "Se ha producido un error",
    text: "Vuelve a intentarlo en un minuto",
  });
}

function mostrarActualizar(casa){
  
  const modal = document.getElementById('staticBackdrop')
  var instancia = bootstrap.Modal.getOrCreateInstance(modal) 
  instancia.show()

  document.getElementById("nombre").value = casa.nombre;
  document.getElementById("area").value = casa.area;
  document.getElementById("garaje").value = Math.round(casa.garaje);
  document.getElementById("chimenea").value = Math.round(casa.chimenea);
  document.getElementById("aseos").value = Math.round(casa.aseos);

  if(casa.marmol_blanco == 1){
    document.getElementById("marmol").value = 0;
  }else if(casa.marmol_negro == 1){
    document.getElementById("marmol").value = 1;
  }else{
    document.getElementById("marmol").value = 2;
  }

  document.getElementById("ciudad").value = Math.round(casa.ciudad);
  document.getElementById("pisos").value = Math.round(casa.pisos);
  document.getElementById("solar").checked = casa.solar == 1? true: false;
  document.getElementById("electricidad").checked = casa.electricidad== 1? true: false;;
  document.getElementById("fibra").checked = casa.fibra== 1? true: false;;
  document.getElementById("puertas_cristal").checked = casa.puertas_cristal== 1? true: false;;
  document.getElementById("piscina").checked = casa.piscina== 1? true: false;;
  document.getElementById("jardin").checked = casa.jardin== 1? true: false;;
  document.getElementById("precio_venta").value = Math.round(casa.precio_venta);

  document.getElementById("botonera").innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="cerrarModal()">Cerrar</button>
    <button id="enviar" type="button" class="btn btn-success" onclick="putProducto(${casa.id})">Actualizar</button>
  ` 
}

getProductos();
validacion();

