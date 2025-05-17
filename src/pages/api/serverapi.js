export default async function handler(req, res) {
    try {
      const response = await fetch('https://api.truckersmp.com/v2/servers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // Add CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
  
      res.status(200).json(data.response);
    } catch (error) {
      console.error("Fetching TruckersMP server data failed: ", error);
      res.status(500).json({ error: 'Failed to fetch data from TruckersMP API' });
    }
  }