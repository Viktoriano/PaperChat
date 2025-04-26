import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SetPassword: { withFriends: boolean };
  TOS: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

export const NewChatScreen: React.FC<Props> = ({ navigation }) => {
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

        <Text style={styles.title}>With Friends</Text>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('SetPassword', { withFriends: true })}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('SetPassword', { withFriends: false })}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
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
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
    backgroundColor: colors.backgroundLight,
    padding: spacing.md,
    borderRadius: spacing.borderRadius.base,
    alignItems: 'center',
  },
  buttonText: {
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