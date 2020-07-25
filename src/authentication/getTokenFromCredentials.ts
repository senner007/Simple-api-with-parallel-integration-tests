import fetch, { Response } from 'node-fetch';
export async function getTokenFromCredentials(
  user: string,
  password: string,
): Promise<string> {
  const key: string = process.env.FIREBASE_API_KEY;
  const body: Object = {
    email: user,
    password: password,
    returnSecureToken: true,
  };

  interface ITokenResponse {
    idToken: string;
  }

  try {
    const result: Response = await fetch(
      // TODO : url to .env
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    const data: ITokenResponse = (await result.json()) as ITokenResponse;
    return data.idToken;
  } catch (error) {
    throw new Error('unauthorized');
  }
}
