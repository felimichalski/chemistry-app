function bajarIzq() {
    var elmnt = document.getElementById("box1");
    var elmnt2 = document.getElementById("box2");
    var y = elmnt.scrollTop;
    elmnt2.scrollTop = y;
}

function bajarDer() {
    var elmnt = document.getElementById("box1");
    var elmnt2 = document.getElementById("box2");
    var y = elmnt2.scrollTop;
    elmnt.scrollTop = y;
}

function limpiarContenedores() {
    var sino = confirm("¿Desea limpiar todos los resultados obtenidos?")
    if (sino == true) {
        formulas.innerHTML = "";
        resultados.innerHTML = "";
        contadorcantidad = 1;
    }
}


var boton = document.getElementById("enviar");
boton.addEventListener("click", confirmarCompuesto);
var compuesto;
var componentes = [];
var contadorcantidad = 1;

function confirmarCompuesto() {
    if (document.getElementById("com").value != "") {
        var com = document.getElementById("com");
        compuesto = com.value;
        compuesto = compuesto.replace(/ /g, "");
        var confirmacion = confirm("¿El compuesto deseado es " + compuesto + "?");
        if (confirmacion) {
            reconocerComponentes();
        }
        document.getElementById("com").value = "";
    }
}


function reconocerComponentes() {
    var elementos = compuesto.toLowerCase().split("");
    for (var i = 0; i < elementos.length; i++) {
        var el = elementos[i];
        var cant = elementos[i + 1];
        if (i != elementos.length - 1) {
            elementos[i] += elementos[i + 1];
        }
        if (tabla[elementos[i]] != undefined) {
            if (parseInt(elementos[i + 2]) > 0) {
                var array = [elementos[i], parseInt(elementos[i + 2])];
                componentes.push(array);
            } else {
                componentes.push(elementos[i]);
            }
            i += 1;
        } else if (tabla[el] != undefined) {
            if (parseInt(cant) > 0) {
                var array = [el, parseInt(cant)];
                componentes.push(array);
            } else {
                componentes.push(el);
            }
        }
    }
    reconocerCompuesto();
    componentes = [];
}

function reconocerCompuesto() {
    var elementos = compuesto.toLowerCase().split("");
    var verificador = false;
    var vf = false;
    for (var i = 0; i < elementos.length; i++) {
        elementos[i] += elementos[i + 1] + elementos[i + 2] + elementos[i + 3];
        if (elementos[i] == "(oh)") {
            vf = true;
        }
    }
    if (compuesto.toLowerCase() == "nh3" || compuesto.toLowerCase() == "h2o" || compuesto.toLowerCase() == "ph3") {
        alert("Compuesto no soportado");
    } else if (componentes.indexOf("c") == -1) {
        if (vf) {
            ecHidroxido();
            verificador = true;
        }
        if (componentes.length == 3 && componentes[0].indexOf("h") == 0 && componentes[2].indexOf("o") == 0) {
            var pruebahidrogeno = componentes[0];
            var pruebaoxigeno = componentes[2];
            if ((parseInt(pruebaoxigeno[1]) > 0 || pruebaoxigeno[1] == undefined) && (parseInt(pruebahidrogeno[1]) > 0 || pruebahidrogeno[1] == undefined)) {
                ecOxoacido();
            }
            verificador = true;
        }
        if (componentes.length == 2 && componentes[1].indexOf("o") == 0) {
            var pruebaoxigeno = componentes[1];
            if (parseInt(pruebaoxigeno[1]) > 0 || pruebaoxigeno[1] == undefined) {
                ecOxidos();
            }
            verificador = true;
        }
        if (componentes.length == 2 && componentes[0].indexOf("h") == 0) {
            var pruebahidrogeno = componentes[0];
            if (parseInt(pruebahidrogeno[1]) > 0 || pruebahidrogeno[1] == undefined) {
                ecHidracido();
            }
            verificador = true;
        }
        if (componentes.length == 2 && componentes[1].indexOf("h") == 0) {
            var pruebahidrogeno = componentes[1];
            if (parseInt(pruebahidrogeno[1]) > 0 || pruebahidrogeno[1] == undefined) {
                ecHidruro();
            }
            verificador = true;
        }
        if (componentes.length == 3 && componentes[2].indexOf("o") == 0) {
            var pruebahidrogeno = componentes[0];
            if (pruebahidrogeno[0] != "h" || (parseInt(pruebahidrogeno[1]) == NaN && pruebahidrogeno[1] != undefined)) {
                ecSaloxigenada();
            }
            verificador = true;
        }
        if (componentes.length == 2) {
            var prueba1 = componentes[0];
            var prueba2 = componentes[1];
            if (((prueba1[0] != "h" && prueba1[0] != "o") || (parseInt(prueba1[1]) == NaN && prueba1[1] != undefined)) && ((prueba2[0] != "h" && prueba2[0] != "o") || (parseInt(prueba2[1]) == NaN && prueba2[1] != undefined))) {
                ecSalnooxigenada();
            }
            verificador = true;
        }
        if (verificador == false) {
            alert("Compuesto inexistente o no soportado");
        }
    }
}


