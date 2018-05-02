import { Platform } from 'react-native';

export default function applyLetterSpacing(string, count = 1) {
  if (Platform.OS === 'android') {
    return string.split('').join('\u200A'.repeat(1));
  } else {
    return string.split('').join('\u200A'.repeat(count));
  }
}
