import Svg, { Circle, Ellipse, G, Path, Rect, Text as SvgText } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';

type IllustrationKind =
  | 'history'
  | 'seasons'
  | 'soil'
  | 'soilCare'
  | 'water'
  | 'seeds'
  | 'technology'
  | 'sustainable'
  | 'farm';

const illustrations: { kind: IllustrationKind; title: string }[] = [
  { kind: 'history', title: 'Farming knowledge through time' },
  { kind: 'seasons', title: 'Seasons shape the harvest' },
  { kind: 'soil', title: 'Layers and types of soil' },
  { kind: 'soilCare', title: 'Caring for healthy soil' },
  { kind: 'water', title: 'Water for growing crops' },
  { kind: 'seeds', title: 'Seeds and planting' },
  { kind: 'technology', title: 'Tools and modern farming' },
  { kind: 'sustainable', title: 'Farming for the future' },
  { kind: 'farm', title: 'A diverse farm' },
];

function illustrationForQuestion(question: string): (typeof illustrations)[number] {
  const text = question.toLowerCase();
  if (/ancient|histor|xuanzang|arthashastra|vrikshayurveda|graft|kulaagar|gokrishi|generation|traditional wisdom|traditional farming|inherited practices|farming knowledge/.test(text)) {
    return illustrations[0];
  }
  if (/seed|sow|sowing|germinat|beejamrit|planting/.test(text)) return illustrations[5];
  if (/green revolution|tractor|harvester|mechanis|modern equipment|high-yield|high yielding|machine|ic ar|icar/.test(text)) {
    return illustrations[6];
  }
  if (/rotation|erosion|terrace|slope|afforestation|mulch|contour|panchagavya|multiple cropping|crop residue/.test(text)) {
    return illustrations[3];
  }
  if (/soil|silt|humus|weathering|alluvial|alpine|laterite|desert soil|black soil|red soil/.test(text)) {
    return illustrations[2];
  }
  if (/irrigat|water|rain-fed|rainfall|monsoon|drought|drip|sprinkler|bamboo|pond|canal|groundwater|water-harvesting/.test(text)) {
    return illustrations[4];
  }
  if (/kharif|rabi|zaid|season|climate|weather|agroclimatic|cucumber|watermelon|mustard|wheat|bajra|rice/.test(text)) {
    return illustrations[1];
  }
  if (/organic|sustainable|neem|biodiversity|ecosystem|pollution|chemical|sikkim|future|fertility|fertilis|pesticide|bee|balance|conserv/.test(text)) {
    return illustrations[7];
  }
  if (/livestock|horticulture|fruit|self-sufficiency|food grain|agricultural allied|produce/.test(text)) {
    return illustrations[8];
  }
  return illustrations[8];
}

