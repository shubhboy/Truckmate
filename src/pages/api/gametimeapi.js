
export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.truckersmp.com/v2/game_time');
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch game time" });
    }
    const data = await response.json();

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Return only the game_time value
    res.status(200).json({ game_time: data.game_time });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}