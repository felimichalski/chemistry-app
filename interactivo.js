var posicioninicial = window.scrollY;

console.log(posicioninicial);
if(posicioninicial != 0){
  $("body, html").animate({
    scrollTop: "0px"
  }, 0)
}

$("#info").hide();

$(document).ready(function(){
	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});
});

var hidrogeno = document.getElementById("hidrogeno");
hidrogeno.addEventListener("click", infoHidrogeno);
var helio = document.getElementById("helio");
helio.addEventListener("click", infoHelio);


function infoHidrogeno() {
  $("#info").show();
  info.innerHTML = "<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br /><image src='imagenes/hidro.png' />";
  var posicion = $("#info").offset().top;
  $("html, body").animate({
        scrollTop: posicion
    }, 1000);
}

function infoHelio() {
  $("#info").show();
  info.innerHTML = "<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />hola<br />";
  var posicion = $("#info").offset().top;
  $("html, body").animate({
        scrollTop: posicion
    }, 1000);
}
