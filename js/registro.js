"use stricct";
const btn_guardar = document.querySelector('#btn-guardar');

const lista_tipo_persona = document.querySelector("#slt-tipo-persona");
const txt_identificacion = document.querySelector("#txt-identificacion");
const txt_edad = document.querySelector("#txt-edad");
const txt_nacimiento = document.querySelector("#txt-nacimiento");


let validar = () => {
    let inputs_requeridos = document.querySelectorAll("#frm-registro [required]");
    let error = false;
    for(let i = 0; i < inputs_requeridos.length; i++){
        if(inputs_requeridos[i].value == ""){
            inputs_requeridos[i].classList.add("input-error");
            error = true;
        }else{
            inputs_requeridos[i].classList.remove("input-error");
        }
    }
    if (new Date(txt_nacimiento.value) > new Date()) {
        txt_nacimiento.classList.add("input-error");
        error = true;
    }
    if(Number(txt_edad.value) < Number(txt_edad.min) || Number(txt_edad.value) > Number (txt_edad.max)) {
        txt_edad.classList.add("input-error");
        error = true;
    }


    return error;
};

let limpiar=() => {
    lista_tipo_persona.value ="";
    txt_identificacion.value ="";
    txt_nacimiento.value ="";
    txt_edad.value ="";
};


let obtener_datos = () =>{
    let error = validar();

    if (error) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    }else {
        console.log(lista_tipo_persona.value);
        console.log(txt_identificacion.value);
        console.log(txt_nacimiento.value);
        console.log(txt_edad.value);
        Swal.fire({
            'title': 'Proceso realizado con éxito',
            'text': 'Sus datos se enviaron adecuadamente',
            'icon': 'success'
        }).then(()=>{
            limpiar();
        }); 
    }
};

btn_guardar.addEventListener('click', obtener_datos);
