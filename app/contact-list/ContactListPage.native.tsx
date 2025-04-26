import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const friends = [
  { name: 'Arctic Monkeys', img: require('./assets/arctic-monkeys.jpg'), meta: '3:56' },
  { name: 'Pixar Disney', img: require('./assets/pixar-disney.png'), meta: '3:56' },
  { name: 'Clone Trooper', img: require('./assets/clone-trooper.png'), meta: '3:56' },
];

export default function ContactListPage() {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.contents}>
        <View style={styles.artistRow}>
          <Text style={styles.artistName}>Artist Name</Text>
          <View style={styles.artistIconBox}>
            {/* Replace with SVG or icon if needed */}
            <View style={styles.artistVectorBg} />
            <View style={styles.artistVectorFg} />
          </View>
        </View>
        <View style={styles.friendList}>
          {friends.map((f, i) => (
            <View style={styles.friendItem} key={i}>
              <View style={styles.friendTitlesImg}>
                <Image source={f.img} style={styles.friendImg} />
                <View style={styles.friendTitles}>
                  <Text style={styles.songTitle}>{f.name}</Text>
                  <View style={styles.titleRow}>
                    <Text style={styles.friendMeta}>{f.meta}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.friendAction}>
                {/* Replace with icon if needed */}
                <View style={styles.actionVectorBg} />
                <View style={styles.actionVectorFg} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 160,
    paddingHorizontal: 12,
    paddingBottom: 34,
    backgroundColor: '#2C3851',
    width: 375,
    height: 812,
    minHeight: 812,
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    gap: 20,
    width: 351,
    minHeight: 244,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 82,
    height: 16,
  },
  artistName: {
    width: 62,
    height: 11,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.5,
    color: 'rgba(255,255,255,0.8)',
    textAlignVertical: 'center',
  },
  artistIconBox: {
    width: 16,
    height: 16,
    marginLeft: 4,
    position: 'relative',
  },
  artistVectorBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.87,
    backgroundColor: 'transparent',
  },
  artistVectorFg: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    top: '35.79%',
    bottom: '33.33%',
    backgroundColor: '#FFFFFF',
  },
  friendList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    width: 351,
    minHeight: 208,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 351,
    height: 40,
  },
  friendTitlesImg: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 303,
    height: 40,
  },
  friendImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 12,
  },
  friendTitles: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    width: 251,
    height: 29,
  },
  songTitle: {
    width: 251,
    height: 11,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 17,
    color: '#FFFFFF',
    textAlignVertical: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 251,
    height: 8,
  },
  friendMeta: {
    width: 122,
    height: 8,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
    color: 'rgba(255,255,255,0.48)',
    textAlignVertical: 'center',
  },
  friendAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    gap: 7.14,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 100,
    marginLeft: 8,
  },
  actionVectorBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  actionVectorFg: {
    position: 'absolute',
    left: '8.33%',
    right: '8.33%',
    top: '8.33%',
    bottom: '8.34%',
    backgroundColor: '#FFFFFF',
  },
});
