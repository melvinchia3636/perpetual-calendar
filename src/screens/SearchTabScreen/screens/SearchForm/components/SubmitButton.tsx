import { styled } from 'nativewind';
import { useState } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { useSearchTab } from '@/screens/SearchTabScreen/screens/SearchResults/contexts/SearchResultsContext';
import { useSearchForm } from '@/screens/SearchTabScreen/screens/SearchForm/contexts/SearchFormContext';

const StyledButton = styled(PaperButton, { className: 'style' });

export function SubmitButton() {
  const { open } = useSearchTab();
  const { form } = useSearchForm();
  const [loading, setLoading] = useState(false);

  const run = () => {
    const term = form.activity.trim();
    if (!term || loading) return;

    setLoading(true);
    // Paint the spinner before running the synchronous almanac scan.
    setTimeout(() => {
      open({
        month: form.month.format('YYYY-MM'),
        activity: term,
        type: form.type,
        scope: form.scope,
      });
      setLoading(false);
    }, 0);
  };

  return (
    <StyledButton
      className="mt-6"
      mode="contained"
      uppercase={false}
      loading={loading}
      disabled={form.activity === ''}
      icon={form.scope === 'hour' ? 'clock-outline' : 'magnify'}
      onPress={run}
    >
      {form.scope === 'hour' ? '查询吉时' : '查询吉日'}
    </StyledButton>
  );
}
