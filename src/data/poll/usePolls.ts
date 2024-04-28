import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../axios';

export interface Poll {
  question: string;
  options: string[];
  id: string;
  createdAt: string;
}

export const usePolls = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['polls'],
    queryFn: async (): Promise<Poll[]> => {
      // we could use axios here, if it gets more elaborate.
      return (await axiosClient.get('')).data;
    },
  });

  return { isPending, isError, data, error };
};
