const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "logo.jpg";

let brightnessArray = [];
let particlesArray = [];
let rgbColorArray = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.brightness = 0;
    this.velocity = Math.random() * 3 + 0.1;
    this.radius = Math.random() * 0.5 + 1;
  }

  update() {
    this.y += this.velocity;
    if (this.y >= canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.brightness =
      brightnessArray[
        Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)
      ];
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle =
      rgbColorArray[Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)];
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i++) {
    const red = imageData.data[i * 4];
    const green = imageData.data[i * 4 + 1];
    const blue = imageData.data[i * 4 + 2];

    const brightness = (red + green + blue) / 3;
    brightnessArray.push(brightness);
    rgbColorArray.push(`rgb(${red},${green},${blue})`);
  }

  for (let i = 0; i < 5000; i++) {
    particlesArray.push(new Particle());
  }

  const animate = () => {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((e) => {
      e.update();
      ctx.globalAlpha = e.brightness * 0.002;
      e.draw();
    });
    requestAnimationFrame(animate);
  };
  animate();
};
