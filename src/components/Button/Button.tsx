import { ComponentProps, memo } from 'react';
import styled from 'styled-components';
import { T3 } from '../../typography';

interface ButtonProps extends ComponentProps<'button'> {
  $primary?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, $primary, ...restOfProps } = props;

  return (
    <StyledButton $primary={$primary} {...restOfProps}>
      <T3>{children}</T3>
    </StyledButton>
  );
};

export default memo(Button);

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, $primary }) =>
    $primary ? theme.color.primary : theme.color.border};
  border: none;
  border-radius: 4px;
  height: 1.875rem; // 30px
  color: ${({ theme }) => theme.color.white};
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  padding: 0 1.5rem;
`;
