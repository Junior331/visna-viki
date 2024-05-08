import { ReactNode, createContext, useMemo, useState } from 'react';

type IStepsIsDoneProps = {
  stepsIsDone: string[];
  setStepsIsDone: (steps: string[]) => void;
};

const initialState: IStepsIsDoneProps = {
  stepsIsDone: [],
  setStepsIsDone: () => {}
};
export const StepsIsDoneContext = createContext<IStepsIsDoneProps>(
  initialState as IStepsIsDoneProps
);

export const StepsIsDoneProvider = ({ children }: { children: ReactNode }) => {
  const [stepsIsDone, setStepsIsDone] = useState<string[]>([]);

  const value = useMemo(
    () => ({ stepsIsDone, setStepsIsDone }),
    [stepsIsDone, setStepsIsDone]
  );

  return (
    <StepsIsDoneContext.Provider value={value}>
      {children}
    </StepsIsDoneContext.Provider>
  );
};
