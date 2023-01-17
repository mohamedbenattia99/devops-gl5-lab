const {createLogger, transports, format} = require('winston');
const jsonStringify = require('fast-safe-stringify');
const { v4: uuidv4 } = require('uuid');
var DatadogWinston = require('datadog-winston')

const logLikeFormat = {
    transform(info) {
      const { timestamp, label, message } = info;
      const level = info[Symbol.for('level')];
      const args = info[Symbol.for('splat')];
      console.log("args: ",info)
      const strArgs = args.map(jsonStringify).join(' ');
      const uuid = uuidv4();
      info[Symbol.for('message')] = `${timestamp} [${label}] ${level}: ${uuid} ${strArgs} ${message} `;
      return info;
    }
  };

const projectsLogger = createLogger({
    transports:[
        new transports.File({
            filename:'project.log',
            level:'info',
            format: format.combine(
                 format.timestamp(),
                format.json(),
                format.label({label: 'INFO'}),
                logLikeFormat
            )  
        }),
        new transports.File({
            filename:'projects-error.log',
            level:'error',
            format: format.combine(
                format.timestamp(),
               format.json(),
               format.label({label: 'INFO'}),
               logLikeFormat
           ) 
        })
    ],
    metaField: null, //this causes the metadata to be stored at the root of the log entry
    responseField: null, // this prevents the response from being included in the metadata (including body and status code)
    requestWhitelist: ['headers', 'query'],  //these are not included in the standard StackDriver httpRequest
    responseWhitelist: ['body'], // this populates the `res.body` so we can get the response size (not required)
    
    dynamicMeta: (req, res) => {
        const httpRequest = {}
        const meta = {}
        if (req) {
            meta.httpRequest = httpRequest
            httpRequest.requestMethod = req.method
            httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
            httpRequest.protocol = `HTTP/${req.httpVersion}`
            // httpRequest.remoteIp = req.ip // this includes both ipv6 and ipv4 addresses separated by ':'
            httpRequest.remoteIp = req.ip.indexOf(':') >= 0 ? req.ip.substring(req.ip.lastIndexOf(':') + 1) : req.ip   // just ipv4
            httpRequest.requestSize = req.socket.bytesRead
            httpRequest.userAgent = req.get('User-Agent')
            httpRequest.referrer = req.get('Referrer')
        }
        return meta
    }
})
projectsLogger.add(
    new DatadogWinston({
      apiKey: '17c3b5c3d0a8b791be34f3ee18da74c03409c756',
      hostname: 'app.datadoghq.eu',
      service: 'ms-a',
      ddsource: 'nodejs',
      ddtags: 'foo:bar,boo:baz'
    })
  )

module.exports = projectsLogger