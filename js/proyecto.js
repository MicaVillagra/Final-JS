const BotonagregacionCarro = document.querySelectorAll('.addToCart');
BotonagregacionCarro.forEach((Botonagregacion) => {
  Botonagregacion.addEventListener('click', Agrgarclick);
});

const Botoncomprar = document.querySelector('.comprarButton');
Botoncomprar.addEventListener('click', Botonclickcomprar);

const Contenedoritems = document.querySelector(
  '.shoppingCartItemsContainer'
);

function Agrgarclick(evento) {
  const button = evento.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  Agregaritemcarrocompra(itemTitle, itemPrice, itemImage);
}

function Agregaritemcarrocompra(itemTitle, itemPrice, itemImage) {
  const Tituloselementos = Contenedoritems.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < Tituloselementos.length; i++) {
    if (Tituloselementos[i].innerText === itemTitle) {
      let Cantidadelementos = Tituloselementos[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      Cantidadelementos.value++;
      $('.toast').toast('show');
      Actualizaciontotal();
      return;
    }
  }

  const Filacarrocompra = document.createElement('div');
  const Contenidocarrocompra = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  Filacarrocompra.innerHTML = Contenidocarrocompra;
  Contenedoritems.append(Filacarrocompra);

  Filacarrocompra
    .querySelector('.buttonDelete')
    .addEventListener('click', Eliminaritemcarro);

  Filacarrocompra
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', Cambiocantidad);

  Actualizaciontotal();
}

function Actualizaciontotal() {
  let total = 0;
  const Totalcarrocompra = document.querySelector('.shoppingCartTotal');

  const Itmescarrocompra = document.querySelectorAll('.shoppingCartItem');

  Itmescarrocompra.forEach((Itemcarrocompra) => {
    const Precioitemcarrocompra = Itemcarrocompra.querySelector(
      '.shoppingCartItemPrice'
    );
    const precioitem = Number(
      Precioitemcarrocompra.textContent.replace('$', '')
    );
    const Cantidaditemcarrocompra = Itemcarrocompra.querySelector(
      '.shoppingCartItemQuantity'
    );
    const Cantidaditemcarrocompra2 = Number(
      Cantidaditemcarrocompra.value
    );
    total = total + precioitem * Cantidaditemcarrocompra2;
  });
  Totalcarrocompra.innerHTML = `${total.toFixed(2)}$`;
}


function Eliminaritemcarro(event) {
  const botonclick = event.target;
  botonclick.closest('.shoppingCartItem').remove();
  Actualizaciontotal();
}

function Cambiocantidad(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  Actualizaciontotal();
}

function Botonclickcomprar() {
  Contenedoritems.innerHTML = '';
  Actualizaciontotal();
}

//ANIMACIONES

$(function () {
//texto animado
  $(".textoAnimado").animate({
      left: '250px',
      opacity: '0.5',
      height: '150px',
      width: '150px'
    }, //1er parámetro propiedades
    4000, //2do parámetro duración 
    function () { //3er parámetro callback
      console.log("final de animación");
    });
//boton con una accion
  $("button").click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#seccionCursos").offset().top
    }, 2000);
  })

  //botones de colores
  $("#btnDurazno").click(() => $("body").css("background-color", "beige"))
  $("#btnGris").click ( () => $("body").css ("background-color", "grey"))
  $("#btnYellow").click ( () => $("body").css ("background-color", "beige"))
})

/* //Ajax con Jquery
$(function(){
  //Declaramos la url que vamos a usar para el GET
  const URLGET = "https://jsonplaceholder.typicode.com/posts"
  //Escuchamos el evento click del botón agregado
  $("#comprar").click(() => { 
      console.log("entro al evento click");
      $.get(URLGET, function (respuesta, estado) {
          console.log(estado);
          console.log(respuesta);
          if(estado === "success"){
              let misDatos = respuesta;
              for (const dato of misDatos) {
                  $("main").append(`
                              <div class="card">
                                  <h5 class="card-header">ID: ${dato.id}</h5>
                                  <div class="card-body">
                                      <h5 class="card-title">${dato.title}</h5>
                                      <p class="card-text">${dato.body}</p>
                                  </div>
                              </div>`);
              }  
          } 
      });
  });
}) */

