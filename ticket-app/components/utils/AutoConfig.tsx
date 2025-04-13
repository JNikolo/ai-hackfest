import Constants from 'expo-constants';

export const AuthConfig = {
  domain: Constants.expoConfig?.extra?.AUTH0_DOMAIN || '',
  clientId: Constants.expoConfig?.extra?.AUTH0_CLIENT_ID || ''
};
