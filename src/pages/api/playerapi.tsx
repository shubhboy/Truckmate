
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { truckersMPId } = req.query;

    // Log the truckersMPId
    console.log("Received truckersMPId:", truckersMPId);

    if (!truckersMPId) {
      return res.status(400).json({ error: 'truckersMPId is required' });
    }

    const response = await fetch(`https://api.truckersmp.com/v2/player/${truckersMPId}`);
    console.log("TruckersMP API response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    res.status(200).json(data);
  } catch (error) {
    console.error("Fetching TruckersMP server data failed: ", error);
    res.status(500).json({ error: 'Failed to fetch data from TruckersMP API' });
  }
}