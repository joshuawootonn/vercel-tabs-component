import { useState } from "react";
import { CSSTabs } from "./css";
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
  const css = useTabs(hookProps);
  return (
    <div className="w-full mt-[100px] flex flex-col space-y-24 items-center justify-center">
      <div className="max-w-6xl">
        <CSSTabs {...css.tabProps} />
        <div className="w-60 p-9">{css.selectedTab.children}</div>
      </div>
    </div>
  );
}
