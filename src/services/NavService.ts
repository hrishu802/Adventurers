export interface NavItem {
  name: string;
  path: string;
}

export class NavService {
  getPrimaryItems(): NavItem[] {
    return [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Blog', path: '/blog' },
      { name: 'Profile', path: '/profile' }
    ];
  }

  getAuthItems(): NavItem[] {
    return [
      { name: 'Login', path: '/login' },
      { name: 'Sign Up', path: '/signup' }
    ];
  }
}
