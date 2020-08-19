import React, { ComponentProps, forwardRef } from 'react';
import styled from 'styled-components';

import { BaseButton, BaseButtonProps } from './BaseButton';

const ButtonWithIcon = styled(BaseButton)`
  text-indent: 11px;
`;

/**
 * Button component.
 * themed by ~styles/theme/desktop.buttons
 */
const Button = forwardRef<
  HTMLButtonElement,
  BaseButtonProps & ComponentProps<typeof BaseButton>
>(
  (
    {
      icon,
      display = 'inline-flex',
      useTransition = true,
      variant = 'solid-gray',
      children,
      ...props
    },
    ref,
  ) => {
    if (icon) {
      return (
        <ButtonWithIcon ref={ref} {...props}>
          {children}
          {icon}
        </ButtonWithIcon>
      );
    }

    return (
      <BaseButton
        ref={ref}
        display={display as string}
        useTransition={useTransition as boolean}
        variant={variant as string}
        {...props}
      >
        {children}
      </BaseButton>
    );
  },
);
Button.displayName = 'Button';

export default Button;
