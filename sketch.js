let mic;
let background_size = 800;
let fps = 30; 

// player
let player_size = 50;
let player_height = 0;
let dy = 5;

// target
let target_height = 200; // 300
let target_size = 300; // 100;
let started = false;
let count_down = 20.;


// cronòmetre
let seconcs_to_win_parm = 5.;
let seconcs_to_win = seconcs_to_win_parm;

// Pantalla de victoria
let confettiColor = [];
let confetti = [];

let missatgesVictoria = ["Felicitats", "Heu guanyat!", "Molt be, ja podeu deixar de fer soroll :D"];
let missatgeVictoria = "";

const randomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

function setup(){
  frameRate(fps);
  let cnv = createCanvas(background_size, background_size);
  cnv.mousePressed(onStart);
  textAlign(CENTER);
  rectMode(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  textSize(100);

  confettiColor = [color('#00aeef'), color('#ec008c'), color('#72c8b6')];
  for (let i = 0; i < 100; i++) {
    confetti[i] = new Confetti(random(0, width), random(-height, 0), random(1, 5));
  }

  missatgeVictoria = missatgesVictoria[randomNumber(missatgesVictoria.length)];
}

function onStart()
{
  userStartAudio();
  started = true;

}

function draw(){
  if (seconcs_to_win<0)
  {
    background(51);
    confetti.forEach(c => c.confettiDisplay());

    textSize(30);
    text(missatgeVictoria, 150, 120);
    textAlign(LEFT, TOP);
    return;
  }

  if (count_down<0)
  {
    background(255,0,0);
    return;
  }

  ticTacBaixenSegons();
  pintaSegonsQueFalten();
  let aux_y = pillaElVolumAmbient();
  pintaElTarget();
  pintaElPlayer(aux_y);
}

function ticTacBaixenSegons() {
  if (started)
    count_down -= 1. / fps;
}

function pintaElPlayer(aux_y) {
  let isInside = (Math.abs(player_height - target_height) < (target_size - player_size) / 2);
  let c = isInside ? color(0, 255, 0) : color(0, 0, 255);
  fill(c);
  seconcs_to_win = isInside ? seconcs_to_win - (1. / fps) : seconcs_to_win_parm;
  player_height = player_height - dy;
  if (player_height < 0)
    player_height = 0;
  if (aux_y > player_height)
    player_height = aux_y;
  rect(width / 2, background_size - player_height, player_size, player_size);
}

function pintaElTarget() {
  fill(255, 204, 0);
  rect(width / 2, background_size - target_height, target_size, target_size);
}

function pillaElVolumAmbient() {
  micLevel = mic.getLevel();
  let aux_y = map(micLevel, 0., 1., 0, background_size);
  return aux_y;
}

function pintaSegonsQueFalten() {
  background(0);
  fill(255);
  text(Math.trunc(seconcs_to_win), 200, 120);
  text(Math.trunc(count_down), 600, 120);
}

