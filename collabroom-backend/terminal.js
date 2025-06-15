// // terminalClient.js
// const io = require('socket.io-client');
// const readline = require('readline');

// const socket = io('http://localhost:4000'); // match backend port
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const channel = 'general';

// socket.on('connect', () => {
//   console.log(`🟢 Connected to chat on channel #${channel}`);
//   rl.setPrompt('You: ');
//   rl.prompt();
// });

// socket.on('receiveMessage', ({ channel: ch, message }) => {
//   if (ch === channel) {
//     console.log('\n' + message);
//     rl.prompt();
//   }
// });

// rl.on('line', (input) => {
//   if (input.trim() !== '') {
//     socket.emit('sendMessage', { channel, message: `[TerminalUser] ${input}` });
//   }
//   rl.prompt();
// });
