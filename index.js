drawMovingText("ONXZY");
function drawMovingText(text) {
  const textPadding = -5;
  const baseSpeed = 0.5;
  const fontSize = 110;
  const baseFontWidth = 0.5;
  const bgColor = '#011627';
  const txtColor = '#033863';
  const angle = -Math.PI/5;




  const canvas = document.getElementById("moving_text_cvs");
  const context = canvas.getContext("2d"); 
  const lineNumber = Math.ceil(canvas.height / fontSize)*2;

  const speedMultiplier = [];
  const fontSizeMultiplier = [];
  for (let i = 0; i < lineNumber; i++) {
    speedMultiplier.push(0.5+Math.random())
    fontSizeMultiplier.push(0.6+0.8*Math.random())
  }

  const xOffsets = Array(lineNumber)

  const mousePosition = {x: canvas.width/2, y: canvas.height/2};
  document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

    mousePosition.x = (e.clientX - rect.left) * scaleX;
    mousePosition.y = (e.clientY - rect.top) * scaleY;
    // mousePosition[0] = e.clientX - rect.left;
    // mousePosition[1] = e.clientY - rect.top;
  });
  
  context.fillStyle = bgColor;
  context.textBaseline = 'top';
  context.lineWidth = baseFontWidth;  
  
  setInterval(() => {
    animate()
  }, 10);

  function animate() {
    context.resetTransform();
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);  
   
    context.translate(canvas.width/2, canvas.height/2);
    context.rotate(angle);
    context.translate(-canvas.width/2, -canvas.height/2); 

    var imatrix = context.getTransform().invertSelf();  
    const x_p = mousePosition.x * imatrix.a + mousePosition.y * imatrix.c + imatrix.e;
    const y_p = mousePosition.x * imatrix.b + mousePosition.y * imatrix.d + imatrix.f;

    const strokeGradient = context.createRadialGradient(x_p, y_p, 10, x_p, y_p, canvas.height/2);
    strokeGradient.addColorStop(0, txtColor);
    strokeGradient.addColorStop(1, bgColor);
    context.strokeStyle = strokeGradient;  

    var yOffset = -canvas.height/2;
    for (let i = 0; i < lineNumber; i++) {
      const textHeight = fontSize*fontSizeMultiplier[i%fontSizeMultiplier.length];
      context.font = `${textHeight}px Inter`;

      drawLine(i, baseSpeed*speedMultiplier[i%speedMultiplier.length], yOffset)

      yOffset += textPadding*fontSizeMultiplier[i%fontSizeMultiplier.length] + textHeight;
    }   
  }


  function drawLine(lineIndex, speed, y) {
    const textWidth = context.measureText(text + ' ').width;
    const blockSize = textWidth;
    const blockNumber = Math.ceil(canvas.width / blockSize);

    if (xOffsets[lineIndex] <= blockSize) {
      xOffsets[lineIndex] += speed;
    } else {
      xOffsets[lineIndex] = 0
    }

    let printText = '';
    for (let i = 0; i < (blockNumber + 1); i++) {
      printText += text;
      printText += ' ';
    }

    const x = xOffsets[lineIndex] - blockSize;
    context.strokeText(printText, x, y);
  }

}

titleAnimation(1000);
function titleAnimation(delay) {
  const title_cursor = document.getElementById('title_cursor')
  let i = 0;

  setInterval(() => {
    i = i ? 0 : 1;
    title_cursor.style.opacity = i;
  }, delay);

  const title = document.getElementById('title');
  title.innerText = '';

  setTimeout(() => {
    printText(title, 'onxzy', 100)
  }, 500);

  function printText(element, remainingText, speed) {
    if (!remainingText) return
    setTimeout(() => {
      element.innerText += remainingText[0];
      printText(element, remainingText.slice(1), speed) ;
    }, speed);
  }
}

