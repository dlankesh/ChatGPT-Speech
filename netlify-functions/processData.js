const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body).data;
    console.log("Received data:", data);

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      console.error("Error: DEEPSEEK_API_KEY is not defined in environment variables.");
      return {
        statusCode: 500,
        body: "Error: DEEPSEEK_API_KEY is not defined.",
      };
    }

    const deepseekResponse = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        messages: [{ role: "user", content: data }],
        model: "deepseek-chat",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const responseData = deepseekResponse.data;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: "Error: Could not process data.",
    };
  }
};
