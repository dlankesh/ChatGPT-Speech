const { VertexAI } = require('@google-cloud/aiplatform');

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body).data;
    console.log("Received data:", data);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY is not defined in environment variables.");
      return {
        statusCode: 500,
        body: "Error: GEMINI_API_KEY is not defined.",
      };
    }

    const vertexAI = new VertexAI({ project: 'chatgpt-speech-4106b', location: 'us-central1', apiKey: apiKey });

    const model = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });

    const request = {
      contents: [{ role: 'user', parts: [{ text: data }] }],
    };

    const response = await model.generateContent(request);

    const responseText = response.response.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({ response: responseText }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: "Error: Could not process data.",
    };
  }
};
