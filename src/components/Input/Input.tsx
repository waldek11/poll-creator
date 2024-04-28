import { ComponentProps, memo } from 'react';
import styled from 'styled-components';

const Input = (props: ComponentProps<'input'>) => {
  return <StyledInput {...props} />;
};

export default memo(Input);

const StyledInput = styled.input`
  border: none;
  height: 2rem; // figma says 33px, but setting to 32px (counts of 8)
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.inputPlaceholder};
  }
`;
