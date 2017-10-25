

	//Hangman


		///////////////////
		//	Algoritme//
		//////////////////
	
	
	
	/*	
	
	 1). Ta imot en bokstav
	
	 2). Sjekk imot et (tilfeldig?) ord om denne inneholder denne eksakte bokstaven
	
		 2.1) Dersom den gjør:
		
				2.1.1) Gi tilbakemelding.
			
			 2.1.2)	Før denne opp i en array for ord på rett indeks
			
		
		
		 2.2) Dersom den ikke gjør:
		
				2.2.1) Gi tilbakemelding.
			
			 2.2.2) Før denne opp i en array for feil bokstaver
			
			 2.2.3). Tegn linje videre
			
			 2.2.4) Før opp antall feil i en teller
			
			
		 3) Summer antall feil 

			 3.1) Hvis feil er større enn en gitt verdi (Figuren er tegnet ferdig): Skriv "Game Over!"
			
			 3.2) Hvis bruker har klart å tippe ordet riktig (Ordet er korrekt)
			
				
				 3.2.1) Skriv en gratulerer-skjerm
				
				 3.2.2) Deaktiver submit-knappp
				
				3.2.3) Før en poengsum
				
				3.2.3) Aktiver start-knappen igjen
				
		4) La brukeren få starte på ny
		
		4.1) Før opp poeng/runde
		
		4.2) Lag en timer 
		
	
		 5) Småplukk i GUI (onmouseover, startmeny, hint, etc. )			*/
	
	
	
	
	//////////////////////////
	//	Globale variabler	//
	/////////////////////////
	
	
	
	
	

	var points = 0; /*Holder rede på antall ganger du har tapt/vunnet */
	var round = 0;	
	
	var blood = [ ];
	
	var height = 700;
	
	var width = 600;
	
	var ctx;
	
	var teller	=	0;			// *Teller for feil/riktig ord
	
	var indexCategory;	/* Brukerdefinert index på nedtreksliste*/
	
	var ordRett = [ ];
	
	var ordFeil = [ ];
	
	var ord;
	
	var ordArray = [ ];
	
	var i = 0;			// Inkrement for teksten som flytter seg på startmenyen, alle andre i er lokale i for-løkker; "bruk/kast"
	
	
	
	
	///////////////////////////////
	//	Trekke et tilfeldig ord	//
	/////////////////////////////
	
	
	
	
	//kategorier, ordliste og whatnot 
	
	
	
	function createOption(tagName,	arrayName){
	
		/*Denne f(x) lager en nedtrekksliste basert på array med en mengde kategorier og tagId for listen, alle får en numerisk verdi [0, array-lengde)*/
	
		for (var i = 0, l = arrayName.length; i < l ; i++){
			
			
				var newElement = document.createElement("option");
				newElement.innerHTML = arrayName[i];
				
				if (i === arrayName.length - 1){
				
					newElement.value = Math.floor(Math.random()*l	)	}
					
				else{
				
					newElement.value = i;	
				}
				
				tagName.appendChild(newElement);
		}
	}
	
	
	
	/* Trekker et ord ifra todimensjonal index vha. en ferdig definert index, og ifra en tilfeldig variabel */
	
	
	
	function trekkord(){
		
		indexCategory = document.getElementById("lstCategory").value;
		
		var rand = Math.floor(Math.random()*ordliste[indexCategory].length);
		
		ord = ordliste[indexCategory][rand];
		
		console.log(indexCategory);
		console.log(ord);
		
		ordArray = ord.split("");
	
	}
	
	
	
	/* Erstatter bokstaver i et ord med _ */
	
	
	function understrekOrd() {
	
		for (var i= 0, l = ordArray.length; i<l ; i++)
		
		ordRett[i] = "_";
	}
	
	
	
	
	function showHint() {
		
		alert('JUKS!: Trykk CTRL + SHIFT + i for å finne løsningsordet. Ikke juks! jeg har lagd en ganske bra gameover-skjerm :O')
	}
	
	
	
	///////////////////////
	//	Oppstart av alt	//
	/////////////////////
	


	window.onload  = main;
	
	
	
	
	function main() {
		
		
		createOption(document.getElementById("lstCategory"), kategorier);
		
		ctx = document.getElementById("lerret").getContext("2d");
		
		ctx2 = document.getElementById("lerret2").getContext("2d");
		
		document.getElementById("btnSubmit").onclick = sjekk;
		
		document.getElementById("btnSubmit").disabled = true;
		
		document.getElementById("btnStart").onclick = startgame;
		
		intervallfunksjon	=	setInterval(startmeny,100);	/*Startmeny-oppdateres hvert 1^-10 sekund */
	}
	
	
	
	
	
	
		///////////////////////////////////////////////////////////////////////////////////
		//	Modul av oppgaven som har med startmeny, Game-over og gratulerer å gjøre	//
		/////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	function startmeny() {
		
		
		document.getElementById("btnStart").disabled = false; 

		/*visk ut tekst*/
		
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,width, height);
		ctx.fill();
		ctx.beginPath();
		
		/*Start-meny tekst som beveger seg*/
		
		ctx.lineWidth="2";
		ctx.font = "60px Arial";
		ctx.strokeText("Press Start"	, i, 150	)
		
		ctx.stroke();
		
	
	
		
		if (	i<=0	) {
		
			deltax = 15;
			ctx.strokeStyle = "green"
		}
		
		if (	i >=	width	-	280	){
		
			deltax = -deltax;
			ctx.strokeStyle	=	"red";
		}
		
		
		i +=deltax;
		
	}
	
	
	

	
	
	// Ny runde, ved game over/gratulerer vil teller, ordFeil & ordRett resettes

	
	
	function newRound() {
		document.getElementById("utskriftFeil").innerHTML = "";
		teller = 0;	
		ordFeil = [	];
		
		for	(var i = 0, l = ordFeil.length; i	<=	l ; i++){	
		
			ordFeil.splice(i);
			
			
			
			}
		
		ordRett = [ ];
		
		
	}
	
	
	
	
	
	/*Lag et dynamisk brukergrensesnitt */
	
	function startgame() {
		
		
		
		round += parseInt(1);
		document.getElementById("txtRounds").innerHTML = round;
		document.getElementById("txtPoints").innerHTML = points;
		
		clearInterval(	intervallfunksjon	);	//*Deaktiver tidsintervall-lytteren ved trykk på startknappen
		
		/*Disable/enable knapper*/
		
		document.getElementById("btnSubmit").disabled = false;
		document.getElementById("btnStart").disabled = true;
		
		/*Fjern startmeny */
		
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,width, height);

				
				
				//* Grunnstruktur for henretningsinstrument
		
				//*	  flate, startx,starty,sluttx,slutty,bredde)				<- hahah slutty....
		
		
		tegnLinje(ctx, 0,	680,	width,	680,	5);					
		tegnLinje(ctx, 150,	680,	150, 250, 5);
		tegnLinje(ctx, 75, 680, 150, 600, 5);
		tegnLinje(ctx, 225, 680, 150, 600, 5);
		
		
		/*Kjør mange stokastiske funksjoner tilknyttet ord/display */

		
		trekkord();
		understrekOrd();
		skrivtekst();
		document.getElementById("btnHint").onclick = showHint;
	}


	
	
	
	
	function gratulerer() {
			
			points += 10;
			
			ctx.beginPath();
			ctx.fillStyle = "yellow";
			ctx.fillRect(0,	0,	width, height);
			ctx.fill();
			
			ctx.beginPath()
			ctx.strokeStyle = "black";
			ctx.strokeText("A winner is", 45, 150);
			ctx.strokeText("you!!!!!!", 45, 225);
			
			
			document.getElementById("btnStart").disabled = false;
				
			document.getElementById("btnSubmit").disabled = true;
			newRound()
			
		}
	
	
	/* Game over-skjerm og resetter variablene */
	
	
	
	
	
	function gameOver() {
				
				alert('Ordet var ' + ord)
				
				
								
				
				ctx.beginPath();
				ctx.fillStyle = "black";
				ctx.fillRect(0,0,width, height);
				ctx.fill();
				
				
				ctx.beginPath()
				ctx.strokeStyle = "red";
				ctx.fillStyle = "red";
				ctx.fill();
				ctx.font = "60px Arial";
				ctx.strokeText("YOU ARE", 150, 150);
				ctx.strokeText("DEAD!!!!!!", 150, 225);
				
				
				
				var caught = 'ganondorflaugh.mp3';
		
				playAudio(caught)
				
				
				document.getElementById("btnStart").disabled = false;
				
				document.getElementById("btnSubmit").disabled = true;
				
				newRound();
				
				
				
		}
	
	
	
	
	
	
	
	
	
	
	

	
	////////////////////////////////////////////////////////
	///	Modul som har med selve tekstinputten å gjøre	 ///
	///////////////////////////////////////////////////////
	
	
	
	
	//* Importer bokstaver ifra brukerinput og sjekker disse opp imot ord
	
	
	function sjekk() {
	
	
		var	bokstav = document.getElementById("txtBokstav").value.toLowerCase();
		
		
			/*Sjekk om ord-array inkluderer bokstav*/
			
			/* Både Java og C# har en liknende funksjon som includes for arrayer, derfor brukter jeg denne med god samvittighet...*/
			
		if (	ordArray.includes(	bokstav	)	) {
		
		
			for (	var i = 0, l = ordArray.length; i	<	l; i++	){
				
					
					if (	ordArray[i] === bokstav	) {
					
						ordRett[i] = bokstav;
						
					}
				
					
				}
			
			}	
	

	
		
		else if (ordFeil.includes(	bokstav	) ){
			alert('Du har allerede skrevet inn denne bokstaven')
		}

		
		
		else {
			
			ordFeil.push(	bokstav	);
			teller++;
		}
		
		
		
		skrivtekst()



		
		/*Hvis hele ordRett-arrayen (loddet sammen) er lik ordet, kjør gratulasjonsskjerm */
		
		if (ordRett.join("") === ord){
		
			gratulerer()
		}


		
		
		


		//////////////////////////////////////////////
		//	Tegn linjer basert på resultat i teller	//
		/////////////////////////////////////////////


		
		


		if (teller >0){
			
			document.getElementById("utskriftFeil").innerHTML	=	ordFeil.join(" ");
			
			tegnVidere(teller,ctx, 1.0, "black");
			
		}
	
	}
	
	

	
	
	
	////////////////////////////////////////////////////
   ///	Modul av oppgaven som har med tegning å gjøre//
  ////////////////////////////////////////////////////

  
  
  

		//* Funksjon for det tilfellet hvor vi ønsker å tegne videre, case/switch ut ifra poeng. 

	function tegnVidere(teller,	flate, opacity, color) {				
												
	
		switch (teller){
		
			case 1:		/*bjelke*/
				flate.globalAlpha = opacity;
				flate.fillStyle = color;
				tegnLinje(flate,	150,	250,	300, 250,	5);
				break;
			
			case 2:		/*Rep*/
			
				flate.globalAlpha = opacity;
				tegnLinje(flate, 300, 250, 300, 300, 5);
				break;
				
			case 3:							
								//Hode Fullsirkel sentrert i y=350 (300	+	r på 50), x=konstant
				flate.beginPath();
				flate.globalAlpha = opacity;
				flate.arc(300,350,50,0, 2*Math.PI);
				flate.stroke();
				break;
		
			case 4:
								// Torso
				flate.globalAlpha = opacity;
				tegnLinje(flate, 300,	400,	300,	500,5);
				
				break;
			
			case 5:
								//Høyre & venstre ben
				flate.globalAlpha = opacity;
				tegnLinje(flate, 300, 500, 350, 520, 5);
				break;
				
			case 6:
				flate.globalAlpha = opacity;
				tegnLinje(flate, 300,	500, 250, 520,	5);
				break;

			case 7:				//Høyre og venstre arm
				flate.globalAlpha = opacity;
				tegnLinje(flate,	300, 450,	350, 475, 5);
				break;	
				
			case 8:
				flate.globalAlpha = opacity;
				tegnLinje(flate, 300,450, 250, 475, 5);
				break;
				
			case 9:
				flate.globalAlpha = opacity;
				tegnLinje(flate, 325, 325, 310, 310, 5);
				break;
				
			case 10:
				flate.globalAlpha = opacity;
				tegnLinje(flate, 310, 325, 325, 310, 5);	//høyre øye ferdig
				break;
					
			case 11:
				flate.globalAlpha = opacity;
				tegnLinje(flate, 280,325, 290, 310, 5);	
				break;
				
			case 12:
				flate.globalAlpha = opacity;			//venstre øye ferdig
				tegnLinje(flate, 290, 325, 280, 310, 5);
				break;

			case 13:									// Munn
				flate.globalAlpha = opacity;
				tegnLinje(flate, 300, 350, 315,  350, 5);
				break;
			
			case 14:
				points-=10;
				gameOver();
				break;
			
			
			
		}
			
	
	}
	
	
	
	

	// ** Funksjon for å tegne ord
	
	
	function skrivtekst(ord) {
	
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,width, 200);
		
		ctx.beginPath();
		ctx.lineWidth="1";
		ctx.font = "60px Arial";
		ctx.strokeText(ordRett.join("")	, 50, 150	);
		ctx.stroke();
	
	}
	
	
	//* Generalisert funksjon for å tegne linjer *//
	
	
	function tegnLinje(kanvasflate,	fraX,	fraY,	tilX, tilY,	bredde){
	
		kanvasflate.beginPath();
		
		kanvasflate.lineWidth =	bredde;
		
		kanvasflate.strokeStyle = "black";
		
		kanvasflate.moveTo(fraX,fraY);
		
		kanvasflate.lineTo(tilX,tilY);
		
		kanvasflate.stroke();
	
	}
	
	/* Denne brukes for å tegne blod på gameover-skjermen, samt på gratulasjonsskjermen  */
	
	
	
	
	
	/*
	function drawCircles(flate, colour,	x,	y,	rmax) {
		
		
		
		flate.beginPath();
		flate.fillStyle = colour;
		flate.strokeStyle = colour
		flate.arc = (x, y, rmax, 0, 2*Math.PI)
		flate.stroke();
		flate.fill();
		
	}
	
	function defineRandomCircles() {
		
		for (var i = 0, l = 100; i<l; i++){
			var stuff = 
				{
				x: Math.floor(width*Math.random() ),
				y: Math.floor(height/2 + height*Math.random() ),
				r: Math.floor(  (30*Math.random()  )+30)
			}
			blood.push(stuff);
		}
		
	}
	

*/