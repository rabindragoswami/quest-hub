import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MathQuest from '../pilotapp/App';
import GeoQuest from '../geographyapp/App';

type QuestId = 'math' | 'geography';

const quests: {
  id: QuestId;
  mark: string;
  name: string;
  description: string;
  detail: string;
  color: string;
  pale: string;
}[] = [
  {
    id: 'math',
    mark: '✦',
    name: 'Math Quest',
    description: 'Build confidence with fun maths challenges.',
    detail: 'Classes 5–7 · Practice papers · Hints · Attempt history',
    color: '#6755D9',
    pale: '#F3F1FF',
  },
  {
    id: 'geography',
    mark: '◈',
    name: 'Geo Quest',
    description: 'Explore India, its neighbours, and farming.',
    detail: 'Grade 7 · Chapter quizzes · Maps · Illustrated questions',
    color: '#167C80',
    pale: '#EAF7F6',
  },
];

export default function App() {
  const [activeQuest, setActiveQuest] = useState<QuestId | null>(null);

  if (activeQuest === 'math') {
    return <MathQuest onExit={() => setActiveQuest(null)} />;
  }

  if (activeQuest === 'geography') {
    return <GeoQuest onExit={() => setActiveQuest(null)} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandLockup}>
            <Text style={styles.brandMark}>✦</Text>
            <Text style={styles.brand}>QUEST HUB</Text>
          </View>
          <Text style={styles.gradeTag}>LEARN AT YOUR PACE</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>A LITTLE PRACTICE GOES A LONG WAY</Text>
          <Text style={styles.title}>Big ideas.{'\n'}Bright futures.</Text>
          <Text style={styles.subtitle}>Choose an adventure and learn one question at a time.</Text>
        </View>

        <View style={styles.questList}>
          {quests.map((quest) => (
            <TouchableOpacity
              key={quest.id}
              accessibilityRole="button"
              onPress={() => setActiveQuest(quest.id)}
              style={[styles.questCard, { borderColor: quest.pale }]}
            >
              <View style={[styles.questMark, { backgroundColor: quest.pale }]}>
                <Text style={[styles.questMarkText, { color: quest.color }]}>{quest.mark}</Text>
              </View>
              <Text style={styles.questName}>{quest.name}</Text>
              <Text style={styles.questDescription}>{quest.description}</Text>
              <Text style={styles.questDetail}>{quest.detail}</Text>
              <View style={[styles.openButton, { backgroundColor: quest.color }]}>
                <Text style={styles.openButtonText}>Open {quest.name}  →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Made for curious minds</Text>
          <Text style={styles.footerText}>Practice, learn from hints, and celebrate progress.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, minHeight: '100%', backgroundColor: '#F7F9FC' },
  page: { width: '100%', maxWidth: 850, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 22, paddingBottom: 52 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 70 },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { color: '#6755D9', fontSize: 24, fontWeight: '800' },
  brand: { color: '#172B4D', fontSize: 12, fontWeight: '800', letterSpacing: 2.4 },
  gradeTag: { color: '#6B7890', backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  hero: { maxWidth: 600, marginBottom: 32 },
  eyebrow: { color: '#6755D9', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 12 },
  title: { color: '#172B4D', fontSize: 48, lineHeight: 55, fontWeight: '800', letterSpacing: -1.6 },
  subtitle: { color: '#6B7890', fontSize: 16, lineHeight: 24, marginTop: 12 },
  questList: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  questCard: { flexGrow: 1, flexBasis: 300, maxWidth: 410, backgroundColor: '#FFF', borderWidth: 1, borderRadius: 22, padding: 22 },
  questMark: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginBottom: 18 },
  questMarkText: { fontSize: 26, fontWeight: '800' },
  questName: { color: '#172B4D', fontSize: 23, fontWeight: '800' },
  questDescription: { color: '#6B7890', fontSize: 14, lineHeight: 21, marginTop: 8 },
  questDetail: { color: '#6B7890', fontSize: 11, lineHeight: 17, marginTop: 14 },
  openButton: { alignSelf: 'flex-start', borderRadius: 11, marginTop: 20, paddingHorizontal: 15, paddingVertical: 12 },
  openButtonText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  footer: { borderTopWidth: 1, borderTopColor: '#E9ECF3', marginTop: 52, paddingTop: 20 },
  footerTitle: { color: '#172B4D', fontSize: 12, fontWeight: '700' },
  footerText: { color: '#6B7890', fontSize: 11, marginTop: 5 },
});
