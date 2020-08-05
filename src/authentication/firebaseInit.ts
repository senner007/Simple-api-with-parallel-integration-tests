import firebaseAdmin from 'firebase-admin';
import { getTokenFromCredentials } from './getTokenFromCredentials';

const serviceAccount: unknown = require('../../serviceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://shoppinglist-fb43e.firebaseio.com',
});



class FireBase {
  public async getTokenFromCredentials(
    user: string,
    password: string,
  ): Promise<string> {
    return getTokenFromCredentials(user, password);
  }

  public async verifyToken(token: string): Promise<boolean> {
    await firebaseAdmin.auth().verifyIdToken(token);
    return true;
  }
}

export { FireBase };
