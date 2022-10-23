let mic;
let background_size = 800;
let fps = 30; 

// player
let player_size = 50;
let player_height = 0;
let dy = 5;

// target
let target_height = background_size / 5;
let target_size = background_size / 4;

// cronòmetre
let seconcs_to_win_parm = 3.;
let seconcs_to_win = seconcs_to_win_parm;

function setup(){
  frameRate(fps);
  let cnv = createCanvas(background_size, background_size);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  rectMode(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  textSize(100);
}

function draw(){
  if (seconcs_to_win<0)
  {
    background(0,255,0);
    return;
  }
  pintaSegonsQueFalten();
  let aux_y = pillaElVolumAmbient();
  pintaElTarget();
  pintaElPlayer(aux_y);
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
  text(Math.trunc(seconcs_to_win), width / 2, 120);
}

