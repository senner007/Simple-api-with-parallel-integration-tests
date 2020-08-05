import { FireBase } from '../../src/authentication/firebaseInit';
import firebaseAdmin from 'firebase-admin';

jest.mock('firebase-admin');
jest.mock('../../src/authentication/firebaseInit');

class FireBaseMock {
  public async getTokenFromCredentials(
    user: string,
    password: string,
  ): Promise<string> {
    if (user !== process.env.OWNER_USER_NAME) {
      throw new Error();
    }
    if (password !== process.env.OWNER_PASSWORD) {
      throw new Error();
    }
    return 'fake_token';
  }
  public async verifyToken(): Promise<boolean> {
    return true;
  }
}

const FIREBASE_MOCK_SETUP: () => void = () => {
  const mockedFirebase: jest.MockedClass<typeof FireBase> = FireBase as jest.MockedClass<
    typeof FireBase
  >;

  mockedFirebase.mockClear();
  mockedFirebase.mockImplementation(() => {
    return new FireBaseMock();
  });
};

export { FIREBASE_MOCK_SETUP };
