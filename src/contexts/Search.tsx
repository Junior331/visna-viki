import { ReactNode, createContext, useMemo, useState } from 'react';

type IContentProps = {
  contentActive: string;
  setContentActive: (item: string) => void;
};

export const SearchContext = createContext<IContentProps>({} as IContentProps);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [contentActive, setContentActive] = useState<string>('');

  const value = useMemo(
    () => ({ contentActive, setContentActive }),
    [contentActive, setContentActive]
  );
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
