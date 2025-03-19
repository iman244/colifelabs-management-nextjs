"use client"
import React, { FC } from 'react'
import * as Icons from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

type IconComponents = {
  [key: string]: React.ComponentType;
};

function getIconComponent(name: string) {
    return (Icons as IconComponents)[name] || Icons.Help;
  }

export const DIcon: FC<{name: string} & SvgIconProps> = ({name}) => {
    const IconComponent = getIconComponent(name);

  return (
    <IconComponent  />
  )
}
