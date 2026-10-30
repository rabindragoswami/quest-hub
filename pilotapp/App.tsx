import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { class7ConnectingDotsPapers, class7CongruencePaper, class7CongruencePaper2, class7ConstructionTilingPaper, class7GeometryPapers, class7HcfGcfPapers, class7SamplePapers, type Question } from './samplePapers';

const questions: Record<number, Question[]> = {
  5: [
    { prompt: 'What is 36 ÷ 4?', choices: ['8', '9', '7', '6'], answer: '9', hint: 'What number multiplied by 4 makes 36?' },
    { prompt: 'Which fraction is equal to ½?', choices: ['2/3', '3/6', '2/5', '1/3'], answer: '3/6', hint: 'Multiply the top and bottom of ½ by the same number.' },
    { prompt: 'What is 125 + 75?', choices: ['190', '200', '210', '180'], answer: '200', hint: '125 + 75 = 125 + 70 + 5.' },
  ],
  6: [
    { prompt: 'What is ¾ of 20?', choices: ['12', '15', '16', '10'], answer: '15', hint: 'First divide 20 by 4, then multiply by 3.' },
    { prompt: 'What is −3 + 8?', choices: ['11', '5', '−5', '4'], answer: '5', hint: 'Start at −3 and move 8 steps to the right.' },
    { prompt: 'A rectangle is 7 cm by 4 cm. What is its area?', choices: ['22 cm²', '28 cm²', '11 cm²', '14 cm²'], answer: '28 cm²', hint: 'Area = length × width.' },
  ],
};

const colors = { ink: '#172B4D', muted: '#6B7890', purple: '#6755D9', pale: '#F3F1FF', line: '#E9ECF3', green: '#16845B', red: '#C74747' };

const class7Papers = [
  ...class7SamplePapers.map((questions, index) => ({ title: `Sample Paper ${index + 1}`, questions })),
  ...class7GeometryPapers.map((questions, index) => ({ title: `Geometry Set ${index + 1}`, questions })),
  { title: 'Geometric Twins: Set 1', questions: class7CongruencePaper },
  { title: 'Geometric Twins: Set 2', questions: class7CongruencePaper2 },
  ...class7HcfGcfPapers.map((questions, index) => ({ title: `HCF / GCF: Practical Set ${index + 1}`, questions })),
  { title: 'Constructions & Tilings', questions: class7ConstructionTilingPaper },
  ...class7ConnectingDotsPapers.map((questions, index) => ({ title: `Connecting the Dots: Set ${index + 1}`, questions })),
];

type Attempt = { score: number; total: number; completedAt: string };
type AttemptHistory = Record<string, Attempt[]>;

const ATTEMPT_HISTORY_KEY = '@math-quest/attempt-history-v1';

function isAttemptHistory(value: unknown): value is AttemptHistory {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    && Object.values(value).every((attempts) => Array.isArray(attempts)
      && attempts.every((attempt) => typeof attempt === 'object' && attempt !== null
        && Number.isInteger(attempt.score)
        && Number.isInteger(attempt.total)
        && attempt.score >= 0
        && attempt.total > 0
        && attempt.score <= attempt.total
        && typeof attempt.completedAt === 'string'
        && Number.isFinite(Date.parse(attempt.completedAt))));
}

