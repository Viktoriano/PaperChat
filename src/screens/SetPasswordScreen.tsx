import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export const SetPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image 
            source={require('../assets/icons/back.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Set a password</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="******"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={() => navigation.navigate('Chat', { password })}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.terms}>
        By pressing "Continue" you agree with PaperChat{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('TOS')}>
          TOS
        </Text>
        .
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  logoContainer: {
    marginBottom: spacing['2xl'],
  },
  logo: {
    width: 200,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing.xl,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: colors.backgroundLight,
    borderRadius: spacing.borderRadius.base,
    marginBottom: spacing.xl,
  },
  input: {
    width: '100%',
    color: colors.text,
    fontSize: 18,
    padding: spacing.md,
    textAlign: 'center',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: colors.backgroundLight,
    padding: spacing.md,
    borderRadius: spacing.borderRadius.base,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '500',
  },
  terms: {
    color: colors.textSecondary,
    textAlign: 'center',
    padding: spacing.md,
    fontSize: 12,
  },
  link: {
    color: colors.text,
    textDecorationLine: 'underline',
  },
}); 