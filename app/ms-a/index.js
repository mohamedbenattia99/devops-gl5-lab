const express = require("express");
const client = require('prom-client')
const getProjects = require('./service')
const getProject = require('./service2')
const logger = require('./logging/logger');
const requestIP = require('request-ip');

// Create a Registry which registers the metrics
const register = new client.Registry()

const app = express();
const port = 3001;


// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'portfolio-front'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ 
    app: 'ms-a',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
})

const httpRequestTimer = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
});

// Register the histogram
register.registerMetric(httpRequestTimer);

app.get('/metrics', async (req, res) => {

  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());

});

app.get('/projects', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  
  const ipAddress = requestIP.getClientIp(req);

  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
  
  await getProjects()
        .then(posts => {
    
          logger.info('info', 'Successfully got all the projects', { RequestIP: `${ipAddress}`});
          res.json(posts)
        })
        .catch(err => {
          logger.error('Error finding projects', { RequestIP: `${ipAddress}`});
          if (err.status) {
            res.status(err.status).json({ message: err.message })
          } 
          else {
              res.status(500).json({ message: err.message })
            }
  })

  end({ route, code: res.statusCode, method: req.method });

})

app.get('/projects/:id', async (req, res) => {
 
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
  res.header("Access-Control-Allow-Origin", "*");
  
  const ipAddress = requestIP.getClientIp(req);

  await getProject(req.params.id)
  .then(project => {
    res.json(project)
    logger.info('info', 'Successfully got all the projects', { RequestIP: `${ipAddress}`});
  })
  .catch(err => {
    //logging
      logger.error('Error finding projects', { RequestIP: `${ipAddress}`});
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      } else {
          res.status(500).json({ message: err.message })
      }
  })
  end({ route, code: res.statusCode, method: req.method });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

