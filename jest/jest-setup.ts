// import { FireBase } from '../src/authentication/firebaseInit';
import { FIREBASE_MOCK_SETUP } from '../__TESTS__/__MOCKS__/FIREBASE_MOCK';

jest.setTimeout(14000); // in milliseconds

beforeAll(async () => {
    FIREBASE_MOCK_SETUP();
});

beforeEach(async () => {});

afterEach(async () => {});
