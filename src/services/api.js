import io from 'socket.io-client';

export const subscribeToRealTimeUpdates = (callback) => {
  const socket = io('http://localhost:5000');
  socket.on('newData', callback);
};
