import React from 'react';
import styled, { css } from 'styled-components';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  valid?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

// 2025 Windsurf Design System: InputField pixel-perfect refactor
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 0;
`;

const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(16,30,58,0.48);
  height: 14px;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
`;

const InputFrame = styled.div<{ error?: boolean; valid?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  background: rgba(16, 30, 58, 0.04);
  border-radius: 12px;
  border: 1.5px solid
    ${({ error, valid }) =>
      error ? '#EE1245' : valid ? '#64CD75' : 'rgba(16,30,58,0.16)'};
  padding: 0 12px;
  box-sizing: border-box;
  transition: border 0.18s cubic-bezier(0.62,0.28,0.23,0.99);
  &:focus-within {
    border-color: #3b7cff;
    box-shadow: 0 0 0 2px #3b7cff33;
  }
`;

const StyledInput = styled.input<{ hasIcon?: boolean }>`
  flex: 1;
  height: 48px;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #101E3A;
  font-weight: 500;
  padding-left: ${props => (props.hasIcon ? '36px' : '0')};
  &::placeholder {
    color: rgba(16,30,58,0.48);
    font-weight: 400;
    opacity: 1;
  }
`;

const IconLeft = styled.span`
  position: absolute;
  left: 12px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.48;
`;

const IconRight = styled.span`
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.48;
`;

const HelperRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

const HelperIcon = styled.span`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.48;
`;

const HelperText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: #101E3A;
  opacity: 0.7;
`;

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, error, valid, icon, iconRight, ...props }, ref) => (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputFrame error={error} valid={valid}>
        {icon && <IconLeft>{icon}</IconLeft>}
        <StyledInput
          ref={ref}
          hasIcon={!!icon}
          aria-invalid={!!error}
          aria-label={label}
          {...props}
        />
        {iconRight && <IconRight>{iconRight}</IconRight>}
      </InputFrame>
      {helperText && (
        <HelperRow>
          <HelperIcon aria-hidden="true">ⓘ</HelperIcon>
          <HelperText>{helperText}</HelperText>
        </HelperRow>
      )}
    </Wrapper>
  )
);
InputField.displayName = 'InputField';
