const TOKEN = 'TOKEN';

export const getToken = (): string => {
  const token: string | null = window.sessionStorage.getItem(TOKEN);
  return token || '';
};