function ecOxidos() {
    var nometal = componentes[0];
    if (Array.isArray(nometal) == true) {
        nometal = nometal[0];
    }
    if (nometales.indexOf(nometal) != -1) {
        var eooxigeno = 0;
        var cantnometal = 0;
        if (Array.isArray(componentes[0]) == true) {
            cantnometal = parseInt(componentes[0].filter(comp => comp > 0));
        } else {
            cantnometal = 1;
        }
        if (Array.isArray(componentes[1])) {
            eooxigeno = componentes[1].filter(comp => comp > 0) * 2 / cantnometal;
        } else {
            eooxigeno = 2 / cantnometal;
        }
        if (Array.isArray(tabla[nometal])) {
            if (tabla[nometal].indexOf(eooxigeno) != -1) {
                var comodin = componentes[0];
                var desarmado = comodin[0].split("");
                desarmado[0] = desarmado[0].toUpperCase();
                if (desarmado.length > 1) {
                    desarmado[1] = desarmado[1].toLowerCase();
                }
                desarmado.push(comodin[1]);
                comodin = componentes[1]
                compuesto = desarmado.join("") + "O";
                if (comodin[1] != undefined) {
                    compuesto += comodin[1];
                }
                if (nometal.length == 1) {
                    nometal = nometal.toUpperCase();
                } else {
                    nometal = nometal.split("");
                    nometal[0] = nometal[0].toUpperCase();
                    nometal = nometal.join("");
                }
                formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(óxido ácido)</div><hr />";
                switch (nometal) {
                    case "p":
                        resultados.innerHTML += contadorcantidad + ") " + "P4 + O2 → " + compuesto + "<hr />";
                        break;
                    case "s":
                        resultados.innerHTML += contadorcantidad + ") " + "S8 + O2 → " + compuesto + "<hr />";
                        break;
                    default:
                        resultados.innerHTML += contadorcantidad + ") " + nometal + "2 + O2 → " + compuesto + "<hr />";
                        break;
                }
                contadorcantidad += 1;
            } else {
                alert("Compuesto inexistente");
            }
        } else {
            if (tabla[nometal] == eooxigeno) {
                var comodin = componentes[0];
                var desarmado = comodin[0].split("");
                desarmado[0] = desarmado[0].toUpperCase();
                if (desarmado.length > 1) {
                    desarmado[1] = desarmado[1].toLowerCase();
                }
                desarmado.push(comodin[1]);
                comodin = componentes[1]
                compuesto = desarmado.join("") + "O";
                if (comodin[1] != undefined) {
                    compuesto += comodin[1];
                }
                if (nometal.length == 1) {
                    nometal = nometal.toUpperCase();
                } else {
                    nometal = nometal.split("");
                    nometal[0] = nometal[0].toUpperCase();
                    nometal = nometal.join("");
                }
                formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(óxido ácido)</div><hr />";
                switch (nometal) {
                    case "p":
                        resultados.innerHTML += contadorcantidad + ") " + "P4 + O2 → " + compuesto + "<hr />";
                        break;
                    case "s":
                        resultados.innerHTML += contadorcantidad + ") " + "S8 + O2 → " + compuesto + "<hr />";
                        break;
                    default:
                        resultados.innerHTML += contadorcantidad + ") " + nometal + "2 + O2 → " + compuesto + "<hr />";
                        break;
                        contadorcantidad += 1;
                }
            } else {
                alert("Compuesto inexistente");
            }
        }
    } else {
        var metal = componentes[0];
        if (Array.isArray(metal) == true) {
            metal = metal[0];
        }
        var eooxigeno = 0;
        var cantmetal = 0;
        if (Array.isArray(componentes[0]) == true) {
            cantmetal = componentes[0].filter(comp => comp > 0);
        } else {
            cantmetal = 1;
        }
        if (componentes[1].length > 1) {
            eooxigeno = componentes[1].filter(comp => comp > 0) * 2 / cantmetal;
        } else {
            eooxigeno = 2 / cantmetal;
        }
        if (Array.isArray(tabla[metal])) {
            if (tabla[metal].indexOf(eooxigeno) != -1) {
                var comodin = componentes[0];
                var desarmado = comodin[0].split("");
                desarmado[0] = desarmado[0].toUpperCase();
                desarmado.push(comodin[1]);
                comodin = componentes[1];
                compuesto = desarmado.join("") + "O";
                if (comodin[1] != undefined) {
                    compuesto += comodin[1];
                }
                if (metal.length == 1) {
                    metal = metal.toUpperCase();
                } else {
                    metal = metal.split("");
                    metal[0] = metal[0].toUpperCase();
                    metal = metal.join("");
                }
                formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(óxido básico)</div><hr />";
                resultados.innerHTML += contadorcantidad + ") " + metal + " + O2 → " + compuesto + "<hr />";
                contadorcantidad += 1;
            } else {
                alert("Compuesto inexistente");
            }
        } else {
            if (tabla[metal] == eooxigeno) {
                var comodin = componentes[0];
                var desarmado = comodin[0].split("");
                desarmado[0] = desarmado[0].toUpperCase();
                if (desarmado.length > 1) {
                    desarmado[1] = desarmado[1].toLowerCase();
                }
                desarmado.push(comodin[1]);
                comodin = componentes[1]
                compuesto = desarmado.join("") + "O";
                if (comodin[1] != undefined) {
                    compuesto += comodin[1];
                }
                if (metal.length == 1) {
                    metal = metal.toUpperCase();
                } else {
                    metal = metal.split("");
                    metal[0] = metal[0].toUpperCase();
                    metal = metal.join("");
                }
                formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(óxido básico)</div><hr />";
                resultados.innerHTML += contadorcantidad + ") " + metal + " + O2 → " + compuesto + "<hr />";
                contadorcantidad += 1;
            } else {
                alert("Compuesto inexistente");
            }
        }
    }
}

