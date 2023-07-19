export const DRAWER_WIDTH = 240;

export const PAGES = {
  Home: 'home',
  Profile: 'profile',
  ResumeList: 'list',
  Login: 'login',
  SignUp: 'sign up',
  ResetPassword: 'reset password',
};

export const AUTHENTICATED_ROUTES = {
  Home: 'home',
  Profile: 'profile',
  ResumeList: 'list',
};

export const PUBLIC_ROUTES = {
  Login: 'login',
  SignUp: 'signup',
  ResetPassword: 'forgot-password',
};

export const mapPageToRoute = {
  [PAGES.Home]: AUTHENTICATED_ROUTES.Home,
  [PAGES.Profile]: AUTHENTICATED_ROUTES.Profile,
  [PAGES.ResumeList]: AUTHENTICATED_ROUTES.ResumeList,
  [PAGES.Login]: PUBLIC_ROUTES.Login,
  [PAGES.SignUp]: PUBLIC_ROUTES.SignUp,
  [PAGES.ResetPassword]: PUBLIC_ROUTES.ResetPassword,
}

export const mapRouteToPage = Object.entries(mapPageToRoute).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {})