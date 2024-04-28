import {
  useCallback,
  useState,
  ChangeEvent,
  memo,
  useMemo,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { usePoll } from 'data/poll/usePoll';
import { StyledLabel, StyledInput, StyledTitle } from './styledComponents';
import { PollOptions } from './PollOptions';
import { PollOptionsProvider } from './PollOptionsContext';
import { SubmitButton } from './SubmitButton';

export const PollBox = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const idFromRoute = useMemo(() => {
    return new URLSearchParams(search).get('id');
  }, [search]);

  const [pollQuestion, setPollQuestion] = useState('');

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      navigate('/');
      setPollQuestion(e.target.value);
    },
    [navigate]
  );

  const { data, isPending } = usePoll({ pollQuestion, id: idFromRoute });

  useEffect(() => {
    if (data && data.question) {
      setPollQuestion(data.question);
      navigate(`/?id=${data.id}`);
    }
  }, [data, navigate]);

  const { t } = useTranslation();

  return (
    <PollOptionsProvider poll={data}>
      <StyledBox>
        <StyledInnerContainer>
          <StyledTitle>{t('Create Your Poll')}</StyledTitle>
          <StyledLabel>{t('Poll Question')}</StyledLabel>
          <StyledInput
            placeholder={t('Ex: What should we have for lunch tomorrow?')}
            value={pollQuestion}
            onChange={handleOnChange}
          />
          <PollOptions />
        </StyledInnerContainer>
        <StyledButtonContainer>
          <SubmitButton pollQuestion={pollQuestion} loading={isPending} />
        </StyledButtonContainer>
      </StyledBox>
    </PollOptionsProvider>
  );
};

export default memo(PollBox);

const StyledButtonContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
`;

const StyledBox = styled.div`
  border-radius: 0.25rem;
  width: 28rem;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow.light};
`;

const StyledInnerContainer = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;
