"use strict";

var GestureRecognition = (function () {

  const config = {
    video: { width: 640, height: 480, fps: 30 },
  };

  const imageOrVideo = false;

  const landmarkColors = {
    thumb: 'red',
    indexFinger: 'blue',
    middleFinger: 'yellow',
    ringFinger: 'green',
    pinky: 'pink',
    palmBase: 'white',
  };

  const gestureStrings = {
    rock: '🤘',
    paper: '🧻',
    scissors: '💈'
  };

  function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  var isEvaluating = false;

  var gestureCallback = function(weapon) {
    console.log(weapon);
  };

  return {
    setGestureCallback: function(callback) {
      gestureCallback = callback;
    },
    startEvaluating: function() {
      isEvaluating = true;
      this.init();
    },
    init: async function () {

      const video = document.querySelector("#cam")
      const infoText = document.querySelector('#info-text');
      const detectedGesture = document.querySelector('.detected-gesture');
      const resultLayer = document.querySelector ('#pose-result');

      const rockGesture = new fp.GestureDescription('rock');
      rockGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
      rockGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
      rockGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
      rockGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
      rockGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

      const paperGesture = new fp.GestureDescription('paper');
      paperGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
      paperGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 0.5);
      paperGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.5);
      paperGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.5);
      paperGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.5);
      paperGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 0.5);
      paperGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.5);
      paperGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.5);

      paperGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.5);
      paperGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalDown, 0.5);
      paperGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 0.5);
      paperGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 0.5);

      paperGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 0.5);
      paperGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalDown, 0.5);
      paperGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.DiagonalUpLeft, 0.5);
      paperGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.DiagonalUpRight, 0.5);

      paperGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.5);
      paperGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalDown, 0.5);
      paperGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpLeft, 0.5);
      paperGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpRight, 0.5);

      paperGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
      paperGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
      paperGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
      paperGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
      paperGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl,  1.0);

      const scissorsGesture = new fp.GestureDescription('scissors');
      scissorsGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl,  1.0);
      scissorsGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
      scissorsGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
      scissorsGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
      scissorsGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

      scissorsGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
      scissorsGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 1.0);
      scissorsGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 0.5);
      scissorsGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 0.5);

      scissorsGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
      scissorsGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalDown, 1.0);
      scissorsGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalDownLeft, 0.5);
      scissorsGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalDownRight, 0.5);

      const knownGestures = [ rockGesture, paperGesture, scissorsGesture];
      const GE = new fp.GestureEstimator(knownGestures);

      const model = await handpose.load();
      console.log('Handpose model loaded');
      infoText.innerText =
        'Handpose model loaded successfully, starting predictions ✔';

      const estimateHands = async () => {
        var canvas = document.getElementById ('canvas');
        var ctx = canvas.getContext ('2d');
        ctx.clearRect(0, 0, config.video.width, config.video.height);
        resultLayer.innerText = '⭕';
        infoText.innerText = `Loaded model -> Prediction ⭕`;

        const canvasimg = document.querySelector('canvas');
        const canvasctx = canvasimg.getContext('2d');

        var imageData = canvasctx.getImageData(
          0,
          0,
          canvasimg.width,
          canvasimg.height
        );

        console.log(imageData);

        const predictions = await model.estimateHands(video, true);

        for (let i = 0; i < predictions.length; i++) {
          for (let part in predictions[i].annotations) {
            for (let point of predictions[i].annotations[part]) {
              drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
            }
          }

          const est = GE.estimate(predictions[i].landmarks, 6.5);

          if (est.gestures.length > 0) {
            let result = est.gestures.reduce((p, c) => {
              return p.confidence > c.confidence ? p : c;
            });
            console.log(gestureStrings[result.name]);

            gestureCallback(result);

            resultLayer.innerText = gestureStrings[result.name];
            infoText.innerText = `Prediction: ${gestureStrings[result.name]}`;
            detectedGesture.innerText = `${gestureStrings[result.name]}`;
          }
        }

        setTimeout(() => {
          estimateHands();
        }, 10000 / config.video.fps);
      };

      if(isEvaluating){
        estimateHands();
        console.log('isEvaluating - Starting predictions');
      }
    },
  }
})();