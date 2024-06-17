export const awsconfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_xxxxxxxx',
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxx',
    oauth: {
      domain: 'your-domain.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};
