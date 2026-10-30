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
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';
import { FarmingIllustration } from './FarmingIllustration';
import { farmingQuizSets } from './farmingQuizSets';

type Question = { prompt: string; choices: string[]; answer: string; hint: string; mapMarker?: number };
type Chapter = { title: string; subtitle: string; questions: Question[]; additionalSets: Question[][]; mapChallenge?: boolean; setTitles?: string[] };

const chapters: Chapter[] = [
  {
    title: 'The Story of Indian Farming',
    subtitle: 'Indian farming history, crops, soils, water, and sustainability',
    questions: farmingQuizSets[0],
    additionalSets: farmingQuizSets.slice(1),
    setTitles: [
      'Farming Through Time',
      'Seasons and Monsoons',
      'Soils of India',
      'Caring for the Soil',
      'Rain and Irrigation',
      'Seeds and Sowing',
      'The Green Revolution',
      'Sustainable Farming',
      'Tradition and Innovation',
      'Apply Your Farming Knowledge',
    ],
  },
  {
    title: 'India and Her Neighbours',
    subtitle: 'India’s location, surrounding countries, and seas',
    questions: [
      { prompt: 'Which two neighbouring countries lie to the north of India in the Himalaya region?', choices: ['Nepal and Bhutan', 'Sri Lanka and Maldives', 'Bangladesh and Myanmar', 'Oman and Yemen'], answer: 'Nepal and Bhutan', hint: 'Both countries share Himalayan landscapes with India.' },
      { prompt: 'Which country lies to the east of India and shares a long land border with it?', choices: ['Bangladesh', 'Sri Lanka', 'Maldives', 'Mauritius'], answer: 'Bangladesh', hint: 'It is surrounded by Indian states on much of its western, northern, and eastern sides.' },
      { prompt: 'Which neighbouring country is located to the east of India, beyond the northeast region?', choices: ['Myanmar', 'Afghanistan', 'Maldives', 'Sri Lanka'], answer: 'Myanmar', hint: 'This country connects South Asia with Southeast Asia.' },
      { prompt: 'Which island country lies south of India across the Palk Strait?', choices: ['Sri Lanka', 'Bhutan', 'Nepal', 'Bangladesh'], answer: 'Sri Lanka', hint: 'It is the island close to India’s southeastern coast.' },
      { prompt: 'Which island nation lies to the southwest of India in the Indian Ocean?', choices: ['Maldives', 'Myanmar', 'Nepal', 'Bhutan'], answer: 'Maldives', hint: 'This low-lying island country is made up of many coral islands.' },
      { prompt: 'Which sea lies to the west of India?', choices: ['Arabian Sea', 'Bay of Bengal', 'South China Sea', 'Red Sea'], answer: 'Arabian Sea', hint: 'It is part of the Indian Ocean on India’s western side.' },
      { prompt: 'Which large bay lies to the east of India?', choices: ['Bay of Bengal', 'Arabian Sea', 'Persian Gulf', 'Gulf of Aden'], answer: 'Bay of Bengal', hint: 'Bangladesh and Myanmar also lie along its northern and eastern sides.' },
      { prompt: 'Which mountain range forms a major natural region along India’s northern edge?', choices: ['The Himalayas', 'The Alps', 'The Andes', 'The Rockies'], answer: 'The Himalayas', hint: 'This high mountain system includes Mount Everest and stretches across several countries.' },
      { prompt: 'Which statement about Nepal and Bhutan is correct?', choices: ['Both are landlocked countries', 'Both are island countries', 'Both lie west of India', 'Both are surrounded by the Arabian Sea'], answer: 'Both are landlocked countries', hint: 'Landlocked countries have no coastline on an ocean or sea.' },
      { prompt: 'Why have neighbouring regions often exchanged goods and ideas?', choices: ['Nearby routes make travel, trade, and cultural contact possible', 'Neighbours cannot share borders', 'Mountains prevent every kind of contact', 'Trade happens only between island countries'], answer: 'Nearby routes make travel, trade, and cultural contact possible', hint: 'People have used land and sea routes to connect communities for a long time.' },
    ],
    additionalSets: [
      [
        { prompt: 'Which country shares India’s western land border?', choices: ['Pakistan', 'Thailand', 'Indonesia', 'Japan'], answer: 'Pakistan', hint: 'It lies directly west of India.' },
        { prompt: 'Which country lies north of India and shares a border across the Himalayas?', choices: ['China', 'Sri Lanka', 'Maldives', 'Malaysia'], answer: 'China', hint: 'This large country lies beyond the Himalayan mountain system.' },
        { prompt: 'Which Indian state shares a border with Bangladesh?', choices: ['West Bengal', 'Goa', 'Kerala', 'Punjab'], answer: 'West Bengal', hint: 'It is in eastern India.' },
        { prompt: 'Which water body separates much of India’s western coast from the Arabian Peninsula?', choices: ['Arabian Sea', 'Bay of Bengal', 'Andaman Sea', 'South China Sea'], answer: 'Arabian Sea', hint: 'It lies between India and countries such as Oman.' },
        { prompt: 'Which neighbouring country is an island nation in the Indian Ocean, southwest of India?', choices: ['Maldives', 'Nepal', 'Bhutan', 'Afghanistan'], answer: 'Maldives', hint: 'It is an island chain located southwest of India.' },
        { prompt: 'Which country shares India’s eastern border and is part of Southeast Asia?', choices: ['Myanmar', 'Iran', 'Tajikistan', 'Maldives'], answer: 'Myanmar', hint: 'It is India’s eastern neighbour beyond the northeastern states.' },
        { prompt: 'Which mountain range includes high passes and forms a natural boundary in the north of India?', choices: ['The Himalayas', 'The Western Ghats', 'The Aravallis', 'The Eastern Ghats'], answer: 'The Himalayas', hint: 'This mountain range stretches along India’s northern region.' },
        { prompt: 'Which statement best describes India’s location in relation to the Indian Ocean?', choices: ['India projects southward into the Indian Ocean', 'India lies entirely north of the Arctic Ocean', 'India has no coastline', 'India is an island in the Pacific Ocean'], answer: 'India projects southward into the Indian Ocean', hint: 'India’s peninsula extends between the Arabian Sea and Bay of Bengal.' },
        { prompt: 'Which neighbouring country lies between India and China in parts of the Himalayas?', choices: ['Nepal', 'Sri Lanka', 'Maldives', 'Bangladesh'], answer: 'Nepal', hint: 'This landlocked Himalayan country is north of India.' },
        { prompt: 'Why are India’s sea routes important for contact with other countries?', choices: ['They connect Indian ports with coastal regions around the Indian Ocean', 'They make land borders disappear', 'They prevent ships from carrying goods', 'They connect only mountain villages'], answer: 'They connect Indian ports with coastal regions around the Indian Ocean', hint: 'Ships use sea routes to carry people and goods between ports.' },
      ],
      [
        { prompt: 'Which neighbouring country lies to the southeast of India and shares a land border with it?', choices: ['Bangladesh', 'Afghanistan', 'Iran', 'Maldives'], answer: 'Bangladesh', hint: 'It lies east of India and is bordered by several Indian states.' },
        { prompt: 'Which country is separated from India by the Palk Strait and Gulf of Mannar?', choices: ['Sri Lanka', 'Bhutan', 'Myanmar', 'China'], answer: 'Sri Lanka', hint: 'This island country lies just south of India.' },
        { prompt: 'Which ocean is named along India’s southern coast?', choices: ['Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean', 'Southern Ocean'], answer: 'Indian Ocean', hint: 'India’s peninsula extends into the ocean named after the country.' },
        { prompt: 'Which pair consists of India’s landlocked Himalayan neighbours?', choices: ['Nepal and Bhutan', 'Sri Lanka and Maldives', 'Bangladesh and Sri Lanka', 'Myanmar and Maldives'], answer: 'Nepal and Bhutan', hint: 'Neither country has a coastline.' },
        { prompt: 'Which sea is found east of India, along the eastern coastline?', choices: ['Bay of Bengal', 'Arabian Sea', 'Mediterranean Sea', 'Black Sea'], answer: 'Bay of Bengal', hint: 'It borders India’s eastern coast.' },
        { prompt: 'Which Indian island group lies in the Bay of Bengal?', choices: ['Andaman and Nicobar Islands', 'Lakshadweep Islands', 'Maldives', 'Socotra'], answer: 'Andaman and Nicobar Islands', hint: 'This Indian island group is located far to the southeast in the Bay of Bengal.' },
        { prompt: 'Which Indian island group lies in the Arabian Sea?', choices: ['Lakshadweep Islands', 'Andaman and Nicobar Islands', 'Sri Lanka', 'Sundarbans'], answer: 'Lakshadweep Islands', hint: 'These islands are off India’s southwestern coast.' },
        { prompt: 'Why have mountain passes mattered for people living in neighbouring regions?', choices: ['They can provide routes for travel and exchange across mountains', 'They are oceans between countries', 'They stop all movement permanently', 'They are used only to measure rainfall'], answer: 'They can provide routes for travel and exchange across mountains', hint: 'A pass is a route through mountainous terrain.' },
        { prompt: 'Which statement about India and its neighbours is correct?', choices: ['India has both land and maritime neighbours', 'All of India’s neighbours are islands', 'India has no shared land borders', 'Every neighbour lies to the south'], answer: 'India has both land and maritime neighbours', hint: 'Some neighbours share land borders; others are across nearby seas.' },
        { prompt: 'What is one reason the location of India has supported historical cultural exchange?', choices: ['Land and sea routes connected India with nearby regions', 'India is separated from all regions by an unbroken ocean', 'Travel was impossible in every direction', 'Only one village existed in the region'], answer: 'Land and sea routes connected India with nearby regions', hint: 'Routes across mountains and seas linked people and communities.' },
      ],
    ],
  },
  {
    title: 'India Map Challenge',
    subtitle: 'Use the map to explore India’s regions and surrounding waters',
    mapChallenge: true,
    setTitles: ['Physical Features', 'Countries Around India', 'Map Directions', 'Physical Features Review'],
    questions: [
      { prompt: 'Marker 1 points to the high mountain region along India’s northern edge. What is it called?', choices: ['The Himalayas', 'The Western Ghats', 'The Aravallis', 'The Vindhyas'], answer: 'The Himalayas', hint: 'This great mountain system runs along the north of India.', mapMarker: 1 },
      { prompt: 'Marker 2 is in the dry northwestern part of India. Which desert is found there?', choices: ['Thar Desert', 'Sahara Desert', 'Gobi Desert', 'Kalahari Desert'], answer: 'Thar Desert', hint: 'The Thar lies mainly in Rajasthan in northwestern India.', mapMarker: 2 },
      { prompt: 'Marker 3 is on the broad northern plain. Which major river system flows across much of this plain?', choices: ['Ganga river system', 'Narmada river system', 'Godavari river system', 'Kaveri river system'], answer: 'Ganga river system', hint: 'The Ganga and its tributaries flow across the northern plains.', mapMarker: 3 },
      { prompt: 'Marker 4 points to the raised plateau covering much of southern India. What is it called?', choices: ['Deccan Plateau', 'Tibetan Plateau', 'Chota Nagpur Plateau', 'Malwa Plateau'], answer: 'Deccan Plateau', hint: 'This large plateau occupies much of peninsular India.', mapMarker: 4 },
      { prompt: 'Marker 5 is on the mountain range running parallel to India’s western coast. Which range is it?', choices: ['Western Ghats', 'Eastern Ghats', 'Himalayas', 'Aravalli Range'], answer: 'Western Ghats', hint: 'This range borders the western edge of the Deccan Plateau.', mapMarker: 5 },
      { prompt: 'Marker 6 is on India’s eastern coastline. Which water body lies along much of this coast?', choices: ['Bay of Bengal', 'Arabian Sea', 'Red Sea', 'Mediterranean Sea'], answer: 'Bay of Bengal', hint: 'It lies east of the Indian peninsula.', mapMarker: 6 },
      { prompt: 'Marker 7 is west of mainland India. Which water body is shown there?', choices: ['Arabian Sea', 'Bay of Bengal', 'South China Sea', 'Black Sea'], answer: 'Arabian Sea', hint: 'It lies between India and the Arabian Peninsula.', mapMarker: 7 },
      { prompt: 'Marker 8 is in the sea east of India. Which Indian island group lies in this area?', choices: ['Andaman and Nicobar Islands', 'Lakshadweep Islands', 'Maldives', 'Minicoy only'], answer: 'Andaman and Nicobar Islands', hint: 'This Indian island group lies in the Bay of Bengal.', mapMarker: 8 },
      { prompt: 'Marker 9 is south of the Indian peninsula. Which ocean surrounds this region?', choices: ['Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean', 'Pacific Ocean'], answer: 'Indian Ocean', hint: 'The ocean shares its name with the country to its north.', mapMarker: 9 },
      { prompt: 'Marker 10 points to India’s northeastern region. Which neighbouring country borders this region to the east?', choices: ['Myanmar', 'Pakistan', 'Sri Lanka', 'Maldives'], answer: 'Myanmar', hint: 'Myanmar is India’s neighbour on the eastern side of the Northeast.', mapMarker: 10 },
    ],
    additionalSets: [
      [
        { prompt: 'Marker 11 is just west of India. Which neighbouring country is located there?', choices: ['Pakistan', 'Nepal', 'Bangladesh', 'Myanmar'], answer: 'Pakistan', hint: 'Pakistan shares a land border with India on the west.', mapMarker: 11 },
        { prompt: 'Marker 12 is north of the Himalayas. Which country lies there?', choices: ['China', 'Sri Lanka', 'Maldives', 'Bangladesh'], answer: 'China', hint: 'China lies north of India beyond the Himalayan region.', mapMarker: 12 },
        { prompt: 'Marker 13 is north of India along the Himalayas. Which country is shown?', choices: ['Nepal', 'Pakistan', 'Myanmar', 'Sri Lanka'], answer: 'Nepal', hint: 'Nepal is a landlocked Himalayan neighbour north of India.', mapMarker: 13 },
        { prompt: 'Marker 14 lies to the northeast of India near the Himalayas. Which small neighbouring country is here?', choices: ['Bhutan', 'Maldives', 'Sri Lanka', 'Pakistan'], answer: 'Bhutan', hint: 'Bhutan is a landlocked country on India’s northeastern side.', mapMarker: 14 },
        { prompt: 'Marker 15 is east of India near the Bay of Bengal. Which country is located there?', choices: ['Bangladesh', 'Afghanistan', 'Nepal', 'Maldives'], answer: 'Bangladesh', hint: 'Bangladesh borders eastern India and lies at the head of the Bay of Bengal.', mapMarker: 15 },
        { prompt: 'Marker 16 is east of India and connects South Asia with Southeast Asia. Which country is this?', choices: ['Myanmar', 'Bhutan', 'Pakistan', 'Sri Lanka'], answer: 'Myanmar', hint: 'Myanmar shares a land border with India’s Northeast.', mapMarker: 16 },
        { prompt: 'Marker 17 is the island just south of India. Name the country.', choices: ['Sri Lanka', 'Maldives', 'Bhutan', 'Bangladesh'], answer: 'Sri Lanka', hint: 'Sri Lanka lies across the Palk Strait from southeastern India.', mapMarker: 17 },
        { prompt: 'Marker 18 shows an island country southwest of India. Which one?', choices: ['Maldives', 'Sri Lanka', 'Myanmar', 'Nepal'], answer: 'Maldives', hint: 'The Maldives is an island nation in the Arabian Sea, southwest of India.', mapMarker: 18 },
        { prompt: 'Marker 19 points to the water body west of India. What is it?', choices: ['Arabian Sea', 'Bay of Bengal', 'Indian Ocean', 'Red Sea'], answer: 'Arabian Sea', hint: 'The Arabian Sea borders India’s western coast.', mapMarker: 19 },
        { prompt: 'Marker 20 points to the large bay east of India. What is its name?', choices: ['Bay of Bengal', 'Arabian Sea', 'Persian Gulf', 'Gulf of Aden'], answer: 'Bay of Bengal', hint: 'The Bay of Bengal lies east of India and west of Myanmar.', mapMarker: 20 },
      ],
      [
        { prompt: 'From marker 11, move east across India’s northwest border. Which country do you enter?', choices: ['India', 'Nepal', 'Bangladesh', 'Bhutan'], answer: 'India', hint: 'Marker 11 is in Pakistan, immediately west of India.', mapMarker: 11 },
        { prompt: 'Which marked neighbour lies farthest east of mainland India: marker 13, 15, or 16?', choices: ['Marker 13: Nepal', 'Marker 15: Bangladesh', 'Marker 16: Myanmar', 'They are all equally far east'], answer: 'Marker 16: Myanmar', hint: 'Myanmar lies along the eastern side of India’s Northeast.', mapMarker: 16 },
        { prompt: 'Which marked country is directly north of India in the Himalayan region at marker 13?', choices: ['Nepal', 'Sri Lanka', 'Maldives', 'Bangladesh'], answer: 'Nepal', hint: 'Marker 13 is placed on India’s northern Himalayan side.', mapMarker: 13 },
        { prompt: 'Which island at marker 17 lies southeast of the southern tip of mainland India?', choices: ['Sri Lanka', 'Maldives', 'Andaman Islands', 'Lakshadweep'], answer: 'Sri Lanka', hint: 'Sri Lanka is the large island just southeast of India’s tip.', mapMarker: 17 },
        { prompt: 'Which sea is closer to marker 19 than marker 20?', choices: ['Arabian Sea', 'Bay of Bengal', 'Both are west of India', 'Neither is a sea'], answer: 'Arabian Sea', hint: 'Marker 19 is west of India; marker 20 is east.', mapMarker: 19 },
        { prompt: 'A ship leaves India’s eastern coast near marker 20. Into which water body does it sail?', choices: ['Bay of Bengal', 'Arabian Sea', 'Caspian Sea', 'Mediterranean Sea'], answer: 'Bay of Bengal', hint: 'The Bay of Bengal is on the east side of the peninsula.', mapMarker: 20 },
        { prompt: 'Which two markers identify landlocked Himalayan neighbours?', choices: ['Markers 13 and 14', 'Markers 17 and 18', 'Markers 19 and 20', 'Markers 11 and 19'], answer: 'Markers 13 and 14', hint: 'Markers 13 and 14 show Nepal and Bhutan; neither has a coastline.', mapMarker: 14 },
        { prompt: 'Which marked country is an island nation southwest of India?', choices: ['Maldives at marker 18', 'Nepal at marker 13', 'Bangladesh at marker 15', 'Pakistan at marker 11'], answer: 'Maldives at marker 18', hint: 'The Maldives lies southwest of India in the Arabian Sea.', mapMarker: 18 },
        { prompt: 'Which pair of markers shows the neighbouring countries east of India?', choices: ['Markers 15 and 16', 'Markers 11 and 12', 'Markers 17 and 18', 'Markers 19 and 20'], answer: 'Markers 15 and 16', hint: 'Marker 15 is Bangladesh and marker 16 is Myanmar.', mapMarker: 15 },
        { prompt: 'Which direction is marker 12 (China) from marker 17 (Sri Lanka)?', choices: ['North', 'South', 'East', 'West'], answer: 'North', hint: 'China is above India on the map; Sri Lanka is below it.', mapMarker: 12 },
      ],
      [
        { prompt: 'Marker 1 follows the northern edge of India. Which physical feature is it?', choices: ['The Himalayas', 'The Thar Desert', 'The Deccan Plateau', 'The Western Ghats'], answer: 'The Himalayas', hint: 'The Himalayas form the high mountain region along India’s north.', mapMarker: 1 },
        { prompt: 'Marker 2 is in northwestern India. Which dry region is shown?', choices: ['Thar Desert', 'Ganga Delta', 'Deccan Plateau', 'Brahmaputra Valley'], answer: 'Thar Desert', hint: 'The Thar Desert lies mainly in Rajasthan.', mapMarker: 2 },
        { prompt: 'Marker 3 is on the broad plain of northern India. Which river is strongly associated with this region?', choices: ['Ganga', 'Kaveri', 'Narmada', 'Periyar'], answer: 'Ganga', hint: 'The Ganga flows across the northern plains.', mapMarker: 3 },
        { prompt: 'Marker 4 lies across much of peninsular India. What landform is this?', choices: ['Deccan Plateau', 'Himalayas', 'Thar Desert', 'Northern Plains'], answer: 'Deccan Plateau', hint: 'The Deccan is the large plateau covering much of southern India.', mapMarker: 4 },
        { prompt: 'Which mountain range is near marker 5 along the western edge of the peninsula?', choices: ['Western Ghats', 'Eastern Ghats', 'Himalayas', 'Aravallis'], answer: 'Western Ghats', hint: 'The Western Ghats run roughly parallel to the west coast.', mapMarker: 5 },
        { prompt: 'Marker 6 lies along India’s eastern coastline. Which bay is here?', choices: ['Bay of Bengal', 'Arabian Sea', 'Gulf of Kutch', 'Persian Gulf'], answer: 'Bay of Bengal', hint: 'The Bay of Bengal borders the east coast.', mapMarker: 6 },
        { prompt: 'Marker 7 is in the sea to India’s west. Which sea is it?', choices: ['Arabian Sea', 'Bay of Bengal', 'Andaman Sea', 'Red Sea'], answer: 'Arabian Sea', hint: 'The Arabian Sea is west of mainland India.', mapMarker: 7 },
        { prompt: 'Marker 8 is east of the Indian mainland. Which Indian island group is nearby?', choices: ['Andaman and Nicobar Islands', 'Lakshadweep Islands', 'Maldives', 'Sri Lanka'], answer: 'Andaman and Nicobar Islands', hint: 'These islands are in the Bay of Bengal.', mapMarker: 8 },
        { prompt: 'Marker 9 lies south of India. Which ocean is shown?', choices: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Arctic Ocean'], answer: 'Indian Ocean', hint: 'India’s southern peninsula extends into this ocean.', mapMarker: 9 },
        { prompt: 'Marker 10 lies east of India’s Northeast. Which country is located there?', choices: ['Myanmar', 'Pakistan', 'Maldives', 'Sri Lanka'], answer: 'Myanmar', hint: 'Myanmar shares a border with India to the east.', mapMarker: 10 },
      ],
    ],
  },
];

const colors = { ink: '#172B4D', muted: '#6B7890', teal: '#167C80', pale: '#EAF7F6', line: '#E3ECEB', green: '#16845B', red: '#C74747' };

const answerPositions = [2, 0, 3, 1, 1, 3, 0, 2, 3, 1];

function shuffleAnswerPositions(questions: Question[]): Question[] {
  return questions.map((question, index) => {
    const choices = question.choices.filter((choice) => choice !== question.answer);
    choices.splice(answerPositions[index % answerPositions.length], 0, question.answer);
    return { ...question, choices };
  });
}

const mapMarkers = [
  { id: 1, x: 153, y: 54 },
  { id: 2, x: 83, y: 139 },
  { id: 3, x: 161, y: 112 },
  { id: 4, x: 145, y: 232 },
  { id: 5, x: 93, y: 246 },
  { id: 6, x: 210, y: 233 },
  { id: 7, x: 39, y: 216 },
  { id: 8, x: 270, y: 246 },
  { id: 9, x: 156, y: 361 },
  { id: 10, x: 256, y: 122 },
  { id: 11, x: 107, y: 91 },
  { id: 12, x: 181, y: 25 },
  { id: 13, x: 190, y: 58 },
  { id: 14, x: 230, y: 72 },
  { id: 15, x: 250, y: 102 },
  { id: 16, x: 274, y: 145 },
  { id: 17, x: 173, y: 346 },
  { id: 18, x: 73, y: 301 },
  { id: 19, x: 39, y: 171 },
  { id: 20, x: 273, y: 198 },
];

function IndiaMap({ activeMarker }: { activeMarker?: number }) {
  return (
    <View style={styles.mapCard}>
      <View style={styles.mapHeading}>
        <Text style={styles.mapTitle}>India & neighbouring regions</Text>
        <Text style={styles.mapLegend}>{activeMarker ? `Find marker ${activeMarker}` : 'North · West · East · South'}</Text>
      </View>
      <Svg viewBox="0 0 320 390" style={styles.mapImage}>
        <Path d="M0 0H320V390H0Z" fill="#EFF8FC" />
        <SvgText x="30" y="193" fill="#5D8EA5" fontSize="9" fontWeight="600" transform="rotate(-75 30 193)">ARABIAN SEA</SvgText>
        <SvgText x="246" y="193" fill="#5D8EA5" fontSize="9" fontWeight="600" transform="rotate(70 246 193)">BAY OF BENGAL</SvgText>
        <SvgText x="126" y="382" fill="#5D8EA5" fontSize="9" fontWeight="600">INDIAN OCEAN</SvgText>
        <Path d="M0 42 L43 34 L77 43 L91 63 L77 83 L62 102 L51 126 L36 151 L0 158 Z" fill="#DDE9D2" stroke="#9CB38D" strokeWidth="1" />
        <Path d="M82 0 L171 0 L184 19 L174 31 L139 34 L128 47 L107 58 L88 53 L76 35 Z" fill="#E4EDD7" stroke="#A7BA97" strokeWidth="1" />
        <Path d="M184 0 L320 0 L320 73 L286 78 L269 66 L245 71 L226 58 L202 50 L183 31 Z" fill="#E4EDD7" stroke="#A7BA97" strokeWidth="1" />
        <Path d="M266 118 L320 106 L320 228 L295 213 L284 189 L270 169 Z" fill="#E4EDD7" stroke="#A7BA97" strokeWidth="1" />
        <SvgText x="8" y="91" fill="#60755B" fontSize="7" fontWeight="600">AFGHANISTAN</SvgText>
        <SvgText x="12" y="139" fill="#60755B" fontSize="8" fontWeight="600">PAKISTAN</SvgText>
        <SvgText x="109" y="16" fill="#60755B" fontSize="7" fontWeight="600">TAJIKISTAN</SvgText>
        <SvgText x="219" y="17" fill="#60755B" fontSize="8" fontWeight="600">CHINA / TIBET</SvgText>
        <SvgText x="286" y="134" fill="#60755B" fontSize="7" fontWeight="600" transform="rotate(72 286 134)">MYANMAR</SvgText>
        <SvgText x="177" y="47" fill="#728497" fontSize="7">NEPAL</SvgText>
        <SvgText x="225" y="58" fill="#728497" fontSize="7">BHUTAN</SvgText>
        <SvgText x="253" y="89" fill="#728497" fontSize="7">BANGLADESH</SvgText>
        <SvgText x="178" y="361" fill="#728497" fontSize="7">SRI LANKA</SvgText>
        <SvgText x="39" y="316" fill="#728497" fontSize="7">MALDIVES</SvgText>
        <Path
          d="M139 33 L151 27 L165 32 L176 38 L190 39 L201 47 L218 48 L226 58 L242 62 L235 72 L249 78 L261 84 L279 89 L272 99 L257 103 L269 110 L258 116 L247 112 L240 123 L229 127 L222 138 L226 151 L219 164 L224 178 L216 192 L211 210 L201 226 L198 244 L186 259 L178 278 L168 298 L159 316 L151 337 L141 355 L134 340 L128 321 L116 304 L108 285 L96 270 L88 249 L76 231 L68 211 L59 192 L57 173 L62 158 L58 145 L69 132 L72 116 L83 103 L89 88 L101 76 L110 63 L122 53 L129 42 Z"
          fill="#B8D8A8"
          stroke="#4A7761"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <Path d="M98 119 Q132 124 164 112 T226 123" fill="none" stroke="#6AA9C3" strokeWidth="2" strokeDasharray="4 3" />
        <Path d="M126 183 Q146 204 145 233" fill="none" stroke="#8BAF79" strokeWidth="1.5" />
        <Path d="M102 178 Q90 208 94 245" fill="none" stroke="#8BAF79" strokeWidth="1.5" />
        <Path d="M189 183 Q207 207 209 232" fill="none" stroke="#8BAF79" strokeWidth="1.5" />
        <Path d="M274 260 l5 7 m4 8 l4 8 m2 9 l5 5" stroke="#4A7761" strokeWidth="2" strokeLinecap="round" />
        <Path d="M53 250 l3 3 m-4 7 l3 3" stroke="#4A7761" strokeWidth="2" strokeLinecap="round" />
        {mapMarkers.map((marker) => {
          const isActive = marker.id === activeMarker;
          return (
            <G key={marker.id}>
              {isActive && <Circle cx={marker.x} cy={marker.y} r={13} fill="#F5A623" opacity={0.28} />}
              <Circle cx={marker.x} cy={marker.y} r={isActive ? 8 : 6} fill={isActive ? '#D95D39' : '#246E78'} stroke="#FFF" strokeWidth="2" />
              <SvgText x={marker.x} y={marker.y + 3} fill="#FFF" fontSize="8" fontWeight="700" textAnchor="middle">{String(marker.id)}</SvgText>
            </G>
          );
        })}
        <SvgText x="116" y="170" fill="#3D674D" fontSize="11" fontWeight="700">INDIA</SvgText>
      </Svg>
      <Text style={styles.mapNote}>North and western regions are shown. Schematic map for learning; borders and marker positions are approximate.</Text>
    </View>
  );
}

export default function App({ onExit }: { onExit?: () => void } = {}) {
  const [chapterIndex, setChapterIndex] = useState<number | null>(null);
  const [setIndex, setSetIndex] = useState(0);
  const [selectingSet, setSelectingSet] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const chapter = chapterIndex === null ? null : chapters[chapterIndex];
  const chapterSets = chapter ? [chapter.questions, ...chapter.additionalSets].map(shuffleAnswerPositions) : [];
  const currentSet = chapterSets[setIndex];
  const question = currentSet?.[questionIndex];

  function startChapter(index: number) {
    setChapterIndex(index);
    setSelectingSet(true);
    setSetIndex(0);
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  function startSet(index: number) {
    setSetIndex(index);
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setSelectingSet(false);
  }

  function chooseAnswer(answer: string) {
    if (!question || selected !== null) return;
    setSelected(answer);
    if (answer === question.answer) setScore((current) => current + 1);
  }

  function nextQuestion() {
    if (!currentSet) return;
    if (questionIndex === currentSet.length - 1) setFinished(true);
    else {
      setQuestionIndex((current) => current + 1);
      setSelected(null);
    }
  }

  function returnToChapters() {
    setChapterIndex(null);
    setSelectingSet(false);
    setFinished(false);
    setSelected(null);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topline}>
          <Text style={styles.brandMark}>◈</Text>
          <Text style={styles.brand}>GEO QUEST</Text>
          {onExit && <TouchableOpacity onPress={onExit} style={styles.exitButton}><Text style={styles.exitText}>← All apps</Text></TouchableOpacity>}
          <Text style={styles.gradeTag}>GRADE 7</Text>
        </View>

        {chapter === null ? (
          <>
            <Text style={styles.eyebrow}>NCERT GEOGRAPHY PRACTICE</Text>
            <Text style={styles.title}>Explore the world.{'\n'}Understand India.</Text>
            <Text style={styles.subtitle}>Choose a chapter to explore its practice sets.</Text>
            <View style={styles.chapterList}>
              {chapters.map((item, index) => (
                <TouchableOpacity key={item.title} onPress={() => startChapter(index)} style={styles.chapterCard}>
                  <Text style={styles.chapterNumber}>CHAPTER {index + 1}</Text>
                  <Text style={styles.chapterTitle}>{item.title}</Text>
                  <Text style={styles.chapterSubtitle}>{item.subtitle}</Text>
                  <Text style={styles.startText}>{item.additionalSets.length + 1} quiz sets  →</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.disclaimer}>Original practice questions based on the chapter topics you selected.</Text>
          </>
        ) : selectingSet ? (
          <>
            <TouchableOpacity onPress={returnToChapters} style={styles.backButton}>
              <Text style={styles.startText}>← All chapters</Text>
            </TouchableOpacity>
            <Text style={styles.eyebrow}>CHAPTER {chapterIndex === null ? '' : chapterIndex + 1}</Text>
            <Text style={styles.title}>{chapter.title}</Text>
            <Text style={styles.subtitle}>Choose a quiz set.</Text>
            <View style={styles.setList}>
              {chapterSets.map((set, index) => (
                <TouchableOpacity key={index} onPress={() => startSet(index)} style={styles.chapterCard}>
                  <Text style={styles.chapterNumber}>SET {index + 1}</Text>
                  <Text style={styles.chapterTitle}>{chapter.setTitles?.[index] ?? chapter.title}</Text>
                  <Text style={styles.chapterSubtitle}>{set.length} questions · correct options vary</Text>
                  <Text style={styles.startText}>Start set  →</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : finished ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultIcon}>{score === currentSet?.length ? '🏆' : '🌍'}</Text>
            <Text style={styles.eyebrow}>SET {setIndex + 1} COMPLETE</Text>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
            <Text style={styles.resultTitle}>{score} out of {currentSet?.length}</Text>
            <Text style={styles.subtitle}>{score === currentSet?.length ? 'Excellent work!' : 'Good effort. Try again to improve your score.'}</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={() => startSet(setIndex)}>
              <Text style={styles.primaryText}>Try again  →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFinished(false); setSelectingSet(true); }} style={styles.backButton}>
              <Text style={styles.startText}>Choose another set</Text>
            </TouchableOpacity>
          </View>
        ) : question ? (
          <>
            <TouchableOpacity onPress={() => { setSelectingSet(true); setSelected(null); }} style={styles.backButton}>
              <Text style={styles.startText}>← All sets</Text>
            </TouchableOpacity>
            <View style={styles.quizCard}>
              <View style={styles.quizMeta}>
                <Text style={styles.pill}>{(chapter.setTitles?.[setIndex] ?? `${chapter.title} · SET ${setIndex + 1}`).toUpperCase()}</Text>
                <Text style={styles.progress}>{questionIndex + 1} / {currentSet.length}</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${((questionIndex + 1) / currentSet.length) * 100}%` }]} />
              </View>
              {chapterIndex === 0
                ? <FarmingIllustration question={question.prompt} />
                : <IndiaMap activeMarker={question.mapMarker} />}
              <Text style={styles.question}>{question.prompt}</Text>
              <View style={styles.choices}>
                {question.choices.map((choice, index) => {
                  const correct = selected !== null && choice === question.answer;
                  const wrong = selected === choice && choice !== question.answer;
                  return (
                    <TouchableOpacity key={choice} onPress={() => chooseAnswer(choice)} style={[styles.choice, correct && styles.choiceCorrect, wrong && styles.choiceWrong]}>
                      <Text style={[styles.choiceLetter, correct && styles.choiceLetterCorrect, wrong && styles.choiceLetterWrong]}>{String.fromCharCode(65 + index)}</Text>
                      <Text style={styles.choiceText}>{choice}</Text>
                      {correct && <Text style={styles.check}>✓</Text>}
                      {wrong && <Text style={styles.checkWrong}>×</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
              {selected !== null && (
                <View style={styles.feedbackBox}>
                  <Text style={[styles.feedback, selected === question.answer ? styles.correctText : styles.wrongText]}>
                    {selected === question.answer ? 'Nice work! You got it.' : `Not quite. The correct answer is ${question.answer}.`}
                  </Text>
                  {selected !== question.answer && <Text style={styles.explanation}>How to work it out: {question.hint}</Text>}
                </View>
              )}
              <View style={styles.actions}>
                <Text style={styles.scoreLabel}>Score: {score}</Text>
                {selected !== null && (
                  <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                    <Text style={styles.nextText}>{questionIndex === currentSet.length - 1 ? 'See score  →' : 'Next  →'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5FAFA' },
  page: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 36, maxWidth: 560, width: '100%', alignSelf: 'center' },
  topline: { flexDirection: 'row', alignItems: 'center', marginBottom: 36 },
  brandMark: { color: colors.teal, fontSize: 25, marginRight: 8 },
  brand: { color: colors.ink, letterSpacing: 2.4, fontWeight: '800', fontSize: 12 },
  exitButton: { marginLeft: 'auto', padding: 8 },
  exitText: { color: colors.teal, fontWeight: '700', fontSize: 12 },
  gradeTag: { marginLeft: 'auto', color: colors.teal, backgroundColor: colors.pale, paddingHorizontal: 11, paddingVertical: 7, overflow: 'hidden', borderRadius: 12, fontWeight: '700', fontSize: 10 },
  eyebrow: { color: colors.teal, fontWeight: '800', letterSpacing: 1.5, fontSize: 10, marginBottom: 10 },
  title: { color: colors.ink, fontSize: 34, fontWeight: '800', lineHeight: 41, letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 9 },
  chapterList: { gap: 14, marginTop: 24 },
  setList: { gap: 12, marginTop: 20 },
  chapterCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 19 },
  chapterNumber: { color: colors.teal, fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  chapterTitle: { color: colors.ink, fontSize: 19, lineHeight: 25, fontWeight: '800', marginTop: 8 },
  chapterSubtitle: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  startText: { color: colors.teal, fontWeight: '700', fontSize: 12, marginTop: 14 },
  disclaimer: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 22 },
  quizCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 18, marginTop: 12 },
  quizMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  pill: { color: colors.teal, backgroundColor: colors.pale, borderRadius: 20, overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 6, fontSize: 8, fontWeight: '800', letterSpacing: 0.8, flexShrink: 1 },
  mapCard: { marginBottom: 18, padding: 10, borderRadius: 14, backgroundColor: '#F5FAFC', borderWidth: 1, borderColor: colors.line },
  mapHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingTop: 2 },
  mapTitle: { color: colors.ink, fontWeight: '700', fontSize: 12 },
  mapLegend: { color: colors.teal, fontWeight: '700', fontSize: 11 },
  mapImage: { width: '100%', aspectRatio: 320 / 390, marginTop: 4 },
  mapNote: { color: colors.muted, fontSize: 9, lineHeight: 13, textAlign: 'center', marginTop: 3 },
  progress: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  progressTrack: { height: 5, backgroundColor: '#EAF0F0', borderRadius: 3, marginTop: 16, marginBottom: 22 },
  progressFill: { height: 5, backgroundColor: colors.teal, borderRadius: 3 },
  question: { color: colors.ink, fontSize: 20, lineHeight: 28, fontWeight: '700', marginBottom: 16 },
  choices: { gap: 9 },
  choice: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 48, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.line, borderRadius: 12, backgroundColor: '#FFF' },
  choiceCorrect: { borderColor: '#B9E4D3', backgroundColor: '#F1FAF6' },
  choiceWrong: { borderColor: '#F0CACA', backgroundColor: '#FFF6F5' },
  choiceLetter: { color: colors.muted, fontSize: 11, fontWeight: '800', backgroundColor: '#F1F3F7', overflow: 'hidden', borderRadius: 8, padding: 7, textAlign: 'center', width: 28 },
  choiceLetterCorrect: { color: colors.green, backgroundColor: '#DDF3E9' },
  choiceLetterWrong: { color: colors.red, backgroundColor: '#FCE5E2' },
  choiceText: { color: colors.ink, fontSize: 13, lineHeight: 19, fontWeight: '600', flex: 1 },
  check: { color: colors.green, fontSize: 17, fontWeight: '800' },
  checkWrong: { color: colors.red, fontSize: 17, fontWeight: '800' },
  feedbackBox: { marginTop: 14, backgroundColor: '#F7FAFA', borderRadius: 11, padding: 11 },
  feedback: { fontSize: 13, lineHeight: 19, fontWeight: '700' },
  explanation: { marginTop: 6, color: colors.muted, fontSize: 12, lineHeight: 18 },
  correctText: { color: colors.green },
  wrongText: { color: colors.red },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  scoreLabel: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  nextButton: { backgroundColor: colors.teal, borderRadius: 11, paddingVertical: 11, paddingHorizontal: 15 },
  nextText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  resultCard: { alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.line, borderRadius: 22, padding: 26, marginTop: 35 },
  resultIcon: { fontSize: 48, marginBottom: 18 },
  resultTitle: { color: colors.ink, fontSize: 34, fontWeight: '800', marginTop: 16 },
  primaryButton: { backgroundColor: colors.teal, borderRadius: 12, paddingHorizontal: 22, paddingVertical: 13, marginTop: 24 },
  primaryText: { color: '#FFF', fontWeight: '700' },
  backButton: { alignSelf: 'flex-start', marginTop: 4 },
});
