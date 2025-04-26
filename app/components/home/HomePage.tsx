import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// Define your root stack param list with all allowed routes
type RootStackParamList = {
  Home: undefined;
  Friends: undefined;
  ChatUniqueCode: undefined;
  SetPassword: { withFriends: boolean };
  TOS: undefined;
  EnterName: undefined;
  Profile: undefined;
};

// DotGrid as a React Native component
const dotSpacing = 20;
const dotSize = 2;
const DotGrid = () => {
  const { width, height } = Dimensions.get('window');
  const rows = Math.floor(height / dotSpacing);
  const cols = Math.floor(width / dotSpacing);
  const dots = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dots.push(
        <View
          key={`${i}-${j}`}
          style={{
            position: 'absolute',
            left: j * dotSpacing + dotSpacing / 2 - dotSize,
            top: i * dotSpacing + dotSpacing / 2 - dotSize,
            width: dotSize * 2,
            height: dotSize * 2,
            borderRadius: dotSize,
            backgroundColor: 'rgba(16,30,58,0.16)',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
      );
    }
  }
  return <View style={{ position: 'absolute', width, height, zIndex: -1 }}>{dots}</View>;
};

export default function HomePage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const userId = 'paperchat.io/81313189';

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userId);
  };

  return (
    <View style={styles.root}>
      <DotGrid />
      <View style={styles.header}>
        <View style={styles.urlContainer}>
          <Text style={styles.url}>{userId}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
            <Image source={require('../../../assets/icons/copy.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconButton}>
            <Image source={require('../../../assets/icons/profile.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.centerTitleBox}>
        <Text style={styles.centerTitle}>Paper Chat</Text>
        <Text style={styles.centerSubtitle}>Part of Sola Group.</Text>
      </View>
      <Text style={styles.question}>What do you want to do?</Text>
      <View style={styles.actionBox}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Friends')}>
          <Text style={styles.actionButtonText}>+ New Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('ChatUniqueCode')}>
          <Text style={styles.secondaryButtonText}>Join a Chat</Text>
        </TouchableOpacity>
        <Text style={styles.tosText}>By pressing <Text style={{fontWeight:'bold'}}>“Continue”</Text> you agree with PaperChat <Text style={{color:'#2C3851'}}>TOS</Text>.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 48,
    width: '100%',
    alignItems: 'center',
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,30,58,0.04)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 12,
  },
  url: {
    color: '#2C3851',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
  },
  iconButton: {
    marginLeft: 6,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(16,30,58,0.03)',
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#2C3851',
  },
  centerTitleBox: {
    alignItems: 'center',
    marginTop: 32,
  },
  centerTitle: {
    fontFamily: 'Bricolage',
    fontWeight: '500',
    fontSize: 32,
    color: '#2C3851',
    letterSpacing: -1.28,
  },
  centerSubtitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(18,18,18,0.48)',
    marginTop: 4,
  },
  question: {
    marginTop: 40,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 24,
    color: '#2C3851',
    textAlign: 'center',
    letterSpacing: -0.48,
  },
  actionBox: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  actionButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(16,30,58,0.8)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: -0.36,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(16,30,58,0.04)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  secondaryButtonText: {
    color: '#2C3851',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: -0.36,
  },
  tosText: {
    color: 'rgba(16,30,58,0.48)',
    fontFamily: 'Poppins',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});