function ecHidracido() {
    var eohidrogeno = 0;
    var nometal = componentes[1];

    if (Array.isArray(componentes[0])) {
        eohidrogeno = -parseInt((componentes[0].filter(comp => comp > 0)));
    } else {
        eohidrogeno = -1;
    }
    if (Array.isArray(tabla[nometal])) {
        if (tabla[nometal].indexOf(eohidrogeno) != -1) {
            var comodin = componentes[1];
            var desarmado = comodin[0].split("");
            desarmado[0] = desarmado[0].toUpperCase();
            if (desarmado.length > 1) {
                desarmado[1] = desarmado[1].toLowerCase();
            }
            if (comodin[1] != undefined) {
                desarmado.push(comodin[1]);
            }
            comodin = componentes[0];
            if (comodin.length > 1) {
                compuesto = "H" + comodin[1] + desarmado.join("");
            } else {
                compuesto = "H" + desarmado.join("");
            }
            if (nometal.length == 1) {
                nometal = nometal.toUpperCase();
            } else {
                nometal = nometal.split("");
                nometal[0] = nometal[0].toUpperCase();
                nometal = nometal.join("");
            }
            formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(hidrácido)</div><hr />";
            switch (nometal) {
                case "p":
                    resultados.innerHTML = contadorcantidad + ") " + "P4 + H2 → " + compuesto + "<hr />";
                    break;
                case "s":
                    resultados.innerHTML = contadorcantidad + ") " + "S8 + H2 → " + compuesto + "<hr />";
                    break;
                default:
                    resultados.innerHTML += contadorcantidad + ") " + nometal + "2 + H2 → " + compuesto + "<hr />";
                    break;
            }
            contadorcantidad += 1;
        } else {
            alert("Compuesto inexistente");
        }
    } else if (tabla[nometal] == eohidrogeno) {
        var comodin = componentes[1];
        var desarmado = comodin[0].split("");
        desarmado[0] = desarmado[0].toUpperCase();
        if (desarmado.length > 1) {
            desarmado[1] = desarmado[1].toLowerCase();
        }
        if (comodin[1] != undefined) {
            desarmado.push(comodin[1]);
        }
        comodin = componentes[0];
        if (comodin.length > 1) {
            compuesto = "H" + comodin[1] + desarmado.join("");
        } else {
            compuesto = "H" + desarmado.join("");
        }
        if (nometal.length == 1) {
            nometal = nometal.toUpperCase();
        } else {
            nometal = nometal.split("");
            nometal[0] = nometal[0].toUpperCase();
            nometal = nometal.join("");
        }
        formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(hidrácido)</div><hr />";
        switch (nometal) {
            case "p":
                resultados.innerHTML = contadorcantidad + ") " + "P4 + H2 → " + compuesto + "<hr />";
                break;
            case "s":
                resultados.innerHTML = contadorcantidad + ") " + "S8 + H2 → " + compuesto + "<hr />";
                break;
            default:
                resultados.innerHTML += contadorcantidad + ") " + nometal + "2 + H2 → " + compuesto + "<hr />";
                break;
        }
        contadorcantidad += 1;
    } else {
        alert("Compuesto inexistente");
    }
}

