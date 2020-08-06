function validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
     }
     return false;        
}

var fecha = document.getElementById("edad").value;
var edad = calcularEdad(fecha);

if(edad > 20){
    // aqui haces lo que quieras con la validacion de si es mayor a 15
    alert("El usuario es mayor a 20 años");
}
function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	apellido: /^[a-zA-ZÀ-ÿ\s]{3,32}$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	numero: /^\d{6,12}$/ // 6 a 12 numeros.
}

const campo = {
    nombre: false,
    apellido: false,
    correo: false,
    numero: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre": /*con e tarjet name hacemos irnos al name y realizar una acción*/
            validaCampo(expresiones.nombre, e.target, 'nombre')
        break;

        case "apellido":
            validaCampo(expresiones.apellido, e.target, 'apellido')
        break;

        case "correo":
            validaCampo(expresiones.correo, e.target, 'correo')
        break;

        case "numero":
            validaCampo(expresiones.numero, e.target, 'numero')
        break;
    }
}

const validaCampo = (expresion, input, nombrex) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${nombrex}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${nombrex}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${nombrex} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campo[nombrex] = true;
    } 
    else {
        document.getElementById(`grupo__${nombrex}`).classList.add('formulario__grupo-incorrecto'); /*que va hacer esto? va añadir una clase al input*/
        document.getElementById(`grupo__${nombrex}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${nombrex} .formulario__input-error`).classList.add('formulario__input-error-activo'); /*activar mensaje de error*/
        campo[nombrex] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit',(e) => {
    e.preventDefault();

    if(campo.nombre && campo.apellido && campo.correo && campo.numero) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() =>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
    }
    else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});