function Scene({ kind }: { kind: IllustrationKind }) {
  if (kind === 'history') {
    return (
      <>
        <Path d="M0 119 Q80 105 160 118 T320 114 V150 H0Z" fill="#C8DDAF" />
        <Path d="M83 100 Q85 58 120 48 Q153 58 155 100Z" fill="#D6A65D" stroke="#8F6336" strokeWidth="3" />
        <Path d="M101 82 H137 M99 92 H139 M107 102 H132" stroke="#8F6336" strokeWidth="3" strokeLinecap="round" />
        <Path d="M199 113 C200 88 198 75 199 57 M199 83 L182 69 M199 76 L216 61" fill="none" stroke="#6D874C" strokeWidth="5" strokeLinecap="round" />
        <Path d="M180 68 Q177 52 188 55 Q199 59 197 72 Q189 77 180 68 M205 65 Q211 50 220 57 Q224 67 210 73" fill="#79A55E" stroke="#527442" strokeWidth="2" />
        <Path d="M195 56 Q200 49 205 57" fill="none" stroke="#B87646" strokeWidth="4" />
        <Path d="M234 107 l15 -28 15 28z" fill="#789B6B" />
      </>
    );
  }

  if (kind === 'seasons') {
    return (
      <>
        <Path d="M0 115 Q70 102 152 117 T320 112 V150 H0Z" fill="#B7D494" />
        <Circle cx="268" cy="36" r="18" fill="#F4C65E" />
        <Path d="M25 58 Q32 39 50 48 Q59 28 78 43 Q98 39 103 58Z" fill="#FFF" stroke="#BDD3DC" strokeWidth="2" />
        <Path d="M43 63 l-4 13 m19 -13 l-4 13 m19 -13 l-4 13 m18 -13 l-4 13" stroke="#5AA6C3" strokeWidth="3" strokeLinecap="round" />
        {[142, 176, 210].map((x, i) => (
          <G key={x}>
            <Path d={`M${x} 112 q${i - 1} -23 1 -38`} stroke="#507B48" strokeWidth="4" />
            <Path d={`M${x + 1} 93 q-15 -11 -17 -1 q8 9 17 8 M${x + 1} 85 q13 -12 18 -3 q-5 10 -18 11`} fill="#88AD59" />
            <Path d={`M${x - 6} 113 h14`} stroke="#84663D" strokeWidth="3" />
          </G>
        ))}
        <Path d="M119 121 H226" stroke="#D6B36C" strokeWidth="3" strokeDasharray="5 5" />
      </>
    );
  }

  if (kind === 'soil') {
    return (
      <>
        <Rect x="0" y="89" width="320" height="24" fill="#79543D" />
        <Rect x="0" y="113" width="320" height="19" fill="#BD8D58" />
        <Rect x="0" y="132" width="320" height="18" fill="#D6C091" />
        <Path d="M0 89 Q70 78 142 88 T320 86 V98 H0Z" fill="#7EAC5A" />
        <Path d="M72 88 C76 66 78 53 78 39 M78 64 L61 53 M78 57 L94 46" fill="none" stroke="#527D43" strokeWidth="4" />
        <Path d="M61 53 Q54 39 67 39 Q77 45 78 58 M88 47 Q93 33 102 40 Q104 51 90 55" fill="#80AA5D" />
        <Path d="M224 86 C221 67 225 55 233 46 M230 65 L215 56 M230 59 L244 51" fill="none" stroke="#527D43" strokeWidth="4" />
        <Path d="M214 56 Q211 44 222 46 Q229 51 230 65 M240 53 Q246 41 254 48 Q253 57 238 62" fill="#80AA5D" />
        <Path d="M142 101 l10 5 -7 5 9 5 M183 98 l-8 6 10 5 -8 7" fill="none" stroke="#E3BD78" strokeWidth="2" />
        <Circle cx="49" cy="103" r="3" fill="#E8D9BC" />
        <Circle cx="270" cy="121" r="3" fill="#876347" />
      </>
    );
  }

  if (kind === 'soilCare') {
    return (
      <>
        <Path d="M0 105 Q80 97 160 105 T320 101 V150 H0Z" fill="#A87A4F" />
        <Path d="M0 104 Q80 95 160 104 T320 99" fill="none" stroke="#77A957" strokeWidth="9" />
        <Path d="M74 102 Q77 76 76 51 M76 78 L59 66 M76 72 L93 59 M178 101 Q181 75 180 48 M180 76 L162 65 M180 69 L199 57 M263 99 Q260 77 264 57" fill="none" stroke="#557E47" strokeWidth="4" />
        <Path d="M58 68 Q53 54 66 54 Q76 60 76 78 M88 60 Q94 47 103 54 Q103 65 89 70 M162 67 Q157 54 170 53 Q180 61 180 77 M195 59 Q201 46 209 54 Q209 64 194 69" fill="#8BB769" />
        <Path d="M76 107 C58 118 84 120 69 132 S89 140 80 149 M180 105 C200 116 172 120 192 130 S174 140 188 149 M263 103 C248 117 273 126 257 139" fill="none" stroke="#E3C79E" strokeWidth="3" />
        <Path d="M117 111 q9 6 0 12 q-9 6 1 12 q10 6 0 12" fill="none" stroke="#C9A46E" strokeWidth="3" />
      </>
    );
  }

  if (kind === 'water') {
    return (
      <>
        <Path d="M0 110 Q84 96 160 109 T320 104 V150 H0Z" fill="#9BC978" />
        <Path d="M0 130 Q48 119 91 130 T180 128 T270 128 T320 124 V150 H0Z" fill="#8CC8D5" opacity={0.85} />
        <Path d="M160 105 V62 H286 V107" fill="none" stroke="#477D9A" strokeWidth="6" strokeLinecap="round" />
        {[178, 205, 232, 259].map((x) => <Path key={x} d={`M${x} 62 v9`} stroke="#477D9A" strokeWidth="3" />)}
        {[178, 205, 232, 259].map((x) => <Path key={x} d={`M${x} 72 q-8 10 0 17 q8 -7 0 -17`} fill="#57AAC7" />)}
        <Path d="M69 108 V56 M69 73 L52 61 M69 82 L86 67 M69 91 L51 79 M69 99 L88 83" stroke="#557D43" strokeWidth="4" strokeLinecap="round" />
        <Path d="M52 61 q-7 -15 5 -14 q12 4 12 18 M85 67 q9 -15 17 -7 q2 10 -16 15 M51 79 q-9 -13 3 -15 q12 4 15 21 M86 83 q10 -14 18 -5 q0 11 -19 15" fill="#8CB55D" />
        <Path d="M114 113 q12 -9 25 0 t25 0 t25 0 t25 0" fill="none" stroke="#5B9EBD" strokeWidth="3" />
      </>
    );
  }

  if (kind === 'seeds') {
    return (
      <>
        <Path d="M0 111 Q83 101 165 110 T320 105 V150 H0Z" fill="#A87A4F" />
        <Path d="M160 108 C160 82 159 65 160 46 M160 72 L144 59 M160 66 L176 53" fill="none" stroke="#577D45" strokeWidth="5" strokeLinecap="round" />
        <Path d="M142 59 Q134 43 148 43 Q159 49 161 70 M173 54 Q180 39 190 47 Q189 60 172 65" fill="#86AE5C" />
        <Path d="M148 110 C134 120 150 122 139 133 M160 110 C174 120 157 127 171 138 M171 108 C184 116 177 123 188 129" fill="none" stroke="#E2C59C" strokeWidth="3" />
        <Ellipse cx="72" cy="106" rx="10" ry="5" fill="#D7B36C" transform="rotate(-25 72 106)" />
        <Ellipse cx="98" cy="116" rx="10" ry="5" fill="#B99455" transform="rotate(22 98 116)" />
        <Ellipse cx="222" cy="111" rx="10" ry="5" fill="#D7B36C" transform="rotate(-18 222 111)" />
        <Path d="M46 46 Q69 39 93 47 M46 53 Q69 46 93 54" fill="none" stroke="#8F6336" strokeWidth="4" strokeLinecap="round" />
        <Path d="M55 52 v21 M70 50 v21 M85 52 v21" stroke="#8F6336" strokeWidth="2" />
        <Path d="M50 76 q5 7 10 0 M65 75 q5 7 10 0 M80 77 q5 7 10 0" fill="none" stroke="#D7B36C" strokeWidth="4" />
      </>
    );
  }

  if (kind === 'technology') {
    return (
      <>
        <Path d="M0 115 Q80 104 160 114 T320 110 V150 H0Z" fill="#B4D18E" />
        <Path d="M209 99 V76 H257 L276 91 V105 H207Z" fill="#D65D43" stroke="#8D3E31" strokeWidth="3" />
        <Path d="M220 77 V59 H246 V77 M224 63 H242 V73 H224Z" fill="#C8E4E8" stroke="#8D3E31" strokeWidth="3" />
        <Circle cx="222" cy="105" r="15" fill="#334A4A" />
        <Circle cx="222" cy="105" r="6" fill="#CAD5CC" />
        <Circle cx="268" cy="104" r="10" fill="#334A4A" />
        <Circle cx="268" cy="104" r="4" fill="#CAD5CC" />
        <Path d="M34 114 V76 M34 84 L20 72 M34 92 L48 79 M34 101 L20 89" stroke="#597D45" strokeWidth="4" />
        <Path d="M19 72 Q12 58 25 58 Q34 64 35 83 M47 79 Q55 65 63 73 Q62 83 46 88 M19 89 Q11 77 23 76 Q32 82 35 101" fill="#8AAF5B" />
        <Path d="M87 113 V68 M87 79 L71 66 M87 88 L103 73 M87 99 L70 86" stroke="#597D45" strokeWidth="4" />
        <Path d="M70 66 Q65 52 77 52 Q87 58 88 79 M101 73 Q110 59 117 67 Q116 77 100 82 M70 86 Q62 74 74 73 Q84 79 88 99" fill="#8AAF5B" />
        <Path d="M181 115 H298" stroke="#96734F" strokeWidth="3" strokeDasharray="6 5" />
      </>
    );
  }

  if (kind === 'sustainable') {
    return (
      <>
        <Path d="M0 116 Q80 100 160 115 T320 108 V150 H0Z" fill="#9BC978" />
        <Path d="M28 116 Q63 88 95 116 M82 115 Q116 77 151 114 M142 115 Q175 84 210 113 M201 115 Q242 80 278 112" fill="#80B66E" stroke="#67995A" strokeWidth="2" />
        <Path d="M78 108 V65 M78 78 L60 63 M78 86 L97 68 M78 96 L58 83" stroke="#557D43" strokeWidth="4" />
        <Path d="M59 63 Q51 48 64 49 Q77 55 79 78 M94 68 Q103 54 111 62 Q109 73 93 77 M58 83 Q50 69 62 68 Q74 75 78 96" fill="#86B660" />
        <Circle cx="244" cy="51" r="9" fill="#F0C95D" />
        <Path d="M228 51 q-12 -13 -19 0 q7 12 19 0 M260 51 q12 -13 19 0 q-7 12 -19 0" fill="#F1E5C8" stroke="#D5AA46" strokeWidth="2" />
        <Path d="M239 51 h10 M240 47 l-5 -7 M249 47 l5 -7" stroke="#A47635" strokeWidth="2" />
        <Path d="M282 112 V78 M282 91 L269 81 M282 88 L294 77" stroke="#6A874C" strokeWidth="4" />
        <Circle cx="279" cy="72" r="12" fill="#78A75A" />
        <Circle cx="292" cy="71" r="11" fill="#8CB669" />
      </>
    );
  }

  return (
    <>
      <Path d="M0 116 Q80 102 160 115 T320 110 V150 H0Z" fill="#A6CA80" />
      <Path d="M25 115 V78 M25 91 L12 79 M25 99 L38 84" stroke="#597D45" strokeWidth="4" />
      <Path d="M12 79 Q6 65 18 65 Q25 71 26 91 M37 84 Q45 70 53 78 Q52 88 36 92" fill="#89B65F" />
      <Path d="M84 115 V66 M84 79 L68 66 M84 91 L100 76 M84 101 L66 88" stroke="#597D45" strokeWidth="4" />
      <Path d="M67 66 Q61 51 74 52 Q84 58 85 79 M98 76 Q107 62 115 70 Q113 80 97 84 M66 88 Q59 76 71 75 Q81 81 85 101" fill="#8BB45C" />
      <Path d="M135 115 V79 M135 89 L123 79 M135 97 L148 84" stroke="#597D45" strokeWidth="4" />
      <Path d="M122 79 Q116 67 128 66 Q135 71 136 89 M147 84 Q155 72 162 79 Q160 88 146 91" fill="#86AF59" />
      <Path d="M201 112 q4 -20 17 -20 q13 0 18 20z" fill="#E9E4CF" stroke="#927B56" strokeWidth="3" />
      <Circle cx="207" cy="110" r="3" fill="#594D3A" />
      <Circle cx="229" cy="110" r="3" fill="#594D3A" />
      <Path d="M201 98 l-7 -8 M237 98 l7 -8" stroke="#927B56" strokeWidth="3" strokeLinecap="round" />
      <Path d="M255 114 v-28 m0 10 l-10 -8 m10 4 l9 -9" stroke="#567B45" strokeWidth="3" />
      <Path d="M245 96 q-5 -11 4 -10 q6 5 6 15 M263 91 q6 -10 11 -4 q1 8 -11 11" fill="#95B85E" />
    </>
  );
}

