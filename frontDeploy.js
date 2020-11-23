
const http = require('http');
const createHandler = require('github-webhook-handler');
const spawn = require('child_process').spawn;
const handler = createHandler({ path: '/front-webhook', secret: 'blog2.0' });


http.createServer(function(req, res) {
  res.end('front success');
  handler(req, res, function(err) {
    console.log('err----------------------', err);
    res.statusCode = 404;
    res.end('no such location');
  });

}).listen(7788);

handler.on('error', function(err) {
  console.error('Error----------:', err.message);
});

handler.on('push', function(event) {
  console.log('----------push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  const syncFile = spawn('sh', [ './deploy.sh' ]);
  syncFile.stdout.on('data', (data) => {
    console.log('stdout---------', data.toString());
  });

  syncFile.stderr.on('data', (data) => {
    console.log('stderr------------', data.toString());
  });

  syncFile.on('exit', (code) => {
    console.log(`子进程退出码：${code}`);
  });

});

