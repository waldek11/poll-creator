import { useCallback, ChangeEvent, useState } from 'react';
import { StyledLabel } from './styledComponents';
import styled from 'styled-components';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { useTranslation } from 'react-i18next';

import { PollOption } from './PollOption';
import { usePollOptions } from './PollOptionsContext';
import { ErrorComponent } from './ErrorComponent';

export const PollOptions = () => {
  const [newOption, setNewOption] = useState('');

  const { options, setOptions, setErrorMessage } = usePollOptions();

  const handleOnAddClick = useCallback(async () => {
    setOptions((prev) => {
      setErrorMessage('');
      if (newOption === '') {
        setErrorMessage('Poll option cannot be empty');
        return prev;
      }

      const duplicateOption = prev.find((item) => item === newOption);

      if (typeof duplicateOption !== 'undefined') {
        setErrorMessage('This poll option already exists');
        return prev;
      }

      setNewOption('');
      return [...prev, newOption];
    });
  }, [newOption, setOptions, setErrorMessage]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewOption(value);
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <StyledLabel>{t(`Poll Options`)}</StyledLabel>
      <StyledContainer>
        <StyledInput
          placeholder={t('ex: Pizza')}
          onChange={handleOnChange}
          value={newOption}
        />
        <StyledButtonContainer>
          {/* To match plus icon I think I would have to use Material Icons */}
          <Button onClick={handleOnAddClick} $primary>
            +
          </Button>
        </StyledButtonContainer>
      </StyledContainer>
      {options && options.length > 0 ? (
        <StyledOptionsContainer>
          {options.map((option) => {
            return (
              <PollOption
                key={option}
                option={option}
                onRemove={() => {
                  setOptions((prev) => {
                    return prev.filter((item) => item !== option);
                  });
                }}
              ></PollOption>
            );
          })}
        </StyledOptionsContainer>
      ) : null}
      <ErrorComponent />
    </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledInput = styled(Input)`
  flex: 1;
`;

const StyledButtonContainer = styled.div`
  > button {
    margin-left: 0.875rem;
    padding: 0;
    border-radius: 100%;
    width: 1.875rem; // 30px;
  }
`;

const StyledOptionsContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};

  > * + * {
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }
  margin-bottom: 1rem;
`;