export function FarmingIllustration({ question }: { question: string }) {
  const illustration = illustrationForQuestion(question);

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.title}>{illustration.title}</Text>
        <Text style={styles.badge}>FIELD SKETCH</Text>
      </View>
      <Svg viewBox="0 0 320 150" style={styles.image}>
        <Rect width="320" height="150" fill="#F1F8FA" />
        <Circle cx="293" cy="24" r="8" fill="#F2D278" opacity={0.8} />
        <Path d="M0 117 Q80 107 160 116 T320 112 V150 H0Z" fill="#DCEBCF" />
        <Scene kind={illustration.kind} />
      </Svg>
      <Text style={styles.note}>Original learning illustration, not copied from the chapter.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 18, overflow: 'hidden', borderRadius: 14, backgroundColor: '#F5FAFC', borderWidth: 1, borderColor: '#E3ECEB' },
  heading: { minHeight: 36, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingHorizontal: 12, paddingTop: 5 },
  title: { color: '#172B4D', fontSize: 12, fontWeight: '700', flexShrink: 1 },
  badge: { color: '#167C80', fontSize: 8, fontWeight: '800', letterSpacing: 0.7 },
  image: { width: '100%', height: 150 },
  note: { paddingHorizontal: 8, paddingBottom: 8, color: '#6B7890', fontSize: 9, lineHeight: 13, textAlign: 'center' },
});