function ecHidruro() {
    var eohidrogeno = 0;
    var metal = componentes[0];

    if (Array.isArray(componentes[1])) {
        eohidrogeno = parseInt((componentes[1].filter(comp => comp > 0)));
    } else {
        eohidrogeno = 1;
    }
    if (Array.isArray(tabla[metal])) {
        if (tabla[metal].indexOf(eohidrogeno) != -1) {
            var comodin = componentes[0];
            var desarmado = comodin[0].split("");
            desarmado[0] = desarmado[0].toUpperCase();
            if (desarmado.length > 1) {
                desarmado[1] = desarmado[1].toLowerCase();
            }
            if (comodin[1] != undefined) {
                desarmado.push(comodin[1]);
            }
            comodin = componentes[1];
            if (comodin.length > 1) {
                compuesto = desarmado.join("") + "H" + comodin[1];
            } else {
                compuesto = desarmado.join("") + "H";
            }
            if (metal.length == 1) {
                metal = metal.toUpperCase();
            } else {
                metal = metal.split("");
                metal[0] = metal[0].toUpperCase();
                metal = metal.join("");
            }
            formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(hidruro)</div><hr />";
            resultados.innerHTML += contadorcantidad + ") " + metal + " + H2 → " + compuesto + "<hr />";
            contadorcantidad += 1;
        } else {
            alert("Compuesto inexistente");
        }
    } else if (tabla[metal] == eohidrogeno) {
        var comodin = componentes[0];
        var desarmado = comodin[0].split("");
        desarmado[0] = desarmado[0].toUpperCase();
        if (desarmado.length > 1) {
            desarmado[1] = desarmado[1].toLowerCase();
        }
        if (comodin[1] != undefined) {
            desarmado.push(comodin[1]);
        }
        comodin = componentes[1];
        if (comodin.length > 1) {
            compuesto = desarmado.join("") + "H" + comodin[1];
        } else {
            compuesto = desarmado.join("") + "H";
        }
        if (metal.length == 1) {
            metal = metal.toUpperCase();
        } else {
            metal = metal.split("");
            metal[0] = metal[0].toUpperCase();
            metal = metal.join("");
        }
        formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(hidruro)</div><hr />";
        resultados.innerHTML += contadorcantidad + ") " + metal + " + H2 → " + compuesto + "<hr />";
        contadorcantidad += 1;
    } else {
        alert("Compuesto inexistente");
    }
}

