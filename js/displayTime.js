var Clock = function(timezone, canvas) {
    this.timezone = timezone;
    this.canvas = canvas
}


Clock.prototype.displayTime = function(val) {
    var date = new Date();
	var h = date.getHours() + val;
	var m = date.getMinutes();
	var s = date.getSeconds();
    var ctx = this.canvas.getContext("2d");
    var radius = 200;
    var x = this.canvas.width / 2;
    var y = this.canvas.height / 2;
  
    function drawHand(shift, armLength, armColor, armWidth) {
        angle = (2 * Math.PI * shift) - (Math.PI / 2);
        var pointX = x + (Math.cos(angle) * (armLength * radius));
        var pointY = y + (Math.sin(angle) * (armLength * radius));

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(pointX, pointY);
        ctx.strokeStyle = armColor
        ctx.lineWidth = armWidth
        ctx.stroke();
    };
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	drawHand((h + (m / 60))/ 12, 0.50, '#000000', 10); // Hour
	drawHand(m / 60, 0.75, '#000000', 5); // Minute
	drawHand(s / 60, 0.90, '#a32638', 3); // Second

    function outerClockFrame() {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 5;
        ctx.stroke();
    };
    outerClockFrame();

    function hourMarkings(armLength) {
        for (var i = 0; i < 12; i++) {
            angleInRadians = (2 * Math.PI * i / 12) - (Math.PI / 2);
            ctx.lineWidth = 10;
            ctx.beginPath();

            var x1 = x + (Math.cos(angleInRadians) * (radius));
            var y1 = y + (Math.sin(angleInRadians) * (radius));
            var x2 = x + (Math.cos(angleInRadians) * ((armLength + armLength/2) * radius));
            var y2 = y + (Math.sin(angleInRadians) * ((armLength + armLength/2) * radius));

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = '#000000';
            ctx.stroke();
        }
    };
    hourMarkings(0.50);
}

var clock1 = new Clock("(UTC+01)", document.getElementById("clock1"));
var clock2 = new Clock("(UTC+01)", document.getElementById("clock2"));
var clock3 = new Clock("(UTC+01)", document.getElementById("clock3"));

function loadFunction() {
    setInterval(function() {
        clock1.displayTime(0);
    }, 1000)
}

function changeTime() {
    var date = new Date();
    var e = document.getElementsByClassName("timeZones");
    setInterval(function() {
        clock3.displayTime(Number(e[1].value));
        clock2.displayTime(Number(e[0].value));
        clock1.displayTime(0);
    }, 1000)
}