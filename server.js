const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const friendsRoutes = require('./routes/friends');
const postsRoutes = require('./routes/posts');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/posts', postsRoutes);
app
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
