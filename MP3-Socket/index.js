var server = require('http').createServer();
var io = require('socket.io')(server);


server.listen(64182, function (port) {
  console.log('Server listening at port 64182');
});


io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });

	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		console.log(data);
		// we tell the client to execute 'new message'
		socket.broadcast.emit('message', {
			message: data
		});
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
console.log('someone disconnected');
		// echo globally that this client has left
		socket.broadcast.emit('user left', {
			username: 'someone left'
		});
	});
});
