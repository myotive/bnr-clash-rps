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


/**
 * This is just a place to put all your API authentication keys
 */
Config = function() {
    return {
        // You will need to replace with your own Firebase configuration
        // This can be retrieved from clicking "Add App" from the project overview page.
        firebase: {
            apiKey: "AIzaSyCm-zEg-JTrulifd6tRB4WLlFkCwzrvf3c",
            authDomain: "bnr-clash-rps.firebaseapp.com",
            databaseURL: "https://bnr-clash-rps.firebaseio.com",
            projectId: "bnr-clash-rps",
            storageBucket: "bnr-clash-rps.appspot.com",
            messagingSenderId: "253526340447",
            appId: "1:253526340447:web:03de464358c5c751ebfcea"
          },
        // Replace with an API key for Google Cloud Vision API
        // DO NOT DO THIS IN PRODUCTION!!! For Demo purposes only.
        visionAPI: {
            key: "253526340447-lko4ciomkkivnkjfho20iikd0l1punm9.apps.googleusercontent.com"
        }
    }
}();
