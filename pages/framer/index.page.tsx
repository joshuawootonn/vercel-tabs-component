import { useState } from "react";
import { Framer } from "./framer";
import { useTabs } from "./useTabs";
import { Circle, Square, Triangle } from "./shapes";

export default function App() {
  const [hookProps] = useState({
    tabs: [
      {
        label: "Circle",
        children: <Circle />,
        id: "Circle",
      },
      {
        label: "Triangle",
        children: <Triangle />,
        id: "Triangle",
      },
      {
        label: "Square",
        children: <Square />,
        id: "Square",
      },
    ],
    initialTabId: "Triangle",
  });
  const framer = useTabs(hookProps);
  return (
    <div className="w-full mt-[100px] flex flex-col space-y-24 items-center justify-center">
      <div className="max-w-6xl">
        <Framer.Tabs {...framer.tabProps} />
        <Framer.Content
          {...framer.contentProps}
          className="text-center rounded-3xl w-60 p-9"
        >
          {framer.selectedTab.children}
        </Framer.Content>
      </div>
    </div>
  );
}
