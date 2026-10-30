import { Text as RNText } from 'react-native';
import type { TextProps } from 'react-native';

type Props = TextProps & { className?: string };

/**
 * Text with the project font. Picks the bold face when the className asks for
 * a bold/semibold weight, and sets a tight explicit line height so Noto Sans
 * SC's large metrics don't add vertical padding inside chips/cards/buttons.
 */
export function Text({ className = '', style, ...props }: Props) {
  const bold = /\bfont-(bold|semibold|extrabold|black)\b/.test(className);
  const size = /text-\[(\d+(?:\.\d+)?)px\]/.exec(className)?.[1];
  const hasLeading = /\bleading-/.test(className);
  const lineHeight =
    size && !hasLeading ? Math.round(Number(size) * 1.3) : undefined;

  return (
    <RNText
      {...props}
      includeFontPadding={false}
      style={[style, lineHeight ? { lineHeight } : null]}
      className={`${bold ? 'font-heavy' : 'font-regular'} ${className}`}
    />
  );
}
