export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.truckersmp.com/v2/version');
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch TruckersMP version' });
    }
    const data = await response.json();
    res.status(200).json({
      supported_game_version: data.supported_game_version,
      supported_ats_game_version: data.supported_ats_game_version,
      time: data.time,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}