const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
  const zip = event.queryStringParameters
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search/location=${zip}`, 
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        }
      }
    );
    const data = response.json();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses)
    } 
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    }
  }
};

module.exports = { handler };
