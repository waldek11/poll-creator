import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../axios';
import { Poll } from './usePolls';

export const useSubmitPoll = ({ id }: { id?: string }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: ({
      question,
      options,
    }: {
      question: string;
      options: string[];
    }) => {
      return axiosClient.post('', { question, options });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['polls'], (oldPolls: Poll[]) => {
        return [...oldPolls, data.data];
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, options }: { id: string; options: string[] }) => {
      return axiosClient.put(`/${id}`, { options });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['polls'], (oldPolls: Poll[]) => {
        return [
          ...oldPolls.filter((item) => item.id !== data.data.id),
          data.data,
        ];
      });
    },
  });

  const submitPoll = useCallback(
    ({ question, options }: { question?: string; options: string[] }) => {
      if (id) {
        return updateMutation.mutate({ id, options });
      } else if (question) {
        return createMutation.mutate({ question, options });
      } else {
        console.warn('poll id or new poll question is required');
      }
    },
    [createMutation, updateMutation, id]
  );
  return {
    ...(id ? updateMutation : createMutation),
    submitPoll,
  };
};
