import { T4 } from 'typography';
import styled from 'styled-components';
import { usePollOptions } from './PollOptionsContext';
import { useTranslation } from 'react-i18next';

export const ErrorComponent = () => {
  const { errorMessage } = usePollOptions();
  const { t } = useTranslation();

  return <StyledError>{t(errorMessage)}</StyledError>;
};

const StyledError = styled(T4)`
  color: ${({ theme }) => theme.color.error};
  display: flex;
  justify-content: flex-end;
`;
