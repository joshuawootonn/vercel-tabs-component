import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

type Tab = { label: string; id: string };

type Props = {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: [number, number]) => void;
};

const duration = 300;

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: {},
};

const SelectionTelegraph = ({
  navRect,
  selectedRect,
}: {
  navRect: DOMRect;
  selectedRect: DOMRect;
}) => {
  const isInitialRender = useRef(true);

  if (isInitialRender.current) {
    isInitialRender.current = false;
    return (
      <div
        className={"absolute z-10 bottom-0 left-0 h-0.5 bg-slate-500"}
        style={{
          width: selectedRect.width * 0.8,
          transform: `translateX(calc(${
            selectedRect.left - navRect.left
          }px + 10%))`,
          opacity: 1,
          transition: `opacity 150ms 150ms`,
        }}
      />
    );
  }

  return (
    <div
      className={"absolute z-10 bottom-0 left-0 h-0.5 bg-slate-500"}
      style={{
        width: selectedRect.width * 0.8,
        transform: `translateX(calc(${
          selectedRect.left - navRect.left
        }px + 10%))`,
        opacity: 1,
        transition: `transform 150ms 0ms, opacity 150ms 150ms`,
      }}
    />
  );
};

export const TransitionGroupTabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: Props): JSX.Element => {
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);

  const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
    []
  );

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const isInitialElement = useRef(true);
  const exitElement = useRef<DOMRect>();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();
  const hoveredRect =
    buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect() ??
    exitElement.current;

  const onLeaveTabs = () => {
    isInitialElement.current = true;
    exitElement.current = hoveredRect;
    setHoveredTabIndex(null);
  };

  const onEnterTab = (i: number) => {
    exitElement.current = undefined;
    setHoveredTabIndex((prev) => {
      if (prev != null && prev !== i) {
        isInitialElement.current = false;
      }
      return i;
    });
  };

  const onSelectTab = (i: number) => {
    setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
  };

  return (
    <nav
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
      onPointerLeave={onLeaveTabs}
    >
      {tabs.map((item, i) => {
        return (
          <button
            key={i}
            className={classNames(
              "text-md relative rounded-md flex items-center h-8 px-4 z-20 bg-transparent text-sm text-slate-500 cursor-pointer select-none transition-colors",
              {
                "text-slate-700":
                  hoveredTabIndex === i || selectedTabIndex === i,
              }
            )}
            ref={(el) => (buttonRefs[i] = el)}
            onPointerEnter={() => onEnterTab(i)}
            onFocus={() => onEnterTab(i)}
            onClick={() => onSelectTab(i)}
          >
            {item.label}
          </button>
        );
      })}

      <Transition in={hoveredTabIndex != null} timeout={duration}>
        {(state) => {
          if (!hoveredRect || !navRect) return <></>;
          return (
            <div
              className="absolute z-10 top-0 left-0 rounded-md bg-gray-200 transition-[width]"
              style={{
                transform: `translate3d(${hoveredRect.left - navRect.left}px,${
                  hoveredRect.top - navRect.top
                }px,0px)`,
                width: hoveredRect.width,
                height: hoveredRect.height,
                transition: isInitialElement.current
                  ? `transform 0ms, opacity 150ms, width 0ms`
                  : `transform 150ms 0ms, opacity 150ms 0ms, width 150ms`,
                ...transitionStyles[state],
              }}
            />
          );
        }}
      </Transition>
      {navRect && selectedRect && (
        <SelectionTelegraph navRect={navRect} selectedRect={selectedRect} />
      )}
    </nav>
  );
};
