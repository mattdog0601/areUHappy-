var framerate = 60
var canvasCreated = false
var backgroundColor = "#ffffff"
var mouseYOld = 0
var mouseXOld = 0
var mouseX = 0
var mouseY = 0
var mousevel = 0
var canvasOn = true;

function chicken(){
	setup()
}

function noCanvas(){
	canvasOn = false;
	console.log("Canvas Deactivated")
}

function setFramerate(num){
	if(num <= 1000){
		framerate = num
	}else{
		throw "Framerate can not be any bigger than 1000";
	}
}

function noise(noiseAmount, startNoise){

}

function Canvas(){

	var canvas
	var ctx

	this.height = 150
	this.width = 300
	this.backgroundColor = "#fff00f"
	this.color = "#000000"
	this.creatingShape = false
	this.vertexs = []
	this.lineWidth = 1
	this.context
	this.interpolation = true

	if(canvasOn){
		var drawTimer = setInterval(function(){
			draw()
		}, 1000 / framerate)
	}else{
		canvasCreated = true
	}

	if(!canvasCreated){
		document.body.innerHTML += "<canvas id='CHICKEN_CANVAS'></canvas>"
		document.body.style.margin = "0px"
	}

	if(canvasOn){
		canvas = document.getElementById("CHICKEN_CANVAS")
		ctx = canvas.getContext("2d")
		this.context = ctx
		this.setWidth = function(w){
			if(typeof w == 'number'){
				canvas.width = w
				this.width = canvas.width
			}else{
				if(typeof w == 'string'){
					var percent = w.split("")[w.split("").length - 1]
					if(percent == "%"){
						var num = parseInt(w.substring(0, w.length - 1))
						if(num > 100){
							num = 100
						}
						canvas.width = window.innerWidth * (num / 100)
						this.width = canvas.width
					}else{
						throw "Invalid width number"
					}
				}
			}
		}

		this.setHeight = function(w){
			if(typeof w == 'number'){
				canvas.height = w
				this.height = canvas.height
			}else{
				if(typeof w == 'string'){
					var percent = w.split("")[w.split("").length - 1]
					if(percent == "%"){
						var num = parseInt(w.substring(0, w.length - 1))
						if(num > 100){
							num = 100
						}
						canvas.height = window.innerHeight * (num / 100)
						this.height = canvas.height
					}else{
						throw "Invalid width number"
					}
				}
			}
		}

		this.setBackgroundColor = function(color){
			this.backgroundColor = color;
		}

		this.reset = function(){
			ctx.imageSmoothingEnabled = this.interpolation
			ctx.fillStyle = this.backgroundColor
			ctx.fillRect(0, 0, this.width, this.height)
			ctx.imageSmoothingEnabled = this.interpolation
		}

		this.rect = function(x, y, w, h, c, hollow){
			if(hollow == false || hollow == undefined){
				if(c != undefined){
					ctx.fillStyle = c
				}else{
					ctx.fillStyle = "#ffffff"
				}
				ctx.fillRect(x, y, w, h)
			}else{
				if(c != undefined){
					ctx.strokeStyle = c
				}else{
					ctx.strokeStyle = "#ffffff"
				}
				ctx.strokeRect(x, y, Math.abs(w), Math.abs(h))
			}
		}

		this.line = function(x1, y1, x2, y2, weight){
			if(weight == undefined){
				ctx.beginPath()
				ctx.lineWidth = 1
				ctx.strokeStyle = this.color
				ctx.moveTo(x1, y1)
				ctx.lineTo(x2, y2)
				ctx.stroke()
			}else{
				ctx.beginPath()
				ctx.lineWidth = weight
				ctx.strokeStyle = this.color
				ctx.moveTo(x1, y1)
				ctx.lineTo(x2, y2)
				ctx.stroke()
			}
		}

		this.circle = function(x, y, r, c, bc, bt){
			if(c){
				if(!bc){
					if(!bt){
						ctx.beginPath();
						ctx.arc(x,y,r + bt,0,2*Math.PI)
						ctx.fillStyle = "#000000"
						ctx.fill();
						ctx.beginPath();
						ctx.arc(x,y,r,0,2*Math.PI)
						ctx.fillStyle = c
						ctx.fill();
					}else{
						ctx.beginPath();
						ctx.arc(x,y,r + 1,0,2*Math.PI)
						ctx.fillStyle = "#000000"
						ctx.fill();
						ctx.beginPath();
						ctx.arc(x,y,r,0,2*Math.PI)
						ctx.fillStyle = c
						ctx.fill();
					}
				}else{
					if(!bt){
						ctx.beginPath();
						ctx.arc(x,y,r + 1,0,2*Math.PI)
						ctx.fillStyle = bc
						ctx.fill();
						ctx.beginPath();
						ctx.arc(x,y,r,0,2*Math.PI)
						ctx.fillStyle = c
						ctx.fill();
					}else{
						ctx.beginPath();
						ctx.arc(x,y,r + bt,0,2*Math.PI)
						ctx.fillStyle = bc
						ctx.fill();
						ctx.beginPath();
						ctx.arc(x,y,r,0,2*Math.PI)
						ctx.fillStyle = c
						ctx.fill();
					}
				}
			}else{
				ctx.beginPath();
				ctx.arc(x,y,r,0,2*Math.PI)
				ctx.stroke();
			}
		}
	}

	this.beginShape = function(x,y){
		this.vertexs = []
		if(!this.creatingShape){
			this.creatingShape = true;
			this.vertexs = [returnVector(x, y)]
			this.creatingShape = true
		}
	}

	this.addVertex = function(x,y){
		this.vertexs.push(returnVector(x,y))
	}

	this.endShape = function(hollow){
		ctx.lineWidth = this.lineWidth
		ctx.beginPath()
		ctx.moveTo(this.vertexs[0].x, this.vertexs[0].y)
		for(var i = 0; i < this.vertexs.length; i++){
			ctx.lineTo(this.vertexs[i].x, this.vertexs[i].y)
		}
		ctx.closePath()
		if(!hollow){
			ctx.fillStyle = this.color
			ctx.fill()
		}else{
			ctx.strokeStyle = this.color
			ctx.stroke()
		}
		this.creatingShape = false
		this.vertexs = []
	}

	this.drawImage = function(x,y,width,height,src,alpha){
		if(alpha){
			ctx.globalAlpha = alpha
		}
		if(document.getElementById(src) == undefined){
			document.head.innerHTML += '<img width="16px" height="16px" src=' + src + ' id=' + src + '></img>'
		}
		var img = document.getElementById(src)
		ctx.drawImage(img, x, y, width, height);
		ctx.globalAlpha = 1.0
		document.getElementById(src).outerHTML = ""
	}
}

