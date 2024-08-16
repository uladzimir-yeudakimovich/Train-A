export const routerMock = {
  navigate: jest.fn(),
};

export const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: jest.fn(),
    },
  },
};

export const authServiceMock = {
  registration: jest.fn(),
};
