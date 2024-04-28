import styled from 'styled-components';
import { T2, T4 } from 'typography';
import { useTranslation } from 'react-i18next';

export const PollOption = ({ option, onRemove }: any) => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <T2>{`${option}`}</T2>
      <StyledRemove onClick={onRemove}>{t('Remove')}</StyledRemove>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 1rem; // 17px (adjusted for counts of 8)
  justify-content: space-between;
  display: flex;
`;

const StyledRemove = styled(T4)`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;
