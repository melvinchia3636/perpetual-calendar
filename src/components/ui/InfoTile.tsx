import { Text } from './Text';
import { Section } from './Section';

export function InfoTile({
  label,
  value,
  valueClassName = 'text-ink',
  className = '',
}: {
  label: string;
  value: string;
  valueClassName?: string;
  className?: string;
}) {
  return (
    <Section padded={false} className={`flex-1 p-3.5 ${className}`}>
      <Text className="text-[13px] text-muted">{label}</Text>
      <Text className={`mt-2 text-[16px] font-semibold ${valueClassName}`}>
        {value}
      </Text>
    </Section>
  );
}
