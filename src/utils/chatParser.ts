import type { ParticipantResult } from '../types';

/**
 * Splits chat content by newlines
 */
export const splitByLine = (text: string): string[] => {
  return text.split(/\n/);
};

/**
 * Creates a word frequency map from an array of senders
 * Example input: ['From John Doe to Host', 'From Jane Doe to Host', 'From John Doe to Host']
 * Example output: { 'From John Doe to Host': 2, 'From Jane Doe to Host': 1 }
 */
export const createWordMap = (wordsArray: string[]): Record<string, number> => {
  const wordsMap: Record<string, number> = {};
  
  wordsArray.forEach((key) => {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });

  return wordsMap;
};

/**
 * Converts word map to sorted array of results
 * Sorts by count in descending order
 */
export const sortByCount = (wordsMap: Record<string, number>): ParticipantResult[] => {
  const finalWordsArray: ParticipantResult[] = Object.keys(wordsMap).map((key) => ({
    name: key,
    total: wordsMap[key],
  }));

  finalWordsArray.sort((a, b) => b.total - a.total);

  return finalWordsArray;
};

/**
 * Extracts sender info from chat lines
 * Handles both old format (Privately) and new format (Direct Message)
 * Pattern: From [sender] [to recipient(format)] : message
 */
export const hasCertainPattern = (data: string): string[] => {
  const result = splitByLine(data);
  const someArray: string[] = [];
  
  if (result.length === 0) return someArray;
  
  const fromIndex = result[0].indexOf('From');
  
  for (let i = 0; i < result.length; i++) {
    let sub = result[i].substring(fromIndex);
    sub = sub.substring(0, sub.indexOf(':'));
    if (sub !== '') {
      someArray.push(sub);
    }
  }
  
  return someArray;
};

/**
 * Dynamically sorts array by property
 * Use "-property" prefix to sort in reverse order
 */
export const dynamicSort = (property: string) => {
  let sortOrder = 1;
  let sortProperty = property;

  if (property[0] === '-') {
    sortOrder = -1;
    sortProperty = property.substring(1);
  }

  return (a: ParticipantResult, b: ParticipantResult) => {
    if (sortOrder === -1) {
      return b[sortProperty as keyof ParticipantResult]
        .toString()
        .localeCompare(a[sortProperty as keyof ParticipantResult].toString());
    } else {
      return a[sortProperty as keyof ParticipantResult]
        .toString()
        .localeCompare(b[sortProperty as keyof ParticipantResult].toString());
    }
  };
};
