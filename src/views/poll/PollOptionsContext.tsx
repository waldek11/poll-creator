import {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';

import { Poll } from 'data/poll/usePolls';

interface ContextProps {
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  id?: string;
  question?: string;
  isValid?: boolean;
  hasChanged: boolean;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

const warnMessage = 'You need PollOptionsProvider for this to work';

const pollOptionsContext = createContext<ContextProps>({
  options: [],
  setOptions: () => {
    console.warn(warnMessage);
  },
  errorMessage: '',
  setErrorMessage: () => {
    console.warn(warnMessage);
  },
  hasChanged: true,
});

interface PollOptionsProviderProps extends PropsWithChildren {
  poll?: Poll | null;
}

export const PollOptionsProvider = ({
  children,
  poll,
}: PollOptionsProviderProps) => {
  const [options, setOptions] = useState<string[]>(poll ? poll.options : []);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setOptions(poll ? poll.options : []);
  }, [poll]);

  const isValid = useMemo(() => {
    return options.length >= 2;
  }, [options.length]);

  const hasChanged = useMemo(() => {
    return JSON.stringify(poll?.options) !== JSON.stringify(options);
  }, [options, poll]);

  const value = useMemo(() => {
    return {
      options,
      setOptions,
      id: poll?.id,
      question: poll?.question,
      isValid,
      errorMessage,
      setErrorMessage,
      hasChanged,
    };
  }, [options, poll, errorMessage, isValid, hasChanged]);

  return (
    <pollOptionsContext.Provider value={value}>
      {children}
    </pollOptionsContext.Provider>
  );
};

export const usePollOptions = () => useContext(pollOptionsContext);
