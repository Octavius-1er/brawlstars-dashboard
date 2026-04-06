const https = require('https');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const path = req.query.path;

  if (!path || !path.startsWith('/')) {
    res.status(400).json({ reason: 'Chemin invalide' });
    return;
  }

  const options = {
    hostname: 'bsproxy.royaleapi.dev',
    path: '/v1' + path,
    headers: {
      'Authorization': 'Bearer ' + process.env.BS_TOKEN,
      'User-Agent': 'BrawlDashboard/1.0'
    }
  };

  https.get(options, (apiRes) => {
    res.status(apiRes.statusCode);
    res.setHeader('Content-Type', 'application/json');
    apiRes.pipe(res);
  }).on('error', (e) => {
    res.status(500).json({ reason: e.message });
  });
};
