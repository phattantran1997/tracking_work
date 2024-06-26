import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BodyText from '../../components/BodyText';
import Heading from '../../components/Heading';
import theme from '../../theme/theme';
import useThemeContext from '../../theme/useThemeContext';

export default function SettingsScreen() {

  const { colors, isSystemTheme, systemTheme, colorTheme, setColorTheme } =
    useThemeContext();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken'); // remove access token from local storage
    navigation.navigate('Login'); // navigate to Login screen
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgrounds.default },
      ]}
    >
      <View style={[styles.heading, { borderColor: colors.textMuted }]}>
        <Heading style={[styles.headingText, { color: colors.text }]}>
          Dark Mode
        </Heading>
      </View>
      <View style={styles.row}>
        <BodyText style={styles.label}>
          Automatic (follow device setting)
        </BodyText>
        <Switch
          trackColor={{
            false: colors.backgrounds.soft,
            true: colors.backgrounds.strong,
          }}
          ios_backgroundColor={colors.backgrounds.soft}
          thumbColor={colors.backgrounds.default}
          onValueChange={(on) => setColorTheme(on ? null : systemTheme)}
          value={isSystemTheme}
        />
      </View>
      <View style={styles.row}>
        <BodyText
          style={[styles.label, isSystemTheme && { color: colors.textMuted }]}
        >
          Dark Mode
        </BodyText>
        <Switch
          trackColor={{
            false: colors.backgrounds.soft,
            true: colors.backgrounds.strong,
          }}
          disabled={isSystemTheme}
          ios_backgroundColor={colors.backgrounds.soft}
          thumbColor={colors.backgrounds.default}
          onValueChange={(on) => setColorTheme(on ? 'dark' : 'light')}
          value={colorTheme === 'dark'}
        />
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.gaps.g24,
    paddingHorizontal: theme.gaps.screen.horizontal,
  },
  heading: {
    borderBottomWidth: 1,
    marginBottom: theme.gaps.g12,
  },
  headingText: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.gaps.g12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});