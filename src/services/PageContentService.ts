import { ServiceItem, BlogPost } from '../types';

export interface AboutSection {
  title: string;
  content: string;
}

export class PageContentService {
  getServices(): ServiceItem[] {
    return [
      {
        title: 'Adventure Tours',
        description: 'Experience thrilling adventures with our expert guides.',
        image: 'https://images.openai.com/static-rsc-4/HkwuKvun4mvYh3hRCwA7ggxpAQNzT6hZlcDwN1OWvKrjMyq5dFU58mvQ_bdJlEpR8vlcUWHjlpGHDiYk9zKcWQPtuHdJwu6A0r5h_OtUacRA7ymHTVzN_mfSQg9KsgFGQ2cM07kcwiNy_s1bg1RhVWislmiUIP_iNTMquO1mcA86sAtBMxL5TyKv_ghdNQGo?purpose=fullsize',
      },
      {
        title: 'Cultural Experiences',
        description: 'Immerse yourself in local cultures and traditions.',
        image: 'https://images.openai.com/static-rsc-4/B2aShIXve1Xe9SOxttbgTlrOj2O7AmhRgiHjzTN2MdSAlRze2sM6XnvOvNL2RwdbFSXgbscR9bNDD5ExHp8etFi1Mn-LXKUIptbZpa8ZG8O2K77rmmZudkfRHcBBbwZ3b1TQEzwbT2EBGhFjSz6AcKL9UoF-O3IrY20N0RCYuthemsjsWy1oVY6BISXLDoUk?purpose=fullsize',
      },
      {
        title: 'Luxury Travel',
        description: 'Indulge in premium travel experiences with our luxury packages.',
        image: 'https://images.openai.com/static-rsc-4/bDa_SRAeJvvUQhjvhdROuUTBS2TTFxbXrSZ8PZaFlFOMv-QuwKN_5yqne0-rKj6IsAHwAG52hFT4nU2J8uLOyiraLqUM9vPOnBDEZhphbYOcXbOOTXUCCP8aJ-NdC084iZ0nLSLwtseKIOgXOD_xBHkH0w4xsvFGyTa5Ub3W9zq0raO9c1DVgfHPC-f0dgLj?purpose=fullsize',
      },
    ];
  }

  getBlogPosts(): BlogPost[] {
    return [
      {
        title: 'Top 10 Adventure Destinations',
        excerpt: 'Discover the most thrilling destinations for adventure seekers.',
        image: 'https://images.openai.com/static-rsc-4/NWECLQVk15Z4l-1NdjIp074ReRBXGGLDqOvttgFC13KEGc7QfhOvOYCIp8sjkVYTS_qOhQ7L3kfxAobdhSbWI-DvYTLA4AHTUinAKZl2gZzWiENt_9KVTCr4ISphrWLvqxoPWd-G7udS1l5PtBhx9tYSK_19wDbu0j-UnqUxYAZcJElI4YRlT9Xj2CyxJ5Cf?purpose=fullsize',
        author: 'John Doe',
        date: 'March 15, 2024',
      },
      {
        title: 'Sustainable Travel Tips',
        excerpt: 'Learn how to travel responsibly and reduce your environmental impact.',
        image: 'https://images.openai.com/static-rsc-4/B8w_GTUDXahvfOxFgRc0MZIUcEERBqMDyy8_Fn-EBFrQ4XsXDQcOjEwZFMeA-fvjIgxclFKwrVRd-TZU8wzvT3M2xrDOrr8PwA_mc8cN_8KQpq68agdo68XKUYNn1xeO-waLqVtxVckZnEknTmHDcR7eKO84bgH9LNMSGGYYYMtcy2gsVa6CpEQ200IQ59D2?purpose=fullsize',
        author: 'Jane Smith',
        date: 'March 10, 2024',
      },
      {
        title: 'Hidden Gems of Europe',
        excerpt: 'Explore the lesser-known but equally amazing destinations in Europe.',
        image: 'https://images.openai.com/static-rsc-4/0gu7DyJWPUeIGlLATGeWooo-P8bSRwuCQO92mrXREkAQLTnr-Fb8wnvudrrvV-I9HrUgWfvIKQ2XlO_nQW7TfCGgk9fI-vn51dwSEok9kq4XZ8l7YeAsCpWmLoeelrf7pHEK7veIxjm8yjSyPZa202R5nLTFn3O-gzGNdIxFOdxmDgjfGT_7F65FEkjTR-7D?purpose=fullsize',
        author: 'Mike Johnson',
        date: 'March 5, 2024',
      },
    ];
  }

  getAboutSections(): AboutSection[] {
    return [
      {
        title: 'Our Story',
        content:
          'Token of Memento was founded with a simple mission: to help people discover the world\'s most amazing destinations and create unforgettable experiences. Our team of passionate travelers and adventure enthusiasts work tirelessly to curate the best travel experiences for our clients.',
      },
      {
        title: 'Our Mission',
        content:
          'We believe that travel has the power to transform lives. Our mission is to make adventure travel accessible to everyone while promoting sustainable tourism practices that protect the places we love to visit.',
      },
    ];
  }
}
