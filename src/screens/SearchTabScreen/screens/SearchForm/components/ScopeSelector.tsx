import { SegmentedButtons } from "react-native-paper";
import type { MatchScope } from "@/lib/core";
import { useSearchForm } from "@/screens/SearchTabScreen/screens/SearchForm/contexts/SearchFormContext";
import { Field } from "@/components/ui";

export function ScopeSelector() {
  const { form, setForm } = useSearchForm();

  return (
    <Field label="范围">
      <SegmentedButtons
        value={form.scope}
        onValueChange={(value) =>
          setForm((current) => ({
            ...current,
            scope: value as MatchScope,
            activity: "",
          }))
        }
        density="small"
        buttons={[
          { value: "day", label: "吉日", icon: "calendar-check" },
          { value: "hour", label: "吉时", icon: "clock-outline" },
        ]}
      />
    </Field>
  );
}
