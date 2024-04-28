import { useCallback, useEffect, useMemo } from 'react';
import { Button } from 'components/Button';
import { usePollOptions } from './PollOptionsContext';
import { useSubmitPoll } from 'data/poll/useSubmitPoll';
import { useNavigate } from 'react-router-dom';

interface SubmitButtonProps {
  pollQuestion: string;
  loading: boolean;
}

export const SubmitButton = ({ pollQuestion, loading }: SubmitButtonProps) => {
  const { options, id, isValid, setErrorMessage, hasChanged } =
    usePollOptions();
  const { submitPoll, isPending, data, error } = useSubmitPoll({ id });

  useEffect(() => {
    if (error) {
      setErrorMessage(
        'An error message has occurred when submitting your poll.'
      );
    }
  }, [error, setErrorMessage]);

  const handleOnSubmit = useCallback(async () => {
    setErrorMessage('');
    if (!isValid) {
      setErrorMessage('You need at least 2 options to submit this poll');
      return true;
    }

    if (!hasChanged) {
      setErrorMessage('Your poll options have not changed');
      return true;
    }

    submitPoll({ question: pollQuestion, options });
  }, [options, submitPoll, pollQuestion, isValid, setErrorMessage, hasChanged]);

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      navigate(`?id=${data.data.id}`);
    }
  }, [data, navigate]);

  const isLoading = useMemo(() => {
    return loading || isPending;
  }, [loading, isPending]);

  return (
    <Button onClick={handleOnSubmit} $primary={Boolean(!isLoading)}>
      {isLoading ? 'Loading...' : 'Submit'}
    </Button>
  );
};
