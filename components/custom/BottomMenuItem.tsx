import React from 'react';
import { View } from 'react-native';
import { blue, grey } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  iconName: string;
  isCurrent?: boolean;
};

export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon
        name={iconName}
        size={32}
        style={{ color: isCurrent ? blue : grey }}
      />
    </View>
  );
};
