export interface FooterLink {
  label: string;
  path?: string;
}

export interface SocialLink {
  label: string;
  icon: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
}

export class FooterService {
  getLinks(): FooterLink[] {
    return [
      { label: 'Explore', path: '/' },
      { label: 'Destinations', path: '/destination/bali' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/services' }
    ];
  }

  getSocialLinks(): SocialLink[] {
    return [
      { label: 'Instagram', icon: 'instagram' },
      { label: 'Twitter', icon: 'twitter' },
      { label: 'Facebook', icon: 'facebook' },
      { label: 'LinkedIn', icon: 'linkedin' }
    ];
  }
}
