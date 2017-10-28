
		///////////////////
		//	Algoritme//
		//////////////////	
	/*	
	
	 1). Ta imot en bokstav
	
	 2). Sjekk imot et tilfeldig ord om denne inneholder denne eksakte bokstaven
	
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
		
	
		 5) Småplukk i GUI

		 6). Lag gratulasjonsskjerm og gameover-skjerm
		 
		7). Lag timer
		
		8). Lag high-score som kan lastes opp vha. PHP
		 
		9) Rett opp div spaghetti-kode (særlig på sjekk)
		 */


		 
	//////////////////////////
	//	Globale variabler	//
	/////////////////////////
	
		

	var points = 0; /*Holder rede på antall ganger du har tapt/vunnet */
	
	var round = 0;	
	
	var blood = [ ];
	
	const height = 700;
	
	const width = 600;
	
	var ctx;
	
	var teller	=	0;		// *Teller for feil/riktig ord
	
	var indexCategory;	/* Brukerdefinert index på nedtreksliste*/
	
	var ordRett = [ ];
	
	var ordFeil = [ ];
	
	var ord;
	
	var rainingBlood;
	
	var colors = ["red", "blue", "yellow", "orange", "purple", "cyan", "green", "gray", "maroon", "peach", "sand", "rainbow"];
	
	var confettio = [ ];
	
	var ordArray = [ ];
	
	var q = 0;			// Inkrement for teksten som flytter seg på startmenyen, alle andre i er lokale i for-løkker; "bruk/kast"
	

	
	///////////////////
	//	Oppstart 	//
	/////////////////
	

	window.onload  = run;
	
	function run() {
		
		
		createOption(document.getElementById("lstCategory"), kategorier);
		ctx = document.getElementById("lerret").getContext("2d");
		ctx2 = document.getElementById("lerret2").getContext("2d");
		document.getElementById("btnSubmit").onclick = sjekk;
		document.getElementById("btnSubmit").disabled = true;
		document.getElementById("btnStart").onclick = startgame;
		intervallfunksjon	=	setInterval(startmeny,100);	/*Startmeny-oppdateres hvert 1^-10 sekund */
	}
	
	
	
		//////////////////////////////////////////////////////////////////////////////////////////
		//	Modul av oppgaven som har med bevegelig startmeny, og et dynamisk brukergrensesnitt	//
		/////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	function startmeny() {
		
		document.getElementById("btnStart").disabled = false; 
		
		clean(ctx,"white", width, height);
		
		var farge;
		
		if (	q	<=0	) {
		
			deltaX = 15;
			farge = colors[Math.floor(Math.random()*colors.length)]
		}
		
		if (	q >=	width-300	){
		
			deltaX = -deltaX;
			farge = colors[Math.floor(Math.random()*colors.length)]
		}
		
		skrivtekst(ctx, "Press Start", "60px Arial", q,150, 1, farge, farge)
		
		q +=deltaX;
		
	}
	
	
	////////////////////////////////////////
	///*Lag et dynamisk brukergrensesnitt //
	////////////////////////////////////////

	
	
	
	function createOption(tagName,	arrayName){
	
		/*Denne f(x) lager en nedtrekksliste basert på array med en mengde kategorier og tagId for listen, alle får en numerisk verdi [0, array-lengde)*/
	
		for (var i = 0, l = arrayName.length; i < l ; i++){
			
			
				var newElement = document.createElement("option");
				newElement.innerHTML = arrayName[i];
				
				if (i === arrayName.length - 1){
				
					newElement.value = Math.floor(Math.random()*l	)	
				}
					
				else{
					
					newElement.value = i;	
				}
				
				tagName.appendChild(newElement);
		}
	}
	
	
	
	
	function trekkord(){
		
		indexCategory = document.getElementById("lstCategory").value;
		
		var rand = Math.floor(Math.random()*ordliste[indexCategory].length);
		
		ord = ordliste[indexCategory][rand];
		
		ordArray = ord.split("");
	
	}
	
	
	/* Erstatter bokstaver i et ord med _ */
	
	
	function understrekOrd() {
	
		for (var i= 0, l = ordArray.length; i<l ; i++)
		
		ordRett[i] = "_";
	}
		
	
	function startgame() {
		
		clearInterval(rainingBlood);
		
		round += 1;
		document.getElementById("txtRounds").innerHTML = round;
		document.getElementById("txtPoints").innerHTML = points;
		
		clearInterval(	intervallfunksjon	);	//*Deaktiver tidsintervall-lytteren ved trykk på startknappen
		/*Disable/enable knapper*/
		
		document.getElementById("btnSubmit").disabled = false;
		document.getElementById("btnStart").disabled = true;
		//* Grunnstruktur skisse
		
		clean(ctx,"white", width, height);
		
		tegnLinje(ctx, 0,	680,	width,	680,	5);					
		tegnLinje(ctx, 150,	680,	150, 250, 5);
		tegnLinje(ctx, 75, 680, 150, 600, 5);
		tegnLinje(ctx, 225, 680, 150, 600, 5);
		
		/*Kjør mange stokastiske funksjoner tilknyttet ord/display */
		
		trekkord();
		understrekOrd();
		
		clean(ctx,"white", width, 200);
		skrivtekst(ctx, ordRett.join(""), "60px Arial", 50,150, 1, "white", "black") ;
		
		document.getElementById("paragrafHint").style.display = "inline-block";
		document.getElementById("btnHint").onclick = showHint;
		
	}

		
	
	/////////////////////////////////////////////////////////
	// *Modul som har med å sjekke tekstinputten å gjøre	 
	/////////////////////////////////////////////////////////

	
