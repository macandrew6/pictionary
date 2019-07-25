import '../../dist/styles/drawing_pad.css';
import MediumSelector from './medium_controller/medium_selector';

class DrawingPad {
  constructor(mediumControls) {
    //include access to medium selector
    // new MediumSelector(); 
    this.mediumSelector = mediumControls.mediumSelector;

    this.canvas = document.getElementById('canvas');
    this.saveButton = document.getElementById('save-button');
    this.clearButton = document.getElementById('clear-button');
    this.canvas.setAttribute('width', 1200);
    this.canvas.setAttribute('height', 800);
    
    this.ctx = this.canvas.getContext('2d');

    this.drawBackgroundImage();
    this.painting = false;
    this.startPosition = this.startPosition.bind(this);
    this.endPosition = this.endPosition.bind(this);
    this.draw = this.draw.bind(this);
    this.save = this.save.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.canvas.addEventListener("mousedown", this.startPosition);
    this.canvas.addEventListener("mouseup", this.endPosition);
    this.canvas.addEventListener("mousemove", this.draw);
    this.saveButton.addEventListener('click', this.save);
    this.clearButton.addEventListener('click', this.clearCanvas);
  }

  drawBackgroundImage() {
    const background = new Image();
    background.onload = () => {
      this.ctx.drawImage(
        background,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    };
    background.src = '/dist/images/164077250-blackboard-wallpapers.jpg';
  }

  startPosition(e) {
    this.painting = true;
    this.draw(e);
  }

  endPosition() {
    this.painting = false;
    this.ctx.beginPath();
  }

  clearCanvas(e) {
    this.ctx.clearRect(
      0, 
      0, 
      this.ctx.canvas.width, 
      this.ctx.canvas.height
    );
    this.drawBackgroundImage();
  }

  draw(e) {
    if (!this.painting) return;
    // have a conditional regulating if custom medium was selected run this block of code
    // have a canvas drawImage method here:
    // have the image object created by the medium selector
    this.ctx.lineWidth = window.mediumSize;
    this.ctx.strokeStyle = window.rgb;
    this.ctx.lineCap = 'round';

    if(this.mediumSelector.currentCustomMediumImage) {
      this.ctx.drawImage(
        this.mediumSelector.currentCustomMediumImage, 
        e.offsetX,
        e.offsetY,
        100,
        100
      );
    } else {
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(e.offsetX, e.offsetY);
    }
  }

  save(e) {
    const savedCanvas = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.setAttribute('download', 'draw-that-thing.png');
    link.setAttribute('href', savedCanvas);
    link.click();
  }
  
}

export default DrawingPad;