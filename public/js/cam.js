/*
 *  Copyright 2016 Google Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License")
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

/**
 * Module for controlling the Web Camera
 */

var Cam = (function() {
    var cam;

    var preview;
    // Exported functions
    return {

        /*
        * Gets the Web Camera from getUserMedia and connects it to
        * the #cam video element.
        * */
        init: function() {
            cam = document.querySelector("#cam");

            preview = document.querySelector("#preview");

            console.log("Attempting to connect webcam...");
            
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia.call(navigator, {
                video: true,
                audio: false //optional
            }, function (stream) {

                cam.srcObject = stream;
                cam.play();

                preview.srcObject = stream;
                preview.play();

                GestureRecognition.startEvaluating();
            });
        }
    }
})();