function ecHidroxido() {
    var metal = componentes[0];
    elementos = compuesto.toLowerCase().split("");
    var eometal = 0;
    for (var i = 0; i < elementos.length; i++) {
        elementos[i] += elementos[i + 1] + elementos[i + 2] + elementos[i + 3];
        if (elementos[i] == "(oh)") {
            if (elementos[i + 4] == undefined) {
                eometal = 1;
            } else {
                eometal = parseInt(elementos[i + 4]);
            }
        }
    }
    if (Array.isArray(tabla[metal])) {
        if (tabla[metal].indexOf(eometal) != -1) {
            var cantmetal = 1;
            var eooxigeno = 2;
            var cantoxigeno = 1;
            while (eometal * cantmetal != eooxigeno * cantoxigeno) {
                if (eometal * cantmetal < eooxigeno * cantoxigeno) {
                    cantmetal += 1;
                } else {
                    cantoxigeno += 1;
                }
            }
            if (metal.length == 1) {
                metal = metal.toUpperCase();
            } else {
                metal = metal.split("");
                metal[0] = metal[0].toUpperCase();
                metal = metal.join("");
            }
            if (cantmetal > 1) {
                if (cantoxigeno > 1) {
                    var oxido = metal + cantmetal + "O" + cantoxigeno;
                } else {
                    var oxido = metal + cantmetal + "O";
                }
            } else {
                if (cantoxigeno > 1) {
                    var oxido = metal + "O" + cantoxigeno;
                } else {
                    var oxido = metal + "O";
                }
            }
            var comodin = componentes[0];
            var desarmado = comodin[0].split("");
            desarmado[0] = desarmado[0].toUpperCase();
            if (desarmado.length > 1) {
                desarmado[1] = desarmado[1].toLowerCase();
            }
            if (comodin[1] != undefined) {
                desarmado.push(comodin[1]);
            }
            desarmado.push("(");
            desarmado.push(componentes[1].toUpperCase());
            desarmado.push(componentes[2].toUpperCase());
            desarmado.push(")");
            if (eometal > 1) {
                desarmado.push(eometal);
            }
            compuesto = desarmado.join("");
            formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(hidróxido)</div><hr />";
            resultados.innerHTML += contadorcantidad + ") " + oxido + " + H2O → " + compuesto + "<hr />";
            contadorcantidad += 1;
        } else {
            alert("Compuesto inexistente")
        }
    } else if (tabla[metal] == eometal) {
        var cantmetal = 1;
        var eooxigeno = 2;
        var cantoxigeno = 1;
        while (eometal * cantmetal != eooxigeno * cantoxigeno) {
            if (eometal * cantmetal < eooxigeno * cantoxigeno) {
                cantmetal += 1;
            } else {
                cantoxigeno += 1;
            }
        }
        if (metal.length == 1) {
            metal = metal.toUpperCase();
        } else {
            metal = metal.split("");
            metal[0] = metal[0].toUpperCase();
            metal = metal.join("");
        }
        if (cantmetal > 1) {
            if (cantoxigeno > 1) {
                var oxido = metal + cantmetal + "O" + cantoxigeno;
            } else {
                var oxido = metal + cantmetal + "O";
            }
        } else {
            if (cantoxigeno > 1) {
                var oxido = metal + "O" + cantoxigeno;
            } else {
                var oxido = metal + "O";
            }
        }
        var comodin = componentes[0];
        var desarmado = comodin[0].split("");
        desarmado[0] = desarmado[0].toUpperCase();
        if (desarmado.length > 1) {
            desarmado[1] = desarmado[1].toLowerCase();
        }
        if (comodin[1] != undefined) {
            desarmado.push(comodin[1]);
        }
        desarmado.push("(");
        desarmado.push(componentes[1].toUpperCase());
        desarmado.push(componentes[2].toUpperCase());
        desarmado.push(")");
        if (eometal > 1) {
            desarmado.push(eometal);
        }
        compuesto = desarmado.join("");
        formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(hidróxido)</div><hr />";
        resultados.innerHTML += contadorcantidad + ") " + oxido + " + H2O → " + compuesto + "<hr />";
        contadorcantidad += 1;
    } else {
        alert("Compuesto inexistente")
    }
}

