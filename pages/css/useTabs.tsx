import { ReactNode, useState } from "react";

type Tab = { label: string; id: string; children: ReactNode };

export function useTabs({
  tabs,
  initialTabId,
  onChange,
}: {
  tabs: Tab[];
  initialTabId: string;
  onChange?: (id: string) => void;
}) {
  const [selectedTabIndex, setSelectedTab] = useState(() => {
    const indexOfInitialTab = tabs.findIndex((tab) => tab.id === initialTabId);
    return indexOfInitialTab === -1 ? 0 : indexOfInitialTab;
  });

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onChange,
      setSelectedTab,
    },
    selectedTab: tabs[selectedTabIndex],
  };
}
