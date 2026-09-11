import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/colors';

export default function AdminTabBar({ activeKey = 'Panel', onPress }) {
  const tabs = [
    { key: 'Panel', label: 'Panel', icon: 'grid', iconActive: 'grid' },
    { key: 'Especialistas', label: 'Especialistas', icon: 'person-outline', iconActive: 'person' },
    { key: 'Config', label: 'Config.', icon: 'settings-outline', iconActive: 'settings' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        const iconColor = isActive ? colors.primary : '#1F2937';
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onPress && onPress(tab.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.iconActive : tab.icon}
              size={24}
              color={iconColor}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
    paddingBottom: 22,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#1F2937',
    marginTop: 3,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
