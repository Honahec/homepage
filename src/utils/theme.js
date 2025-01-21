// 主题常量
export const THEME_TYPES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export const THEME_KEY = "isTheme";

// 主题管理类
export class ThemeManager {
  static getTheme() {
    return localStorage.getItem(THEME_KEY) || THEME_TYPES.SYSTEM;
  }

  static setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    this.applyTheme(theme);
  }

  static applyTheme(theme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const themeToApply =
      theme === THEME_TYPES.SYSTEM
        ? prefersDark
          ? THEME_TYPES.DARK
          : THEME_TYPES.LIGHT
        : theme;
    document.documentElement.setAttribute("data-theme", themeToApply);
  }
}
