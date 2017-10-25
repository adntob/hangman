function tegnVidere(teller,	flate, opacity, color) {				//* Det lages en egen funksjon for det tilfellet hvor vi ønsker å tegne videre, 
															//* onmouseover og for hendelsen hvor vi fjerner musa 
				
					
				
					//*	  flate, startx,starty,sluttx,slutty,bredde)
				
					switch (teller){
					
						case 1:
							flate.globalAlpha = opacity;
							flate.fillStyle = color;
							
							tegnLinje(flate,	150,	250,	300, 250,	5);
							break;
						
						case 2:
						
							flate.globalAlpha = opacity;
							tegnLinje(flate, 300, 250, 300, 300, 5);
							break;
							
						case 3:							
											// Fullsirkel sentrert i y=350 (300	+	r på 50), x=konstant
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

						case 13:
							flate.globalAlpha = opacity;
							tegnLinje(flate, 300, 350, 315,  350, 5);
							break;
						
						case 14:
							gameOver();
							break;
						
						default: 
							newRound();
							teller = 0;
							startgame()
							break;
						
					}
						
				
				}