function ecOxoacido() {
    var nometal = componentes[1];
    var eohidrogeno = 0;
    var eooxigeno = 0;
    if (Array.isArray(componentes[0])) {
        eohidrogeno = componentes[0].filter(comp => comp > 0);
    } else {
        eohidrogeno = 1;
    }
    if (Array.isArray(componentes[2])) {
        eooxigeno = componentes[2].filter(comp => comp > 0) * 2;
    } else {
        eooxigeno = 2;
    }
    var eonometal = eooxigeno - eohidrogeno;
    if (Array.isArray(tabla[nometal])) {
        if (tabla[nometal].indexOf(eonometal) != -1) {
            var cantnometal = 1;
            var eooxigeno = 2;
            var cantoxigeno = 1;
            while (eonometal * cantnometal != eooxigeno * cantoxigeno) {
                if (eonometal * cantnometal < eooxigeno * cantoxigeno) {
                    cantnometal += 1;
                } else {
                    cantoxigeno += 1;
                }
            }
            if (nometal.length == 1) {
                nometal = nometal.toUpperCase();
            } else {
                nometal = nometal.split("");
                nometal[0] = nometal[0].toUpperCase();
                nometal = nometal.join("");
            }
            if (cantnometal > 1) {
                if (cantoxigeno > 1) {
                    var oxido = nometal + cantnometal + "O" + cantoxigeno;
                } else {
                    var oxido = nometal + cantnometal + "O";
                }
            } else {
                if (cantoxigeno > 1) {
                    var oxido = nometal + "O" + cantoxigeno;
                } else {
                    var oxido = nometal + "O";
                }
            }
            var comodin = componentes[1];
            var desarmado = comodin.split("");
            desarmado[0] = desarmado[0].toUpperCase();
            if (desarmado.length > 1) {
                desarmado[1] = desarmado[1].toLowerCase();
            }
            comodin = componentes[0];
            if (comodin.length > 1) {
                compuesto = "H" + comodin[1] + desarmado.join("");
            } else {
                compuesto = "H" + desarmado.join("");
            }
            comodin = componentes[2];
            if (comodin.length > 1) {
                compuesto += "O" + comodin[1];
            } else {
                compuesto += "O";
            }
            formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(oxoácido)</div><hr />";
            resultados.innerHTML += contadorcantidad + ") " + oxido + " + H2O → " + compuesto + "<hr />";
            contadorcantidad += 1;
        } else {
            alert("Compuesto inexistente");
        }
    } else if (tabla[nometal] == eonometal) {
        var cantnometal = 1;
        var eooxigeno = 2;
        var cantoxigeno = 1;
        while (eonometal * cantnometal != eooxigeno * cantoxigeno) {
            if (eonometal * cantnometal < eooxigeno * cantoxigeno) {
                cantnometal += 1;
            } else {
                cantoxigeno += 1;
            }
        }
        if (nometal.length == 1) {
            nometal = nometal.toUpperCase();
        } else {
            nometal = nometal.split("");
            nometal[0] = nometal[0].toUpperCase();
            nometal = nometal.join("");
        }
        if (cantnometal > 1) {
            if (cantoxigeno > 1) {
                var oxido = nometal + cantnometal + "O" + cantoxigeno;
            } else {
                var oxido = nometal + cantnometal + "O";
            }
        } else {
            if (cantoxigeno > 1) {
                var oxido = nometal + "O" + cantoxigeno;
            } else {
                var oxido = nometal + "O";
            }
        }
        var comodin = componentes[1];
        var desarmado = comodin.split("");
        desarmado[0] = desarmado[0].toUpperCase();
        if (desarmado.length > 1) {
            desarmado[1] = desarmado[1].toLowerCase();
        }
        comodin = componentes[0];
        if (comodin.length > 1) {
            compuesto = "H" + comodin[1] + desarmado.join("");
        } else {
            compuesto = "H" + desarmado.join("");
        }
        comodin = componentes[2];
        if (comodin.length > 1) {
            compuesto += "O" + comodin[1];
        } else {
            compuesto += "O";
        }
        formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(oxoácido)</div><hr />";
        resultados.innerHTML += contadorcantidad + ") " + oxido + " + H2O → " + compuesto + "<hr />";
        contadorcantidad += 1;
    } else {
        alert("Compuesto inexistente")
    }
}

function ecSaloxigenada() {
    var nometal = componentes[1];
    if (Array.isArray(nometal)) {
        nometal = nometal[0]
    }
    var metal = componentes[0];
    if (Array.isArray(metal)) {
        metal = metal[0]
    }
    var eonometal = 0;
    var eometal = 0;
    var eooxigeno = 0;
    if (Array.isArray(componentes[2])) {
        var oxigeno = componentes[2];
        eooxigeno = oxigeno[1] * 2;
    } else {
        eooxigeno = 2;
    }
    var oxoacido;
    var hidroxido;
    var parentesis = false;
    elementos = compuesto.toLowerCase().split("");
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i] == "(") {
            parentesis = true;
        }
    }
    if (parentesis) {
        for (var i of tabla[nometal]) {
            if (eooxigeno - i > 0) {
                eonometal = i;
            }
        }
    } else {

    }
    formulas.innerHTML += "<div style='float:right;'>(sal oxigenada)</div><hr />";
}