function sjekk() {
		
	
	var	bokstav = document.getElementById("txtBokstav").value.toLowerCase();
	
	var criterion = false;
			
			/*Sjekk om bokstaven er skrevet inn allerede, vi går ut ifra at den ikke er det */
			
			/*Sjekk deretter om ord-array inkluderer bokstav*/
			
			/* Både Java og C# har en liknende funksjon som includes for arrayer, derfor brukter jeg denne med god samvittighet...*/
		
		
		
		if (ordFeil.includes(bokstav)||ordRett.includes(bokstav)	=== true){
			alert ('Du har allerede skrevet inn denne bokstaven')
			criterion = true;
		}
		
		
		if (criterion === false){
		
			if (	ordArray.includes(	bokstav	) ) {
			
				for (	var i = 0, l = ordArray.length; i	<	l; i++	){
					
						if (	ordArray[i] === bokstav ) {
							
							ordRett[i] = bokstav;
							points += 50;
							
						}	
					}	
				}	
			

			else {
				
				ordFeil.push(	bokstav	);
				teller++;
				points -= 30;
			}
			
			clean(ctx,"white", width, 200);
			skrivtekst(ctx, ordRett.join(""), "60px Arial", 50,150, 1, "white", "black") ;
	}
		
		/*Hvis hele ordRett-arrayen (loddet sammen) er lik ordet, kjør gratulasjonsskjerm */
		
		if (ordRett.join("") === ord){
		
			gratulerer()
		}

		if (teller >0){
			
			document.getElementById("utskriftFeil").innerHTML	=	ordFeil.join(", ");
			
			tegnVidere(teller,ctx, 1.0, "black");
			
		}
		
		document.getElementById("txtPoints").innerHTML = points;
		
	}
	

		//* Funksjon for det tilfellet hvor vi ønsker å tegne videre ut ifra oppnådde poeng, case/switch. 

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
			
				flate.globalAlpha = opacity;			//* Øye
				tegnLinje(flate, 325, 325, 310, 310, 5);
				tegnLinje(flate, 310, 325, 325, 310, 5);
				break;
					
			case 10:
			
				flate.globalAlpha = opacity;
				tegnLinje(flate, 290, 325, 280, 310, 5);
				tegnLinje(flate, 280,325, 290, 310, 5);	
				break;
		
			case 11: // Munn og game-over
						
				flate.globalAlpha = opacity;
				tegnLinje(flate, 300, 350, 315,  350, 5);
				setTimeout(gameOver, 1000);
				break;
			
		}	
	}
	
		
		///////////////////////////////////////////
		// Gratulerer, game-over og neste runde //
		/////////////////////////////////////////
	
	//Konfetti tegnes ifra toppen av skjermen (y=0) til bunnen. ifra x=0 til x=width
	/*
	function drawConfetti(){
		clean(ctx2, "white", 0,0)
		for (i=0, l = confettio.length; i<l; i++){
			drawCircles(ctx2, "red", confettio[i].x, confettio[i].y, confettio[i].r)
			confettio[i].y=+1;
		}
		
	}
	*/
		
	function gratulerer() {
			
			clean(ctx,"yellow", width, height)			
			skrivtekst(ctx, "A winner is", "60px Arial", width/4,height/3, 5, "red", "red")
			skrivtekst(ctx, "YOU!", "60px Arial", width/4, 2*height/5, 5, "red", "red")
			
			//defineRandomCircles(100, confettio, 0, 0, width, 0, 0, 5);
			setInterval(drawConfetti(), 200);
			document.getElementById("btnStart").disabled = false;
			document.getElementById("btnSubmit").disabled = true;
			
			newRound()
			
		}
	
	
	/* Game over-skjerm og resetter variablene */
			
	// I prinsippet kunne jeg ha sløyfet mange av funksjonene vha. å bruke objektorientert, og ha this.		

	function drawBlood() {
	
		for(var k = 0; k<blood.length; k++)
			
			if (k%3 ===0)
			{
				{	
				drawCircles(ctx, "red", blood[k].x, blood[k].y, blood[k].r)
				blood[k].y += Math.random()*1;
			}
		}
			
	}		
			
			
	
	function gameOver() {
				
				alert('Ordet var ' + ord)
				
				clean(ctx,"black", width, height)
				skrivtekst(ctx, "YOU ARE", "60px Arial", width/4, height/3, 5, "red", "red")
				skrivtekst(ctx, "DEAD!!!!", "60px Arial", width/4, 2*height/5, 5, "red", "red")	
				
				defineRandomCircles(100, blood, width/4, 0, width*Math.random()/2, 285, Math.random(), 2);
				
					/*Tegner den statiske delen av skjermen*/
					for(var k = 0; k<blood.length; k++)
						
					{	
						drawCircles(ctx, "red", blood[k].x, blood[k].y, blood[k].r)
					
						}
				
				rainingBlood =  setInterval(drawBlood, 100);
					
				playAudio('ganondorflaugh.mp3')	
				
				document.getElementById("btnStart").disabled = false;
				document.getElementById("btnSubmit").disabled = true;
				
				newRound();
		}
		
	
	// Ny runde, ved game over/gratulerer: teller, ordFeil & ordRett resettes
	
	
	function newRound() {
		document.getElementById("utskriftFeil").innerHTML = "";
		teller = 0;	
		
		for	(var i = 0, l = ordFeil.length; i	<=	l ; i++){	
		
			ordFeil.splice(i);
			
			}
		
		ordRett = [ ];	
	}


	

	///////////////////////////////////////////////////////////
   ///	Modul av oppgaven som har med tegnefunksjoner å gjøre//
  ////////////////////////////////////////////////////////////


	//* Rensing av skjerm
	
	function clean(kontekst,farge, tilX, tilY) {
		
		kontekst.beginPath();
		kontekst.fillStyle = farge;
		kontekst.fillRect(0,0,tilX, tilY);
	}
	
	
	
	//skriving av tekst
	
	function skrivtekst(kontekst, ord, typeTekst, x,y, linjestorrelse, fillstyle, strokestyle) {
	
		kontekst.beginPath();
		kontekst.lineWidth=linjestorrelse;
		kontekst.font = typeTekst;
		kontekst.strokeStyle = strokestyle;
		kontekst.fillStyle = fillstyle;
		kontekst.strokeText(ord	, x, y	);
		kontekst.stroke();	
	}
	
	//* Generalisert funksjon for å tegne linjer *//
	
	
	function tegnLinje(kontekst,	fraX,	fraY,	tilX, tilY,	bredde){
	
		kontekst.beginPath();
		kontekst.lineWidth =	bredde;
		kontekst.strokeStyle = "black";
		kontekst.moveTo(fraX,fraY);
		kontekst.lineTo(tilX,tilY);
		kontekst.stroke();
	
	}
	
	/* Denne brukes for å tegne blod på gameover-skjermen, samt konfetti på gratulasjonsskjermen  */
	
	
	
	function drawCircles(kontekst, colour,	x,	y,	rmax) {	
		
		kontekst.beginPath();
		kontekst.fillStyle = colour;
		kontekst.strokeStyle = colour
		kontekst.arc (x, y, rmax, 0, 2*Math.PI)
		kontekst.stroke();
		kontekst.fill();
		
	}
	
	function defineRandomCircles(amount, obj, fraX, fraY, tilX, tilY, minRad, maxRad) {			//(mengde, objekt, fraX, fraY, tilX, tilY, minRad,maxRad)
		
		for (var i = 0, l = amount; i<l; i++){
			var stuff = 
				{
				x: Math.floor(fraX + Math.random()*tilX ),
				y: fraY + tilY,
				r: Math.floor(minRad +	maxRad)
			}
			obj.push(stuff);
		}
		
	}
	
	function showHint() {
		
		points -=Math.pow(10, 10)
		alert('Juksepave :O' + " " + "ordet er" + " " + " '" + ord + "' ")
	}
	
	
