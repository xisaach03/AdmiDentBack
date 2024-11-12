import { Server, Socket } from 'socket.io';

let io: Server;

export const initializeSocket = (_io: Server) => {
    
    _io.on('connection', (socket: Socket) => {
        console.log('Cliente conectado:', socket.id);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
        
        socket.on('sendNotification', (data: string) => {
            console.log('datos del front:', data)
        })
  });

  io = _io;

};

export const sendNotification = (message: string) => {
  if (io) {
    io.emit('notificationReceived', message);
  }
};
