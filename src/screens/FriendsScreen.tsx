import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

type Friend = {
  id: string;
  name: string;
  avatar: string;
  date: string;
};

const SAMPLE_FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Myles Webb',
    avatar: require('../assets/avatars/myles.png'),
    date: 'Since March 12, 2025',
  },
  {
    id: '2',
    name: 'Josianne Minders',
    avatar: require('../assets/avatars/josianne.png'),
    date: 'Since March 12, 2025',
  },
  {
    id: '3',
    name: 'Edouard Philips',
    avatar: require('../assets/avatars/edouard.png'),
    date: 'Since March 12, 2025',
  },
  {
    id: '4',
    name: 'Marc Antoine',
    avatar: require('../assets/avatars/marc.png'),
    date: 'Since March 12, 2025',
  },
];

type Tab = 'all' | 'requests';

export const FriendsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [isRecentsExpanded, setIsRecentsExpanded] = useState(true);
  const [isAllFriendsExpanded, setIsAllFriendsExpanded] = useState(true);

  const renderFriendItem = (friend: Friend, showActions: boolean = false) => (
    <View key={friend.id} style={styles.friendItem}>
      <Image source={friend.avatar} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{friend.name}</Text>
        <Text style={styles.friendDate}>{friend.date}</Text>
      </View>
      {showActions ? (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Image 
              source={require('../assets/icons/check.png')} 
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image 
              source={require('../assets/icons/close.png')} 
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => navigation.navigate('Chat', { friendId: friend.id })}
        >
          <Image 
            source={require('../assets/icons/chat.png')} 
            style={styles.chatIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );

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

        <View style={styles.searchContainer}>
          <Image 
            source={require('../assets/icons/search.png')} 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a friend"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <TouchableOpacity 
          style={styles.idButton}
          onPress={() => navigation.navigate('ID')}
        >
          <Text style={styles.idButtonText}>ID</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.qrButton}
          onPress={() => navigation.navigate('QRCode')}
        >
          <Image 
            source={require('../assets/icons/qr.png')} 
            style={styles.qrIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView>
          {activeTab === 'all' ? (
            <>
              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => setIsRecentsExpanded(!isRecentsExpanded)}
              >
                <Text style={styles.sectionTitle}>Recents</Text>
                <Image 
                  source={require('../assets/icons/chevron.png')} 
                  style={[
                    styles.chevron,
                    { transform: [{ rotate: isRecentsExpanded ? '0deg' : '-90deg' }] }
                  ]}
                />
              </TouchableOpacity>
              {isRecentsExpanded && SAMPLE_FRIENDS.map(friend => renderFriendItem(friend))}

              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => setIsAllFriendsExpanded(!isAllFriendsExpanded)}
              >
                <Text style={styles.sectionTitle}>All Friends</Text>
                <Image 
                  source={require('../assets/icons/chevron.png')} 
                  style={[
                    styles.chevron,
                    { transform: [{ rotate: isAllFriendsExpanded ? '0deg' : '-90deg' }] }
                  ]}
                />
              </TouchableOpacity>
              {isAllFriendsExpanded && SAMPLE_FRIENDS.map(friend => renderFriendItem(friend))}
            </>
          ) : (
            SAMPLE_FRIENDS.map(friend => renderFriendItem(friend, true))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
    gap: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    padding: spacing.sm,
  },
  idButton: {
    backgroundColor: colors.backgroundLight,
    padding: spacing.sm,
    borderRadius: spacing.borderRadius.base,
  },
  idButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  qrButton: {
    backgroundColor: colors.backgroundLight,
    padding: spacing.sm,
    borderRadius: spacing.borderRadius.base,
  },
  qrIcon: {
    width: 20,
    height: 20,
    tintColor: colors.text,
  },
  tabs: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.borderRadius.full,
  },
  activeTab: {
    backgroundColor: colors.text,
  },
  tabText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.background,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: colors.text,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  friendInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  friendName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  friendDate: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  chatButton: {
    padding: spacing.sm,
  },
  chatIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    backgroundColor: colors.backgroundLight,
    padding: spacing.sm,
    borderRadius: spacing.borderRadius.full,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: colors.text,
  },
}); 