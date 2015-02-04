var app = require('express')();
var server = require('http').createServer();
var io = require('socket.io')(server);

var users = 0;
var client = '';


server.listen(64182, function (port) {
  console.log('Server listening at port 64182');
});

console.log('current users: ' +users);


io.on('connection', function (socket) {
	client = socket.id;
	users++;
	console.log('Current Users: ' +users);
	
	io.sockets.connected[client].emit("users", {currentUsers: users});

	socket.on('settingsInstrument', function (data) {
		console.log(data);
		// we tell the client to execute 'new message'
		socket.broadcast.emit('updateInstrument', data);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
		users--;
		console.log('someone disconnected - users: ' + users);
	});
});