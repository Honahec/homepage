import { Icons } from '@/components/icons';
import { HomeIcon, NotebookIcon } from 'lucide-react';

export const DATA = {
  name: 'Honahec',
  initials: 'Honahec',
  url: 'https://honahec.cc/',
  location: 'Shanghai, China',
  favicon: 'https://image.honahec.cc/favicon-blue.png',
  description:
    'An undergrad student at ShanghaiTech University. Full-stack developer.',
  summary:
    "I'm currently... \n\n - Member of [GeekPie_Association](https://github.com/ShanghaitechGeekPie) \n\n - Studying at ShanghaiTech University \n\n - Majoring in Computer Science \n\n - Also interested in Full-stack development, UI/UX, HPC and DataScience",
  avatarUrl: 'https://image.honahec.cc/avatar.png',
  skills: ['React', 'Next.js', 'Typescript', 'Vue', 'Python', 'C++'],
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: 'https://blog.honahec.cc', icon: NotebookIcon, label: 'Blog' },
  ],
  contact: {
    email: 'honahec@gmail.com',
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/Honahec',
        icon: Icons.github,

        navbar: true,
      },
      X: {
        name: 'X',
        url: 'https://x.com/honahec',
        icon: Icons.x,

        navbar: true,
      },
      telegram: {
        name: 'Telegram',
        url: 'https://t.me/honahec',
        icon: Icons.telegram,

        navbar: true,
      },
      email: {
        name: 'Send Email',
        url: 'mailto:honahec@gmail.com',
        icon: Icons.email,

        navbar: true,
      },
    },
  },
  education: [
    {
      school: 'ShanghaiTech University',
      href: 'https://shanghaitech.edu.cn/',
      degree: 'Undergraduate in Computer Science',
      start: '2025',
      end: '2029?',
    },
    {
      school: 'Qingdao Academy',
      href: 'https://qdzx.net/',
      degree: 'High School',
      start: '2019',
      end: '2025',
    },
  ],
} as const;
