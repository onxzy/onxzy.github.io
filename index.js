drawMovingText("ONXZY");
function drawMovingText(text) {
  const textPadding = [5, -5];
  const baseSpeed = 0.5;
  const baseFontSize = 100;
  const baseFontWidth = 0.5;
  const lineNumber = 25;
  const bgColor = '#011627';
  const txtColor = 'rgba(3, 70, 124, 0.8)';
  // const txtAlpha = 1;

  const speedMultiplier = [];
  const fontSizeMultiplier = [];

  for (let i = 0; i < lineNumber; i++) {
    speedMultiplier.push(0.5+Math.random())
    fontSizeMultiplier.push(0.6+0.8*Math.random())
  }

  const canvas = document.getElementById("moving_text_cvs");
  const context = canvas.getContext("2d");    
  context.textBaseline = 'top';
  context.lineWidth = baseFontWidth;

  setInterval(() => {
    animate()
  }, 16);


  const xOffsets = Array(lineNumber)

  function animate() {            
    // Clear screen
    context.fillStyle = bgColor;
    context.globalAlpha = 1;
    context.fillRect(0, 0, canvas.width, canvas.height);  
    context.strokeStyle = txtColor;
    // context.globalAlpha = txtAlpha;
    
    var yOffset = 0;
    for (let i = 0; i < lineNumber; i++) {
      const textHeight = baseFontSize*fontSizeMultiplier[i%fontSizeMultiplier.length];
      context.font = `${textHeight}px Inter`;
      // context.lineWidth = baseFontWidth*fontSizeMultiplier[i%fontSizeMultiplier.length];

      drawLine(i, baseSpeed*speedMultiplier[i%speedMultiplier.length], yOffset, textPadding[0]*fontSizeMultiplier[i%fontSizeMultiplier.length])
      
      yOffset += textPadding[1]*fontSizeMultiplier[i%fontSizeMultiplier.length] + textHeight;
    }   
  }


  function drawLine(lineIndex, speed, y, padding) {
    const textWidth = context.measureText(text).width;
    const blockSize = textWidth + padding;
    const blockNumber = Math.ceil(canvas.width / blockSize);

    if (xOffsets[lineIndex] <= blockSize) {
      xOffsets[lineIndex] += speed;
    } else {
      xOffsets[lineIndex] = 0
    }

    for (let i = 0; i < (blockNumber + 1); i++) {
      context.strokeText(text, xOffsets[lineIndex] + (i-1)*blockSize, y);
    }
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
}



