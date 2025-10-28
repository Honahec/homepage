import { getGitHubUser, getGitHubRepos, getGitHubEvents } from '@/lib/github';
import HeroSection from '@/components/HeroSection';
import Projects from '@/components/Projects';
import ActivityChart from '@/components/ActivityChart';

export default async function Home() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'octocat';
  
  // Fetch data in parallel
  const [user, repos, events] = await Promise.all([
    getGitHubUser(username),
    getGitHubRepos(username, 6),
    getGitHubEvents(username, 1000), 
  ]);

  // 联系方式配置 - 可以根据需要选择性添加
  // 支持的图标类型: 'github' | 'website' | 'twitter' | 'email' | 'linkedin' | 'wechat' | 'qq' | 'telegram'
  // 颜色选项: 'purple-500/50' | 'blue-500/50' | 'pink-500/50' | 'green-500/50' | 'sky-500/50' | 'orange-500/50' | 'red-500/50'
  const contactLinks = [
    {
      name: 'GitHub',
      url: `https://github.com/${username}`,
      icon: 'github' as const,
      color: 'purple-500/50',
    },
    {
      name: 'Blog',
      url: 'https://blog.honahec.cc',
      icon: 'website' as const,
      color: 'blue-500/50',
    },
    {
      name: 'Email',
      url: 'mailto:honahec@gmail.com',
      icon: 'email' as const,
      color: 'red-500/50',
    },
    // {
    //   name: 'Twitter',
    //   url: 'https://twitter.com/your-username',
    //   icon: 'twitter' as const,
    //   color: 'sky-500/50',
    // },
    // {
    //   name: 'LinkedIn',
    //   url: 'https://linkedin.com/in/your-username',
    //   icon: 'linkedin' as const,
    //   color: 'blue-500/50',
    // },
    // {
    //   name: 'WeChat',
    //   url: 'https://your-wechat-qr-code-link',
    //   icon: 'wechat' as const,
    //   color: 'green-500/50',
    // },
    // {
    //   name: 'QQ',
    //   url: 'https://your-qq-link',
    //   icon: 'qq' as const,
    //   color: 'sky-500/50',
    // },
    {
      name: 'Telegram',
      url: 'https://t.me/honahec',
      icon: 'telegram' as const,
      color: 'blue-500/50',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Hero Section */}
      <HeroSection user={user} contactLinks={contactLinks} />

      {/* Projects Section */}
      {repos.length > 0 && <Projects repos={repos} />}

      {/* Activity Chart */}
      <ActivityChart events={events} />

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="flex items-center justify-center gap-2 text-sm">
            <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2024119517号-1</a>
          </p>
          <p className="mt-2 text-sm">
            Powered by Next.js & GitHub API
          </p>
        </div>
      </footer>
    </main>
  );
}
