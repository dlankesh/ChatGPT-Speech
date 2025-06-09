/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const cors = require('cors')({origin: true});

exports.processData = onRequest((request, response) => {
  cors(request, response, () => {
const data = request.body.data;
    response.send("Hello from backend!");
  });
});
