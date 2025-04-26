import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

const MAX_OPTIONS = 4;
const MIN_OPTIONS = 2;

type OptionItem = { key: string; value: string };

function getDuplicateIndexes(options: OptionItem[]): boolean[] {
  const valueCount: Record<string, number> = {};
  options.forEach(opt => {
    if (opt.value.trim()) valueCount[opt.value.trim().toLowerCase()] = (valueCount[opt.value.trim().toLowerCase()] || 0) + 1;
  });
  return options.map(opt => {
    const isDup = opt.value.trim() && valueCount[opt.value.trim().toLowerCase()] > 1;
    return Boolean(isDup);
  });
}

export default function CreatePollPage() {
  const navigation = useNavigation();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<OptionItem[]>([
    { key: '0', value: '' },
    { key: '1', value: '' },
  ]);
  const [alertText, setAlertText] = useState<string | null>(null);
  const optionKey = useRef(2);

  const duplicateIndexes = getDuplicateIndexes(options);
  const canAddOption = options.length < MAX_OPTIONS && options.every(opt => opt.value.trim() !== '');
  const canShare = question.trim().length > 0 && options.filter(opt => opt.value.trim()).length >= MIN_OPTIONS && !duplicateIndexes.some(Boolean);

  function handleOptionChange(index: number, value: string) {
    const newOptions = [...options];
    newOptions[index].value = value;
    if (value.trim() === '' && options.length > MIN_OPTIONS) {
      newOptions.splice(index, 1);
      setAlertText('Removed');
      setTimeout(() => setAlertText(null), 1200);
    }
    setOptions(newOptions);
  }

  function handleAddOption() {
    if (canAddOption) {
      setOptions([...options, { key: optionKey.current.toString(), value: '' }]);
      optionKey.current++;
    }
  }

  function handleShare() {
    if (!question.trim()) {
      setAlertText('Invalid');
      setTimeout(() => setAlertText(null), 1200);
      return;
    }
    if (options.filter(opt => opt.value.trim()).length < MIN_OPTIONS) {
      setAlertText('Options');
      setTimeout(() => setAlertText(null), 1200);
      return;
    }
    if (duplicateIndexes.some(Boolean)) {
      setAlertText('Duplicate');
      setTimeout(() => setAlertText(null), 1200);
      return;
    }
    setAlertText('Successful');
    setTimeout(() => setAlertText(null), 1200);
    // TODO: Share poll logic
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<OptionItem>) => {
    const index = options.findIndex(opt => opt.key === item.key);
    return (
      <TouchableOpacity
        style={[styles.optionRow, isActive && { opacity: 0.7 }]}
        onLongPress={drag}
        disabled={isActive}
        activeOpacity={1}
      >
        <TextInput
          style={styles.inputBox}
          placeholder={index < 2 ? 'E.g. The Fantastics...' : 'Add an Option'}
          value={item.value}
          onChangeText={value => handleOptionChange(index, value)}
          maxLength={60}
          placeholderTextColor="rgba(16,30,58,0.48)"
        />
        {duplicateIndexes[index] && item.value.trim() ? (
          <Text style={styles.duplicate}>Is already an option</Text>
        ) : null}
        <Ionicons name="reorder-three" size={24} color="#828186" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.wrapper}>
        {alertText && (
          <View style={styles.alert}><Text style={styles.alertText}>{alertText}</Text></View>
        )}
        <View style={styles.header}>
          <View style={{ width: 48 }} />
          <Text style={styles.title}>Poll</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()} accessibilityLabel="Close poll creation">
            <Ionicons name="close" size={32} color="#2C3851" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Share a poll to get feedbacks</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Question</Text>
          <TextInput
            style={styles.inputBox}
            maxLength={250}
            placeholder="E.g. Which you choose between..."
            value={question}
            onChangeText={setQuestion}
            placeholderTextColor="rgba(16,30,58,0.48)"
          />
          <Text style={styles.helper}>Maximum 250 characters</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options</Text>
          <DraggableFlatList
            data={options}
            onDragEnd={({ data }) => setOptions(data)}
            keyExtractor={item => item.key}
            renderItem={renderItem}
            scrollEnabled={false}
            activationDistance={8}
            containerStyle={{ width: '100%' }}
          />
          {canAddOption && options.length < MAX_OPTIONS && (
            <TouchableOpacity style={styles.addOptionBtn} onPress={handleAddOption} accessibilityLabel="Add poll option">
              <Text style={styles.addOptionText}>+ Add Option</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.shareButton, !canShare && { opacity: 0.4 }]}
          disabled={!canShare}
          onPress={handleShare}
          accessibilityLabel="Share poll"
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        <Text style={styles.tosText}><Text style={{ color: '#2C3851', fontWeight: '500' }}>ⓘ</Text> By pressing <Text style={{ fontWeight: 'bold' }}>“Share”</Text> you agree with <Text style={{ fontWeight: 'bold' }}>PaperChat TOS</Text>.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 12,
    paddingBottom: 64,
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#fff',
  },
  alert: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  alertText: {
    backgroundColor: '#2C3851',
    color: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 59,
    left: 0,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Bricolage',
    fontSize: 32,
    color: '#2C3851',
    fontWeight: '700',
    letterSpacing: -0.64,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(16, 30, 58, 0.48)',
    marginTop: 68,
    fontWeight: '500',
    lineHeight: 18,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: 'rgba(16, 30, 58, 0.04)',
    borderRadius: 100,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    width: 351,
    alignSelf: 'center',
    marginTop: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: 'rgba(16, 30, 58, 0.48)',
    letterSpacing: 0.56,
    marginBottom: 8,
  },
  inputBox: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(16, 30, 58, 0.04)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 12,
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#2C3851',
    marginBottom: 4,
  },
  helper: {
    color: 'rgba(16,30,58,0.48)',
    fontSize: 12,
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  duplicate: {
    color: '#EE1245',
    fontSize: 12,
    fontFamily: 'Poppins',
    marginBottom: 4,
    marginLeft: 4,
  },
  addOptionBtn: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 30, 58, 0.04)',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  addOptionText: {
    color: '#2C3851',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
  },
  shareButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(16, 30, 58, 0.8)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  shareButtonText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: -0.36,
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(16, 30, 58, 0.48)',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
});
