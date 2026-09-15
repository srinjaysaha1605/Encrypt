export type LessonCategory = 
  | 'Fundamentals'
  | 'Encryption'
  | 'Authentication'
  | 'Key Management'
  | 'Randomness'
  | 'Trust'
  | 'Key Exchange'
  | 'Secure Communication';

export interface CodeSnippet {
  language: 'javascript' | 'python' | 'bash';
  title: string;
  code: string;
}

export interface KeyProperty {
  name: string;
  description: string;
}

export interface UnderTheHoodContent {
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface LessonData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: LessonCategory;
  learnContent: {
    description: string[];
    simpleDiagram?: string;
  };
  keyProperties: KeyProperty[];
  underTheHood?: UnderTheHoodContent;
  toolType: 'hashing' | 'symmetric' | 'asymmetric' | 'hmac' | 'kdf' | 'csprng' | 'signatures' | 'certificates' | 'nonces' | 'encoding' | 'dh' | 'pki' | 'tls';
  practicalSnippets: CodeSnippet[];
}

export interface UserProgress {
  completedLessons: string[];
}