function ecSalnooxigenada() {
    var nometal = componentes[1];
    if (Array.isArray(nometal)) {
        nometal = nometal[0];
    }
    var metal = componentes[0];
    if (Array.isArray(metal)) {
        metal = metal[0];
    }
    if (Array.isArray(tabla[nometal])) {
        var eonometal = -(parseInt(tabla[nometal].filter(comp => comp < 0)));
    } else {
        var eonometal = -(tabla[nometal]);
    }
    if (Array.isArray(componentes[1])) {
        var cantnometal = parseInt(componentes[1].filter(comp => comp > 0));
    } else {
        var cantnometal = 1;
    }
    var eometal = 0;
    if (Array.isArray(componentes[0])) {
        eometal = eonometal * cantnometal / parseInt(componentes[0].filter(comp => comp > 0));
    } else {
        eometal = eonometal * cantnometal;
    }
    if (Array.isArray(tabla[metal])) {
        if (tabla[metal].indexOf(eometal) != -1) {
            if (metal.length == 1) {
                metal = metal.toUpperCase();
            } else {
                metal = metal.split("");
                metal[0] = metal[0].toUpperCase();
                metal = metal.join("");
            }
            if (eometal > 1) {
                var hidroxido = metal + "(OH)" + eometal;
            } else {
                var hidroxido = metal + "(OH)";
            }
            if (nometal.length == 1) {
                nometal = nometal.toUpperCase();
            } else {
                nometal = nometal.split("");
                nometal[0] = nometal[0].toUpperCase();
                nometal = nometal.join("");
            }
            if (eonometal > 1) {
                var hidracido = "H" + eonometal + nometal;
            } else {
                var hidracido = "H" + nometal;
            }
            var comodin = componentes[0];
            var desarmado = comodin[0].split("");
            desarmado[0] = desarmado[0].toUpperCase();
            if (comodin[1] != undefined) {
                desarmado.push(comodin[1])
            }
            compuesto = desarmado.join("");
            comodin = componentes[1]
            desarmado = comodin[0].split("");
            desarmado[0] = desarmado[0].toUpperCase();
            if (comodin[1] != undefined) {
                desarmado.push(comodin[1])
            }
            compuesto += desarmado.join("");
            formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(sal binaria)</div><hr />";
            resultados.innerHTML += contadorcantidad + ") " + hidroxido + " + " + hidracido + " → " + compuesto + " + H2O<hr />";
            contadorcantidad += 1;
        } else {
            alert("Compuesto inexistente");
        }
    } else if (tabla[metal] == eometal) {
        if (metal.length == 1) {
            metal = metal.toUpperCase();
        } else {
            metal = metal.split("");
            metal[0] = metal[0].toUpperCase();
            metal = metal.join("");
        }
        if (eometal > 1) {
            var hidroxido = metal + "(OH)" + eometal;
        } else {
            var hidroxido = metal + "(OH)";
        }
        if (nometal.length == 1) {
            nometal = nometal.toUpperCase();
        } else {
            nometal = nometal.split("");
            nometal[0] = nometal[0].toUpperCase();
            nometal = nometal.join("");
        }
        if (eonometal > 1) {
            var hidracido = "H" + eonometal + nometal;
        } else {
            var hidracido = "H" + nometal;
        }
        var comodin = componentes[0];
        var desarmado = comodin[0].split("");
        desarmado[0] = desarmado[0].toUpperCase();
        if (comodin[1] != undefined) {
            desarmado.push(comodin[1])
        }
        compuesto = desarmado.join("");
        comodin = componentes[1]
        desarmado = comodin[0].split("");
        desarmado[0] = desarmado[0].toUpperCase();
        if (comodin[1] != undefined) {
            desarmado.push(comodin[1])
        }
        compuesto += desarmado.join("");
        formulas.innerHTML += contadorcantidad + ") " + compuesto + "<div style='float:right;'>(sal binaria)</div><hr />";
        resultados.innerHTML += contadorcantidad + ") " + hidroxido + " + " + hidracido + " → " + compuesto + " + H2O<hr />";
        contadorcantidad += 1;
    } else {
        alert("Compuesto inexistente");
    }
}