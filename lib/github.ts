import { GitHubUser, GitHubRepo, GitHubEvent } from './types';

const GITHUB_API = 'https://api.github.com';
const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
};

if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
}

export async function getGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

export async function getGitHubRepos(username: string, limit: number = 6): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=${limit}`,
      {
        headers,
        next: { revalidate: 3600 }
      }
    );
    
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGitHubEvents(username: string, limit: number = 100): Promise<GitHubEvent[]> {
  try {
    // GitHub API 限制每页最多 100 个，我们获取多页
    const pages = Math.ceil(limit / 100);
    const allEvents: GitHubEvent[] = [];
    
    for (let page = 1; page <= pages && page <= 10; page++) {
      const url = `${GITHUB_API}/users/${username}/events/public?per_page=100&page=${page}`;
      
      const res = await fetch(url, {
        headers,
        next: { revalidate: 1800 } // Cache for 30 minutes
      });
      
      if (!res.ok) break;
      
      const events = await res.json();
      
      if (events.length === 0) break;
      
      allEvents.push(...events);
      
      // 如果获取的事件已经超过一年，就停止
      if (events.length > 0) {
        const oldestEvent = events[events.length - 1];
        const oldestDate = new Date(oldestEvent.created_at);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        if (oldestDate < oneYearAgo) break;
      }
    }
    
    return allEvents;
  } catch (error) {
    console.error('Error fetching GitHub events:', error);
    return [];
  }
}
