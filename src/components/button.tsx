import React from 'react';
import { Button as RNButton } from 'react-native';

const Button = ({ ...props }: React.ComponentProps<typeof RNButton>) => {
  return <RNButton {...props}>Click me</RNButton>;
};

export default Button;
