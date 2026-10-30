import type { ReactNode } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Text } from './ui/Text';

export function AppModal({
  visible,
  title,
  subtitle,
  onClose,
  children,
  contentClassName = 'max-h-[80%]',
}: {
  visible: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-end bg-black/60"
        onPress={onClose}
      >
        <Pressable
          className={`rounded-t-3xl border-t border-line bg-sheet px-4 pb-8 pt-4 ${contentClassName}`}
          onPress={() => {}}
        >
          <View className="mb-2 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-[18px] font-bold text-ink">{title}</Text>
              {subtitle ? (
                <Text className="mt-0.5 text-[12px] text-faint">
                  {subtitle}
                </Text>
              ) : null}
            </View>
            <Pressable onPress={onClose} hitSlop={12}>
              <Text className="text-[14px] text-muted">关闭</Text>
            </Pressable>
          </View>

          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
