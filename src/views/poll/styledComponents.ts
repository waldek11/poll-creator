import styled from 'styled-components';
import { T1, T2 } from 'typography';
import { Input } from 'components/Input';

export const StyledTitle = styled(T1)`
  margin-bottom: 1.75rem; // Figma says 27px (but next line was 28)
`;

export const StyledLabel = styled(T2)`
  margin-bottom: 1rem; // Figma 15px (keep it counts of 8)
`;

export const StyledInput = styled(Input)`
  margin-bottom: 2rem;
`;
