import { useMemo } from 'react';
import { usePolls } from './usePolls';

interface usePollParams {
  pollQuestion: string;
  id?: string | null;
}

export const usePoll = ({ pollQuestion, id }: usePollParams) => {
  const { data, ...rest } = usePolls();

  const poll = useMemo(() => {
    if (data) {
      if (pollQuestion) {
        return data.find((poll) => poll.question === pollQuestion);
      }
      if (id) {
        return data.find((poll) => poll.id === id);
      }
    }
    return null;
  }, [data, pollQuestion, id]);

  return { data: poll, ...rest };
};
