import {jest} from '@jest/globals';

export const Amplify = {
  configure: jest.fn(),
};

export const Auth = {
  signIn: jest.fn().mockResolvedValue({}),
  signUp: jest.fn().mockResolvedValue({}),
  currentAuthenticatedUser: jest.fn().mockResolvedValue({}),
};

export const Storage = {
  put: jest.fn().mockResolvedValue({}),
  get: jest.fn().mockResolvedValue('mocked-file-url'),
};

export default {Amplify, Auth, Storage};
