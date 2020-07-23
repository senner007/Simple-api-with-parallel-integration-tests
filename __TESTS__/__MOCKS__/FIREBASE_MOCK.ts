import { FireBase } from '../../src/authentication/firebaseInit';

class FireBaseMock {
  public async getTokenFromCredentials(
    user: string,
    password: string,
  ): Promise<string> {
    // console.log('getTokenFromCredentials mock');
    if (password !== process.env.OWNER_PASSWORD) {
      throw new Error();
    }
    return 'fake_token';
  }
  public async verifyToken(): Promise<boolean> {
    // console.log('verifyToken mock');
    return true;
  }
}

const FIREBASE_MOCK = () => {
  const mockedFirebase: jest.MockedClass<typeof FireBase> = FireBase as jest.MockedClass<
    typeof FireBase
  >;

  mockedFirebase.mockClear();
  mockedFirebase.mockImplementation(() => {
    return new FireBaseMock();
  });
};

export { FIREBASE_MOCK };
