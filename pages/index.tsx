import { useState } from "react";
import { FramerLayoutTabs } from "../components/framer-layout-tabs";
import { FramerTabs } from "../components/framer-tabs";
import { CSSTabs } from "../components/css-tabs";
import { TransitionGroupTabs } from "../components/transition-group-tabs";
import { SpringTabs } from "../components/spring-tabs";

export function useTabs({
  tabs,
  initialTabId,
  onChange,
}: {
  tabs: Array<{ label: string; id: string }>;
  initialTabId: string;
  onChange?: (id: string) => void;
}) {
  const [[selectedTabIndex, direction], setSelectedTab] = useState(() => {
    const indexOfInitialTab = tabs.findIndex((tab) => tab.id === initialTabId);
    return [indexOfInitialTab === -1 ? 0 : indexOfInitialTab, 0];
  });

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onChange,
      setSelectedTab,
    },
    selectedTab: tabs[selectedTabIndex],
    direction: direction,
  };
}

export default function AboutPage() {
  const [hookProps, setHookProps] = useState({
    tabs: [
      {
        label: "About us",
        id: "about",
      },
      {
        label: "Contact",
        id: "contact",
      },
      {
        label: "Index",
        id: "index",
      },
    ],
    initialTabId: "contact",
  });
  const css = useTabs(hookProps);
  const transitionGroup = useTabs(hookProps);

  const spring = useTabs(hookProps);
  const framer = useTabs(hookProps);
  const framerLayout = useTabs(hookProps);

  return (
    <div className="w-full flex flex-col space-y-24 items-center justify-center">
      <div className="max-w-6xl">
        <CSSTabs {...css.tabProps} />

        <div className="text-center bg-slate-50 rounded-3xl p-9">
          CSS {css.selectedTab.label}
        </div>
      </div>

      <div className="max-w-6xl">
        <TransitionGroupTabs {...transitionGroup.tabProps} />

        <div className="text-center bg-slate-50 rounded-3xl p-9">
          Transition {transitionGroup.selectedTab.label}
        </div>
      </div>

      <div className="max-w-6xl">
        <SpringTabs {...spring.tabProps} />

        <div className="text-center bg-slate-50 rounded-3xl p-9">
          Spring {spring.selectedTab.label}
        </div>
      </div>

      <div className="max-w-6xl">
        <FramerTabs {...framer.tabProps} />
        <div className="text-center bg-slate-50 rounded-3xl p-9">
          Framer {framer.selectedTab.label}
        </div>
      </div>

      <div className="max-w-6xl">
        <FramerLayoutTabs {...framerLayout.tabProps} />
        <div className="text-center bg-slate-50 rounded-3xl p-9">
          Framer layout {framerLayout.selectedTab.label}
        </div>
      </div>

      <button
        onClick={() =>
          setHookProps((prev) => ({
            ...prev,
            tabs: [
              ...prev.tabs,
              {
                label: "test" + Math.random(),
                id: "test" + Math.random(),
              },
            ],
          }))
        }
      >
        add +
      </button>

      <button
        onClick={() =>
          setHookProps((prev) => ({
            ...prev,
            tabs: [...prev.tabs.slice(0, -1)],
          }))
        }
      >
        subtract -
      </button>
    </div>
  );
}
