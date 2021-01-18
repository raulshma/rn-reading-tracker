import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';

type Props = {
  iconName: string;
  isCurrent?: boolean;
};

export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  const { colors } = useTheme();
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
        size={24}
        style={{ color: isCurrent ? colors.primary : colors.disabled }}
      />
    </View>
  );
};
