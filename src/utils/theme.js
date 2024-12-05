
export const toggleTheme = (currentTheme) => {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  return newTheme;
}

export const getThemeFromLocalStorage = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme : 'light';
}
