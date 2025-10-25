// GitHub API types
export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    ref_type?: string;
    action?: string;
    commits?: Array<{
      sha: string;
      message: string;
    }>;
    size?: number; // PushEvent 中的提交数量
    distinct_size?: number; // PushEvent 中不同的提交数量（新提交）
    [key: string]: unknown;
  };
  created_at: string;
}
