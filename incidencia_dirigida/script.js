var x = [];
var y = [];
var a = window.innerWidth;
var b = window.innerHeight;

document.addEventListener("mousedown", function(e) {
	var cursorX = e.pageX;
	var cursorY = e.pageY;

	if (cursorX > ((a-900)/2) && cursorX < ((a+900)/2) && cursorY > ((b-430)/2) && cursorY < ((b+710)/2)) {
    	x.push(cursorX);
    	y.push(cursorY);

		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = "#1bbcb1";
		ctx.beginPath();
		ctx.arc((cursorX-((a-900)/2)),(cursorY-((b-430)/2)),8,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.font = "8px Arial";
		ctx.fillText(x.length,(cursorX-((a-880)/2)),(cursorY-((b-410)/2)))
	}
});

function myFunction() {
	var index = [];
	var matrix = [];

	for (var i = 0; i < x.length; i++) {
		var submatrix = [];
		for (var j = 0; j < x.length; j++) {
			submatrix.push(0);
		}
		matrix.push(submatrix);
	}

	for (var i = 0; i < x.length ; i++) {
		var relaciones = prompt("Indique con que nodos se relaciona el nodo " + (i+1));
		var subindex =[];
		var bandera = 1;
		while (bandera == 1) {
			if (relaciones.length > 1) {
				var temp = parseInt(relaciones.substring(0, 1));
				subindex.push(temp);
				relaciones = relaciones.substring(2, relaciones.length);
			}
			else if (relaciones.length == 1) {
				var temp = parseInt(relaciones);
				subindex.push(temp);
				bandera = 0;
			}
			else {
				bandera = 0;
			}
		}
		index.push(subindex);
	}
	
	for (var i = 0; i < x.length; i++) {
		for (var j = 0; j < index[i].length; j++) {
			matrix[i][index[i][j] - 1] = 1;

			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			ctx.strokeStyle="#1bbcb1";
			ctx.beginPath();
			if (i != index[i][j] - 1) {
				ctx.moveTo(x[i]-((a-900)/2),y[i]-((b-430)/2));
				ctx.quadraticCurveTo(x[i]-((a-900)/2)+40,y[i]-((b-430)/2)+40,x[index[i][j]-1]-((a-900)/2),y[index[i][j]-1]-((b-430)/2));
			}
			else {
				ctx.arc(x[i]-((a-900)/2) - 12,y[i]-((b-430)/2) - 12,16,0,2*Math.PI);
				ctx.closePath();
			}
			ctx.stroke();
		}
	}

	var cont = 0;
	var arrayvi = [];
	var arrayvj = [];

	for (var i = 0; i < x.length; i++) {
		for (var j = 0; j < x.length; j++) {
			if (matrix[i][j] == 1) {
				var canvas = document.getElementById("myCanvas");
				var ctx = canvas.getContext("2d");
				arrayvi.push(i);
				arrayvj.push(j);
				cont++;
				ctx.font = "8px Arial";
				if (i > j) {
					ctx.fillText(cont,((x[i]+x[j])/2)-((a-880)/2),((y[i]+y[j])/2)-((b-410)/2));
				}
				else {
					ctx.fillText(cont,((x[i]+x[j])/2)-((a-880)/2)+40,((y[i]+y[j])/2)-((b-410)/2)+40);
				}
			}
		}
	}

	var matrix2 = [];

	for (var i = 0; i < x.length; i++) {
		var submatrix2 = [];
		for (var j = 0; j < cont; j++) {
			submatrix2.push(0);
		}
		matrix2.push(submatrix2);
	}

	for (var j = 0; j < cont; j++) {
		matrix2[arrayvi[j]][j] = 1;
		matrix2[arrayvj[j]][j] = 1;
	}

	var matriz = "";

	for (var i = 0; i < x.length; i++) {
		var cadena = "";
		for (var j = 0; j < cont; j++) {
			if (matrix2[i][j] == 1) {
				cadena = cadena + "1 ";
			}
			else {
				cadena = cadena + "0 ";	
			}
		}
		cadena = cadena + "\n";
		matriz = matriz + cadena;
	}

	alert(matriz);
};