function random(min, max){
	return Math.random() * (max - min) + min;
}

document.onmousemove = function(e){
	mouseX = e.clientX
	mouseY = e.clientY
}

function Mouse(){
	this.velocity = calcMouseVel()
	this.slope = (mouseY - mouseYOld) / (mouseX - mouseXOld)
	if(isNaN(this.slope)){
		this.slope = 0
	}
	if(mouseY != mouseYOld && mouseX != mouseXOld){
		mouseYOld = mouseY
		mouseXOld = mouseX
	}
	this.x = mouseX
	this.y = mouseY
	this.lastx = mouseXOld
	this.lasty = mouseYOld
}

function returnVector(x, y){
	return {x:x, y:y}
}

function createVector(x, y){
	this.x = 0
	this.y = 0
	this.firstx = 0
	this.firsty = 0
	this.min = null
	this.max = null

	if(x != undefined){
		this.x = x;
		this.firstx = x
	}

	if(y != undefined){
		this.y = y;
		this.firsty = y
	}

	this.add = function(vector2){
		if(typeof vector2 == "object"){
			this.x = this.x + vector2.x
			this.y = this.y + vector2.y
		}
		if(typeof vector2 == "number"){
			this.x = this.x * vector2
			this.y = this.y * vector2
		}
	}

	this.sub = function(vector2){
		if(typeof vector2 == "object"){
			this.x = this.x - vector2.x
			this.y = this.y - vector2.y
		}
		if(typeof vector2 == "number"){
			this.x = this.x - vector2
			this.y = this.y - vector2
		}
	}

	this.mult = function(vector2){
		if(typeof vector2 == "object"){
			this.x = this.x * vector2.x
			this.y = this.y * vector2.y
		}
		if(typeof vector2 == "number"){
			this.x = this.x * vector2
			this.y = this.y * vecttor2
		}
	}

	this.div = function(vector2){
		if(typeof vector2 == "object"){
			this.x = this.x / vector2.x
			this.y = this.y / vector2.y
		}
		if(typeof vector2 == "number"){
			this.x = this.x / vector2
			this.y = this.y / vector2
		}
	}

	this.constrain = function(min, max, miny, maxy ){
		this.min = min
		this.max = max
		if(miny != undefined && maxy != undefined){
			this.miny = miny
			this.maxy = maxy

			if(this.y < min){
				this.y = this.miny
			}
			if(this.y > max){
				this.y = this.maxy
			}
		}else{
			if(this.y < min){
				this.y = this.min
			}
			if(this.y > max){
				this.y = this.max
			}
		}

		if(this.x < min){
			this.x = this.min
		}
		if(this.x > max){
			this.x = this.max
		}
	}

	this.reset = function(){
		this.y = this.firsty
		this.x = this.firstx
	}

	this.zero = function(vector2){
		if(typeof vector2 == 'number'){
			if(this.x <= 0){
				this.x += Math.abs(vector2)
			}else{
				if(this.x >= 0 ){
					this.x -= Math.abs(vector2)
				}
			}

			if(this.y <= 0 ){
				this.y += Math.abs(vector2)
			}else{
				if(this.y >= 0 ){
					this.y -= Math.abs(vector2)
				}
			}
		}
		if(typeof vector2 == 'object'){
			if(this.x <= 0){
				this.x += Math.abs(vector2.x)
			}else{
				if(this.x >= 0 ){
					this.x -= Math.abs(vector2.x)
				}
			}

			if(this.y <= 0 ){
				this.y += Math.abs(vector2.y)
			}else{
				if(this.y >= 0 ){
					this.y -= Math.abs(vector2.y)
				}
			}
		}
	}
}

