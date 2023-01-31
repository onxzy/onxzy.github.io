window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

drawMovingText("ONXZY");
function drawMovingText(text) {
  const textPadding = -5;
  const baseSpeed = 0.1;
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
  if (!window.mobileAndTabletCheck()) {
    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
  
      mousePosition.x = (e.clientX - rect.left) * scaleX;
      mousePosition.y = (e.clientY - rect.top) * scaleY;
      // mousePosition[0] = e.clientX - rect.left;
      // mousePosition[1] = e.clientY - rect.top;
    });
  }
  
  
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


