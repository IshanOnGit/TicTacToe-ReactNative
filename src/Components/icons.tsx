import React from 'react'
import type { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type IconsProps = PropsWithChildren<{
    name: string;

}>
const icons = ({name}:IconsProps) => {
  switch(name) {
    case 'circle':
        return <Icon name="circle-thin" size={38} color="#efbd08ff"/>
        break;
    case 'cross':
        return <Icon name="times" size={38} color="#e40606ff"/>
        break;
        default:
            return <Icon name="pencil-square" size={38} color="#1694efff"/>
          
  }
}

export default icons