export default function App({ onExit }: { onExit?: () => void } = {}) {
  const [grade, setGrade] = useState(5);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const [choosingSet, setChoosingSet] = useState(false);
  const [selectedSet, setSelectedSet] = useState(0);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState<AttemptHistory>({});
  const [historyReady, setHistoryReady] = useState(false);
  const historyRef = useRef<AttemptHistory>({});
  const finalizingAttempt = useRef(false);
  const quiz = grade === 7 ? class7Papers[selectedSet].questions : questions[grade];
  const question = quiz[questionIndex];

  useEffect(() => {
    async function loadAttemptHistory() {
      try {
        const storedHistory = await AsyncStorage.getItem(ATTEMPT_HISTORY_KEY);
        if (storedHistory) {
          const parsedHistory: unknown = JSON.parse(storedHistory);
          if (!isAttemptHistory(parsedHistory)) {
            throw new Error('Saved attempt history has an invalid format.');
          }
          historyRef.current = parsedHistory;
          setAttemptHistory(parsedHistory);
        }
        setHistoryReady(true);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown storage error';
        Alert.alert('Could not load attempt history', message);
      }
    }

    void loadAttemptHistory();
  }, []);

  function startQuiz() {
    finalizingAttempt.current = false;
    setQuestionIndex(0); setScore(0); setSelected(null); setShowHint(false); setFinished(false); setChoosingSet(false);
  }

  function choose(answer: string) {
    if (selected) return;
    setSelected(answer);
    if (answer === question.answer) setScore((current) => current + 1);
  }

  async function next() {
    if (questionIndex === quiz.length - 1) {
      if (grade === 7 && finalizingAttempt.current) return;
      finalizingAttempt.current = true;
      if (grade === 7) await saveAttempt();
      setFinished(true);
      finalizingAttempt.current = false;
    } else { setQuestionIndex((current) => current + 1); setSelected(null); setShowHint(false); }
  }

  async function saveAttempt() {
    if (!historyReady) {
      Alert.alert('Attempt history unavailable', 'This attempt could not be saved because history did not finish loading.');
      return;
    }

    const paper = class7Papers[selectedSet];
    const nextHistory: AttemptHistory = {
      ...historyRef.current,
      [paper.title]: [
        ...(historyRef.current[paper.title] ?? []),
        { score, total: quiz.length, completedAt: new Date().toISOString() },
      ],
    };

    try {
      await AsyncStorage.setItem(ATTEMPT_HISTORY_KEY, JSON.stringify(nextHistory));
      historyRef.current = nextHistory;
      setAttemptHistory(nextHistory);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown storage error';
      Alert.alert('Could not save attempt', message);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topline}><Text style={styles.brandMark}>✦</Text><Text style={styles.brand}>MATH QUEST</Text>{onExit && <TouchableOpacity onPress={onExit} style={styles.exitButton}><Text style={styles.exitText}>← All apps</Text></TouchableOpacity>}<Text style={styles.streak}>☀  1</Text></View>
        {!finished ? <>
          <Text style={styles.eyebrow}>YOUR LITTLE DAILY CHALLENGE</Text>
          <Text style={styles.title}>Big ideas.{ '\n' }Small steps.</Text>
          <Text style={styles.subtitle}>Choose your class and let’s make maths fun.</Text>

          <View style={styles.gradeCard}>
            <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Choose your class</Text><Text style={styles.sectionNote}>CLASS</Text></View>
            <View style={styles.gradeRow}>{[5, 6, 7].map((item) => <TouchableOpacity key={item} onPress={() => { setGrade(item); if (item === 7) { setChoosingSet(true); } else { startQuiz(); } }} style={[styles.gradeButton, grade === item && styles.gradeActive]}><Text style={[styles.gradeText, grade === item && styles.gradeTextActive]}>{item}</Text></TouchableOpacity>)}</View>
          </View>

          {choosingSet ? <View style={styles.quizCard}>
            {viewingHistory ? <>
              <Text style={styles.sectionTitle}>Attempt history</Text>
              <Text style={styles.subtitle}>Scores from completed Class 7 papers on this device.</Text>
              <View style={styles.paperList}>{class7Papers.map((paper) => {
                const attempts = attemptHistory[paper.title] ?? [];
                return <View key={paper.title} style={styles.historyPaper}>
                  <Text style={styles.paperTitle}>{paper.title}</Text>
                  {attempts.length === 0
                    ? <Text style={styles.paperSubtitle}>No attempts yet</Text>
                    : [...attempts].reverse().map((attempt, index) => <Text key={`${attempt.completedAt}-${index}`} style={styles.historyEntry}>{new Date(attempt.completedAt).toLocaleString()} · {attempt.score}/{attempt.total}</Text>)}
                </View>;
              })}</View>
              <TouchableOpacity onPress={() => setViewingHistory(false)} style={styles.historyBack}><Text style={styles.hintButton}>← Back to papers</Text></TouchableOpacity>
            </> : <>
            <Text style={styles.sectionTitle}>Class 7 practice papers</Text>
            <Text style={styles.subtitle}>Choose a 10-question set to begin.</Text>
            <TouchableOpacity onPress={() => setViewingHistory(true)} disabled={!historyReady} style={styles.historyButton}><Text style={[styles.hintButton, !historyReady && styles.disabledText]}>{historyReady ? 'View attempt history' : 'Loading attempt history…'}</Text></TouchableOpacity>
            <View style={styles.paperList}>{class7Papers.map((paper, index) => {
              const attempts = attemptHistory[paper.title] ?? [];
              const bestScore = attempts.length > 0 ? Math.max(...attempts.map((attempt) => attempt.score)) : null;
              return <TouchableOpacity key={paper.title} disabled={!historyReady} onPress={() => { setSelectedSet(index); setGrade(7); startQuiz(); }} style={[styles.paperButton, !historyReady && styles.disabledButton]}><View><Text style={styles.paperTitle}>{paper.title}</Text><Text style={styles.paperSubtitle}>{paper.questions.length} multiple-choice questions{attempts.length > 0 ? ` · ${attempts.length} attempts · best ${bestScore}/${paper.questions.length}` : ''}</Text></View><Text style={styles.nextText}>Start  →</Text></TouchableOpacity>;
            })}</View>
            </>}
          </View> : <View style={styles.quizCard}>
            <View style={styles.quizMeta}><Text style={styles.pill}>{grade === 7 ? `✦  ${class7Papers[selectedSet].title.toUpperCase()}` : '✦  QUICK QUIZ'}</Text><Text style={styles.progress}>{questionIndex + 1} / {quiz.length}</Text></View>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${((questionIndex + 1) / quiz.length) * 100}%` }]} /></View>
            <Text style={styles.question}>{question.prompt}</Text>
            <View style={styles.choices}>{question.choices.map((choice, i) => {
              const correct = selected !== null && choice === question.answer;
              const wrong = selected === choice && choice !== question.answer;
              return <TouchableOpacity key={choice} onPress={() => choose(choice)} style={[styles.choice, correct && styles.choiceCorrect, wrong && styles.choiceWrong]}><Text style={[styles.choiceLetter, correct && styles.choiceLetterCorrect, wrong && styles.choiceLetterWrong]}>{String.fromCharCode(65 + i)}</Text><Text style={styles.choiceText}>{choice}</Text>{correct && <Text style={styles.check}>✓</Text>}{wrong && <Text style={styles.check}>×</Text>}</TouchableOpacity>;
            })}</View>
            {selected && <View style={styles.answerFeedback}><Text style={[styles.feedback, selected === question.answer ? styles.correctText : styles.wrongText]}>{selected === question.answer ? 'Nice work! You got it.' : `Not quite. The correct answer is ${question.answer}.`}</Text>{selected !== question.answer && <Text style={styles.explanation}>How to work it out: {question.hint}</Text>}</View>}
            {showHint && (!selected || selected === question.answer) && <Text style={styles.hint}>Hint: {question.hint}</Text>}
            <View style={styles.actions}><TouchableOpacity onPress={() => setShowHint(!showHint)}><Text style={styles.hintButton}>{showHint ? 'Hide hint' : 'Need a hint?'}</Text></TouchableOpacity>{selected ? <TouchableOpacity style={styles.nextButton} onPress={next}><Text style={styles.nextText}>{questionIndex === quiz.length - 1 ? 'See score  →' : 'Next  →'}</Text></TouchableOpacity> : null}</View>
          </View>}
          <View style={styles.footer}><Text style={styles.footerIcon}>🌱</Text><Text style={styles.footerText}>Every question is a chance to grow.</Text></View>
        </> : <View style={styles.resultCard}><Text style={styles.resultIcon}>{score === quiz.length ? '🏆' : '🌟'}</Text><Text style={styles.eyebrow}>QUIZ COMPLETE</Text><Text style={styles.resultTitle}>{score} out of {quiz.length}</Text><Text style={styles.subtitle}>{score === quiz.length ? 'Perfect score! You’re on a roll.' : 'Nice effort! A little practice goes a long way.'}</Text><TouchableOpacity style={styles.primaryButton} onPress={startQuiz}><Text style={styles.primaryText}>Try again  →</Text></TouchableOpacity>{grade === 7 && <TouchableOpacity onPress={() => { setFinished(false); setChoosingSet(true); setViewingHistory(true); }}><Text style={styles.hintButton}>View attempt history</Text></TouchableOpacity>}</View>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FC' }, page: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 36, maxWidth: 560, width: '100%', alignSelf: 'center' },
  topline: { flexDirection: 'row', alignItems: 'center', marginBottom: 36 }, brandMark: { color: colors.purple, fontSize: 25, marginRight: 8 }, brand: { color: colors.ink, letterSpacing: 2.4, fontWeight: '800', fontSize: 12 }, exitButton: { marginLeft: 'auto', padding: 8 }, exitText: { color: colors.purple, fontWeight: '700', fontSize: 12 }, streak: { marginLeft: 8, backgroundColor: '#FFF4DF', color: '#A06B12', paddingVertical: 8, paddingHorizontal: 12, overflow: 'hidden', borderRadius: 14, fontWeight: '700' },
  eyebrow: { color: colors.purple, fontWeight: '800', letterSpacing: 1.5, fontSize: 10, marginBottom: 10 }, title: { color: colors.ink, fontSize: 38, fontWeight: '800', lineHeight: 43, letterSpacing: -1.3 }, subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 9 },
  gradeCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 17, marginTop: 24, marginBottom: 15 }, sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }, sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.ink }, sectionNote: { color: '#9AA4B5', fontSize: 9, fontWeight: '800', letterSpacing: 1.5 }, gradeRow: { flexDirection: 'row', gap: 9 }, gradeButton: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#F5F6FA', borderWidth: 1, borderColor: 'transparent' }, gradeActive: { backgroundColor: colors.pale, borderColor: '#D9D3FF' }, gradeText: { color: colors.muted, fontSize: 15, fontWeight: '700' }, gradeTextActive: { color: colors.purple },
  quizCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 18 }, paperList: { gap: 10, marginTop: 18 }, paperButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderWidth: 1, borderColor: colors.line, borderRadius: 12, backgroundColor: '#FFF' }, disabledButton: { opacity: 0.55 }, historyPaper: { padding: 12, borderWidth: 1, borderColor: colors.line, borderRadius: 12 }, historyEntry: { color: colors.muted, fontSize: 11, marginTop: 6 }, historyButton: { alignSelf: 'flex-start', marginTop: 12 }, historyBack: { marginTop: 18 }, disabledText: { opacity: 0.55 }, paperTitle: { color: colors.ink, fontSize: 14, fontWeight: '700' }, paperSubtitle: { color: colors.muted, fontSize: 11, marginTop: 4 }, quizMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, pill: { color: colors.purple, backgroundColor: colors.pale, borderRadius: 20, overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 6, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, progress: { color: colors.muted, fontSize: 11, fontWeight: '700' }, progressTrack: { height: 5, backgroundColor: '#EEF0F5', borderRadius: 3, marginTop: 15, marginBottom: 20 }, progressFill: { height: 5, backgroundColor: colors.purple, borderRadius: 3 }, question: { color: colors.ink, fontSize: 21, lineHeight: 28, fontWeight: '700', marginBottom: 16 }, choices: { gap: 9 }, choice: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 48, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.line, borderRadius: 12, backgroundColor: '#FFF' }, choiceCorrect: { borderColor: '#B9E4D3', backgroundColor: '#F1FAF6' }, choiceWrong: { borderColor: '#F0CACA', backgroundColor: '#FFF6F5' }, choiceLetter: { color: colors.muted, fontSize: 11, fontWeight: '800', backgroundColor: '#F1F3F7', overflow: 'hidden', borderRadius: 8, padding: 7, textAlign: 'center', width: 28 }, choiceLetterCorrect: { color: colors.green, backgroundColor: '#DDF3E9' }, choiceLetterWrong: { color: colors.red, backgroundColor: '#FCE5E2' }, choiceText: { color: colors.ink, fontSize: 14, fontWeight: '600', flex: 1 }, check: { color: colors.green, fontSize: 17, fontWeight: '800' }, answerFeedback: { marginTop: 12 }, feedback: { fontSize: 13, fontWeight: '700' }, explanation: { marginTop: 6, color: colors.muted, fontSize: 12, lineHeight: 18 }, correctText: { color: colors.green }, wrongText: { color: colors.red }, hint: { marginTop: 11, color: '#725C18', backgroundColor: '#FFF8E8', borderRadius: 10, padding: 11, fontSize: 12, lineHeight: 18 }, actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }, hintButton: { color: colors.purple, fontWeight: '700', fontSize: 12 }, nextButton: { backgroundColor: colors.purple, borderRadius: 11, paddingVertical: 11, paddingHorizontal: 15 }, nextText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 21, gap: 7 }, footerIcon: { fontSize: 13 }, footerText: { color: '#8A96A8', fontSize: 11 }, resultCard: { alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.line, borderRadius: 22, padding: 26, marginTop: 50 }, resultIcon: { fontSize: 48, marginBottom: 18 }, resultTitle: { color: colors.ink, fontSize: 34, fontWeight: '800', marginTop: 4 }, primaryButton: { backgroundColor: colors.purple, borderRadius: 12, paddingHorizontal: 22, paddingVertical: 13, marginTop: 24 }, primaryText: { color: '#FFF', fontWeight: '700' },
});