function calcMouseVel(){
	mousevel = Math.sqrt(((mouseX - mouseXOld)*(mouseX - mouseXOld)) + ((mouseY - mouseYOld)*(mouseY - mouseYOld)))
}

function constrain(num, min, max){

	if(num == undefined){
		throw "Must constrain variable"
	}

	if(min == undefined){
		throw "Must input minimum value"
	}

	if(max == undefined){
		throw "Must input maximum value"
	}

	if(num >= max){
		num = max
	}
	if(num <= min){
		num = min
	}
	return num;
}


(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    if (nodecrypto) { return tostring(nodecrypto.randomBytes(width)); }
    var out = new Uint8Array(width);
    (global.crypto || global.msCrypto).getRandomValues(out);
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

Number.prototype.constrain = function(min, max){
	if(this.valueOf() > max){
		return max
	}
	if(this.valueOf() < min){
		return min
	}
	return this.valueOf()
}

Number.prototype.constrainMax = function(max){
	if(this.valueOf() > max){
		return max
	}
	return this.valueOf()
}

Number.prototype.constrainMin = function(min){
	if(this.valueOf() < min){
		return min
	}
	return this.valueOf()
}

Object.defineProperty(Object.prototype, 'constrain', {
	enumerable: false,
    value: function(min, max) {
		var array = this.valueOf()
		for(var i = 0; i < array.length; i++){
			if(array[i] > max){
				array[i] = max
			}
			if(array[i] < min){
				array[i] = min
			}
		}
		return array
	}
});

Object.defineProperty(Object.prototype, 'constrainMax', {
	enumerable: false,
    value: function(max) {
		var array = this.valueOf()
		for(var i = 0; i < array.length; i++){
			if(array[i] > max){
				array[i] = max
			}
		}
		return array
	}
});

Object.defineProperty(Object.prototype, 'constrainMin', {
	enumerable: false,
    value: function(min) {
		var array = this.valueOf()
		for(var i = 0; i < array.length; i++){
			if(array[i] < min){
				array[i] = min
			}
		}
		return array
	}
});

function randomSeed(seed, min, max){
	Math.seedrandom(seed)
	if(min && max){
		return Math.random() * (max - min) + min
	}else{
		return Math.random()
	}
	Math.seedrandom()
}

function Noise(noise, steps, startingValue, seed, negativeNoise){
	steps += 1
	if(seed){
		Math.seedrandom(seed)
	}
	if(noise > 0){
		if(startingValue){
			var noiseValues = []
			noiseValues.push(startingValue)
		}else{
			var noiseValues = []
			noiseValues.push(0)
		}
		if(negativeNoise){
			for(var i = 1; i < steps; i++){
				noiseValues.push(noiseValues[i - 1] + random(-noise,noise))
			}
		}else{
			for(var i = 1; i < steps; i++){
				noiseValues.push(Math.abs(noiseValues[i - 1] + random(-noise,noise)))
			}
		}

		for(var i = 0; i < Math.floor(noiseValues.length / 2); i++){
			noiseValues[i] = (noiseValues[i] + noiseValues[noiseValues.length - 1 - i]) / 2
		}
		var j = -1
		for(var i = Math.floor(noiseValues.length - 1 / 2); i > 0; i--){
			j++
			noiseValues[i] = (noiseValues[i] + noiseValues[j]) / 2
		}

		Math.seedrandom()
		return noiseValues
	}else{
		throw "Noise value must be > 0"
	}
}

function Slider(min, max){
	var x = document.createElement("INPUT");
	x.setAttribute("type", "range");
	x.min = min
	x.max = max
	document.body.appendChild(x);
	this.slider = x
}

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}



function Draw(functionName, framerate){
  if(functionName && typeof functionName == 'function'){
    this.drawFunction = functionName
    this.framerate = framerate
		if(framerate && typeof framerate == "number"){
			this.framerate = framerate
		}else{
			this.framerate = 60
		}

		setInterval(functionName, 1000 / this.framerate)
  }else{
    throw "No function defined for Draw()"
  }
}
