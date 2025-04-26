import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { colors, spacing } from '../theme';
import { DotGrid } from '../components/DotGrid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clipboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export const HomeScreen = ({ navigation }) => {
  const userId = '81313189'; // This would come from your auth system
  const userUrl = `paperchat.io/${userId}`;

  const copyToClipboard = () => {
    Clipboard.setString(userUrl);
    // Add toast or feedback here
  };

  return (
    <SafeAreaView style={styles.container}>
      <DotGrid />
      
      <View style={styles.header}>
        <View style={styles.urlContainer}>
          <Text style={styles.url}>{userUrl}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
            <Image 
              source={require('../assets/icons/copy.png')} 
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('QRCode')} 
            style={styles.iconButton}
          >
            <Image 
              source={require('../assets/icons/qr.png')} 
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.tagline}>Part of Sola Group.</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('NewChat')}
          >
            <Text style={styles.primaryButtonText}>+ New Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('JoinChat')}
          >
            <Text style={styles.secondaryButtonText}>Join a Chat</Text>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    padding: spacing.sm,
    borderRadius: spacing.borderRadius.base,
  },
  url: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  iconButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  logo: {
    width: 200,
    height: 40,
    resizeMode: 'contain',
  },
  tagline: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontSize: 16,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
    padding: spacing.md,
    borderRadius: spacing.borderRadius.base,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.backgroundLight,
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 18,
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