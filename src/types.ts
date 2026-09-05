export type LevelId = 
  | 'level-0' // H1-3
  | 'level-1' // H4-13
  | 'reward-1' // H14
  | 'level-2' // H15-20
  | 'reward-2' // H21
  | 'level-3' // H22-31
  | 'reward-3' // H32
  | 'level-4' // H33-42
  | 'reward-4' // H43
  | 'level-5' // H44-51
  | 'reward-5' // H52
  | 'level-6' // H53-56
  | 'level-7' // H57-58
  | 'pesta'   // H59
  | 'sertifikat'; // H60

export type ActivityType =
  | 'cover'
  | 'profile'
  | 'map'
  | 'letter-trace'
  | 'letter-circle'
  | 'match-pairs'
  | 'find-letters'
  | 'fill-missing-letter'
  | 'sound-phonics'
  | 'listen-choose'
  | 'initial-sound'
  | 'syllable-learn'
  | 'syllable-match'
  | 'syllable-assemble'
  | 'word-read'
  | 'word-match'
  | 'word-missing'
  | 'word-find-same'
  | 'word-choose-image'
  | 'word-puzzle'
  | 'sentence-read'
  | 'sentence-assemble'
  | 'story-quiz'
  | 'final-mission'
  | 'reward'
  | 'party'
  | 'certificate';

export interface WorksheetPage {
  pageNumber: number; // 1 to 60
  levelId: LevelId;
  levelTitle: string;
  levelIcon: string;
  activityType: ActivityType;
  title: string;
  instruction: string;
  kikoMessage: string;
  data: any;
  answerKey?: string; // Brief note for parents/teachers
}

export interface StudentProfile {
  name: string;
  age: string;
  date: string;
  avatar: string;
}

export type SkillLevel = 'belum' | 'mulai' | 'bisa';

export interface ProgressAssessment {
  mengenalHuruf: SkillLevel;
  mengenalBunyi: SkillLevel;
  membacaSukuKata: SkillLevel;
  membacaKata: SkillLevel;
  membacaKalimat: SkillLevel;
  membacaCerita: SkillLevel;
  notes: string;
}
