import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const restClient = rest('http://192.168.1.100:3030');
const app = feathers();
// Setup the transport (Rest, Socket, etc.) here
app.configure(restClient.axios(axios));
// Available options are listed in the "Options" section
app.configure(
  auth({
    storage: AsyncStorage,
    storageKey: 'auth-jwt',
  })
);
export default app;
