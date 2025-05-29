// Gemini API request to generate marketing data similar to your format
// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// console.log(GEMINI_API_KEY); 
const GEMINI_API_KEY = "AIzaSyBFnGL7F5veSvkmfIv6IZp7DwHDNT4GB3k";
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function generateMarketingData(){
  const prompt = `
Generate marketing analytics data in the following JSON format. Provide realistic values for digital marketing channels:

1. Engagement Data (array of objects):
   - Each object should have: name (channel name), engagement (percentage 0-100), retention (percentage 0-100)
   - Include channels like: Email, Social, Search, Display, Video, Mobile, Influencer, Podcast, etc.
   - Make engagement and retention values realistic for each channel type

2. Audience Demographics (array of objects):
   - Each object should have: name (age range), value (percentage of total audience)
   - Age ranges: 18-24, 25-34, 35-44, 45-54, 55+
   - Values should add up to 100

Return only valid JSON with this structure:
{
  "engagementData": [
    { "name": "Channel Name", "engagement": number, "retention": number }
  ],
  "audienceDemographics": [
    { "name": "Age Range", "value": number }
  ]
}`;

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    const cleanedText = generatedText.replace(/```json\n?/g, '').replace(/```/g, '').trim();
    const marketingData = JSON.parse(cleanedText);
    
    return marketingData;
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

// Usage example
async function main() {
  try {
    const data = await generateMarketingData();
    
    console.log('Generated Engagement Data:');
    console.log(data.engagementData);
    
    console.log('\nGenerated Audience Demographics:');
    console.log(data.audienceDemographics);
    
    // You can now use this data in your application
    const engagementData = data.engagementData;
    const audienceDemographics = data.audienceDemographics;
    
  } catch (error) {
    console.error('Failed to generate marketing data:', error);
  }
}

// Alternative: More specific request for different industries or scenarios
async function generateIndustrySpecificData(industry = 'general') {
  const industryPrompt = `
Generate realistic marketing analytics data for the ${industry} industry in JSON format:

{
  "engagementData": [
    // Include 8-10 marketing channels with realistic engagement (20-90%) and retention (15-70%) rates
    // Channels: Email, Social Media, Paid Search, Display Ads, Video Marketing, Content Marketing, Influencer, Direct Mail, Mobile, Podcast
  ],
  "audienceDemographics": [
    // Age distribution that adds up to 100%
    { "name": "18-24", "value": number },
    { "name": "25-34", "value": number },
    { "name": "35-44", "value": number },
    { "name": "45-54", "value": number },
    { "name": "55+", "value": number }
  ]
}

Make the data realistic for ${industry} industry trends.`;

  // Same API call structure as above, just with different prompt
  // ... (implementation similar to generateMarketingData)
}

// Call the function
main();