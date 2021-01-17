import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io('http://192.168.1.100:3030');
const app = feathers();

// Setup the transport (Rest, Socket, etc.) here
app.configure(socketio(socket));

// Available options are listed in the "Options" section
app.configure(
  auth({
    storage: AsyncStorage,
    storageKey: 'auth',
  })
);
export default app;
