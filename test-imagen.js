const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('='))
);

const API_KEY = envVars.NEXT_PUBLIC_GEMINI_API_KEY;

async function testImagen() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${API_KEY}`;
  
  const payload = {
    instances: [
      { prompt: "A futuristic city skyline at sunset" }
    ],
    parameters: {
      sampleCount: 1
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    console.log("Status:", response.status);
    if (data.error) {
      console.log("Error:", JSON.stringify(data.error, null, 2));
    } else {
      console.log("Success! Image generated.");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testImagen();
