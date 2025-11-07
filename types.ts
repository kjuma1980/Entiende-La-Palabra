
export interface BibleVerse {
  reference: string;
  text: string;
}

export interface FurtherStudyTopic {
  topic: string;
  description: string;
}

export interface BibleExplorationResult {
  explanation: string;
  key_verses: BibleVerse[];
  related_verses: BibleVerse[];
  further_study_topics: FurtherStudyTopic[];
}
