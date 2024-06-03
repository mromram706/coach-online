import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as Events from "./Events";
import { isNil, usePrevious } from "./utils";
import { SectionContainer } from "./SectionContainer";

const DEFAULT_ANIMATION_TIMER = 1000;
const DEFAULT_ANIMATION = "ease-in-out";
const DEFAULT_CONTAINER_HEIGHT = "100vh";
const DEFAULT_CONTAINER_WIDTH = "100vw";
const DEFAULT_COMPONENT_INDEX = 0;
const DEFAULT_COMPONENTS_TO_RENDER_LENGTH = 0;
const DEFAULT_ANIMATION_TIMER_BUFFER = 200;
const KEY_UP = 38;
const KEY_DOWN = 40;
const MINIMAL_DELTA_Y_DIFFERENCE = 1;
const DISABLED_CLASS_NAME = "rps-scroll--disabled";

let previousTouchMove: number | null = null;
let isScrolling = false;
let isBodyScrollEnabled = true;
let isTransitionAfterComponentsToRenderChanged = false;

interface ReactPageScrollerProps {
  animationTimer?: number;
  animationTimerBuffer?: number;
  blockScrollDown?: boolean;
  blockScrollUp?: boolean;
  children: React.ReactNode;
  containerHeight?: number | string;
  containerWidth?: number | string;
  customPageNumber?: number;
  handleScrollUnavailable?: () => void;
  onBeforePageScroll?: (nextPage: number) => void;
  pageOnChange?: (page: number) => void;
  renderAllPagesOnFirstRender?: boolean;
  transitionTimingFunction?: string;
}

export interface ReactPageScrollerRef {
  goToPage: (page: number) => void;
}

const ReactPageScroller = forwardRef<ReactPageScrollerRef, ReactPageScrollerProps>(
  (
    {
      animationTimer = DEFAULT_ANIMATION_TIMER,
      animationTimerBuffer = DEFAULT_ANIMATION_TIMER_BUFFER,
      blockScrollDown = false,
      blockScrollUp = false,
      children,
      containerHeight = DEFAULT_CONTAINER_HEIGHT,
      containerWidth = DEFAULT_CONTAINER_WIDTH,
      customPageNumber,
      handleScrollUnavailable,
      onBeforePageScroll,
      pageOnChange,
      renderAllPagesOnFirstRender = false,
      transitionTimingFunction = DEFAULT_ANIMATION,
    },
    ref,
  ) => {
    const [componentIndex, setComponentIndex] = useState(DEFAULT_COMPONENT_INDEX);
    const [componentsToRenderLength, setComponentsToRenderLength] = useState(
      DEFAULT_COMPONENTS_TO_RENDER_LENGTH,
    );
    const prevComponentIndex = usePrevious(componentIndex);
    const scrollContainer = useRef<HTMLDivElement | null>(null);
    const pageContainer = useRef<HTMLDivElement | null>(null);
    const lastScrolledElement = useRef<EventTarget | null>(null);
    const isMountedRef = useRef(false);
    const containersRef = useRef<boolean[]>([]);
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

    useImperativeHandle(ref, () => ({
      goToPage: (page: number) => {
        if (pageContainer.current) {
          pageContainer.current.style.transform = `translate3d(0, ${positions[page]}%, 0)`;
        }
        setComponentIndex(page);
      },
    }));

    const positions = useMemo(
      () =>
        childrenArray.reduce<number[]>(
          (_positions, _child) => {
            const lastElement = _positions[_positions.length - 1];
            const height = (_child as React.ReactElement).props.height
              ? parseInt((_child as React.ReactElement).props.height)
              : 100;
            return _positions.concat(lastElement - height);
          },
          [0],
        ),
      [childrenArray],
    );

    const scrollPage = useCallback(
      (nextComponentIndex: number) => {
        if (onBeforePageScroll) {
          onBeforePageScroll(nextComponentIndex);
        }

        if (pageContainer.current) {
          pageContainer.current.style.transform = `translate3d(0, ${positions[nextComponentIndex]}%, 0)`;
        }
      },
      [onBeforePageScroll, positions],
    );

    const addNextComponent = useCallback(
      (componentsToRenderOnMountLength = 0) => {
        let tempComponentsToRenderLength = Math.max(
          componentsToRenderOnMountLength,
          componentsToRenderLength,
        );

        if (tempComponentsToRenderLength <= componentIndex + 1) {
          if (!isNil(childrenArray[componentIndex + 1])) {
            tempComponentsToRenderLength++;
          }
        }

        setComponentsToRenderLength(tempComponentsToRenderLength);
      },
      [childrenArray, componentIndex, componentsToRenderLength],
    );

    const checkRenderOnMount = useCallback(() => {
      if (renderAllPagesOnFirstRender) {
        setComponentsToRenderLength(React.Children.count(childrenArray));
      } else if (!isNil(childrenArray[DEFAULT_COMPONENT_INDEX + 1])) {
        const componentsToRenderAdditionally = positions.filter(
          (position) => Math.abs(position) < 200,
        ).length;
        addNextComponent(DEFAULT_COMPONENTS_TO_RENDER_LENGTH + componentsToRenderAdditionally);
      }
    }, [addNextComponent, childrenArray, positions, renderAllPagesOnFirstRender]);

    const disableScroll = useCallback(() => {
      if (isBodyScrollEnabled) {
        isBodyScrollEnabled = false;
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        document.body.classList.add(DISABLED_CLASS_NAME);
        document.documentElement.classList.add(DISABLED_CLASS_NAME);
      }
    }, []);

    const enableDocumentScroll = useCallback(() => {
      if (!isBodyScrollEnabled) {
        isBodyScrollEnabled = true;
        document.body.classList.remove(DISABLED_CLASS_NAME);
        document.documentElement.classList.remove(DISABLED_CLASS_NAME);
      }
    }, []);

    const setRenderComponents = useCallback(() => {
      const newComponentsToRender = [];

      let i = 0;

      while (i < componentsToRenderLength && !isNil(childrenArray[i])) {
        containersRef.current[i] = true;
        if ((childrenArray[i] as React.ReactElement).type === SectionContainer) {
          newComponentsToRender.push(<React.Fragment key={i}>{childrenArray[i]}</React.Fragment>);
        } else {
          newComponentsToRender.push(
            <SectionContainer key={i}>{childrenArray[i]}</SectionContainer>,
          );
        }
        i++;
      }

      return newComponentsToRender;
    }, [childrenArray, componentsToRenderLength]);

    const scrollWindowDown = useCallback(() => {
      if (!isScrolling && !blockScrollDown) {
        if (!isNil(containersRef.current[componentIndex + 1])) {
          disableScroll();
          isScrolling = true;
          scrollPage(componentIndex + 1);

          setTimeout(() => {
            if (isMountedRef.current) {
              setComponentIndex((prevState) => prevState + 1);
            }
          }, animationTimer + animationTimerBuffer);
        } else {
          enableDocumentScroll();
          if (handleScrollUnavailable) {
            handleScrollUnavailable();
          }
        }
      }
    }, [
      animationTimer,
      animationTimerBuffer,
      blockScrollDown,
      componentIndex,
      disableScroll,
      enableDocumentScroll,
      handleScrollUnavailable,
      scrollPage,
    ]);

    const scrollWindowUp = useCallback(() => {
      if (!isScrolling && !blockScrollUp) {
        if (!isNil(containersRef.current[componentIndex - 1])) {
          disableScroll();
          isScrolling = true;
          scrollPage(componentIndex - 1);

          setTimeout(() => {
            if (isMountedRef.current) {
              setComponentIndex((prevState) => prevState - 1);
            }
          }, animationTimer + animationTimerBuffer);
        } else {
          enableDocumentScroll();
          if (handleScrollUnavailable) {
            handleScrollUnavailable();
          }
        }
      }
    }, [
      animationTimer,
      animationTimerBuffer,
      blockScrollUp,
      componentIndex,
      disableScroll,
      enableDocumentScroll,
      handleScrollUnavailable,
      scrollPage,
    ]);

    const touchMove = useCallback(
      (event: TouchEvent) => {
        if (previousTouchMove !== null) {
          if (event.touches[0].clientY > previousTouchMove) {
            scrollWindowUp();
          } else {
            scrollWindowDown();
          }
        } else {
          previousTouchMove = event.touches[0].clientY;
        }
      },
      [scrollWindowDown, scrollWindowUp],
    );

    const wheelScroll = useCallback(
      (event: React.WheelEvent<HTMLDivElement>) => {
        if (Math.abs(event.deltaY) > MINIMAL_DELTA_Y_DIFFERENCE) {
          if (event.deltaY > 0) {
            lastScrolledElement.current = event.target;
            scrollWindowDown();
          } else {
            lastScrolledElement.current = event.target;
            scrollWindowUp();
          }
        }
      },
      [scrollWindowDown, scrollWindowUp],
    );

    const keyPress = useCallback(
      (event: KeyboardEvent) => {
        if (event.keyCode === KEY_UP) {
          scrollWindowUp();
        }
        if (event.keyCode === KEY_DOWN) {
          scrollWindowDown();
        }
      },
      [scrollWindowDown, scrollWindowUp],
    );

    useEffect(() => {
      const instance = scrollContainer.current;
      if (instance) {
        instance.addEventListener(Events.TOUCHMOVE, touchMove);
        instance.addEventListener(Events.KEYDOWN, keyPress);
        return () => {
          instance.removeEventListener(Events.TOUCHMOVE, touchMove);
          instance.removeEventListener(Events.KEYDOWN, keyPress);
        };
      }
    }, [touchMove, keyPress]);

    useEffect(() => {
      isMountedRef.current = true;
      checkRenderOnMount();
      return () => {
        isMountedRef.current = false;
      };
    }, [checkRenderOnMount]);

    useEffect(() => {
      isScrolling = false;
      previousTouchMove = null;
      if (componentIndex > (prevComponentIndex ?? 0)) {
        addNextComponent();
      }
    }, [addNextComponent, componentIndex, prevComponentIndex]);

    useEffect(() => {
      if (pageOnChange) {
        pageOnChange(componentIndex);
      }
    }, [pageOnChange, componentIndex]);

    useEffect(() => {
      if (customPageNumber !== undefined && customPageNumber !== componentIndex) {
        let newComponentsToRenderLength = componentsToRenderLength;

        if (!isNil(containersRef.current[customPageNumber]) && !isScrolling) {
          isScrolling = true;
          scrollPage(customPageNumber);

          if (
            isNil(containersRef.current[customPageNumber]) &&
            !isNil(childrenArray[customPageNumber])
          ) {
            newComponentsToRenderLength++;
          }

          setTimeout(() => {
            setComponentIndex(customPageNumber);
            setComponentsToRenderLength(newComponentsToRenderLength);
          }, animationTimer + animationTimerBuffer);
        } else if (!isScrolling && !isNil(childrenArray[customPageNumber])) {
          for (let i = componentsToRenderLength; i <= customPageNumber; i++) {
            newComponentsToRenderLength++;
          }

          if (!isNil(childrenArray[customPageNumber])) {
            newComponentsToRenderLength++;
          }

          isScrolling = true;
          isTransitionAfterComponentsToRenderChanged = true;
          setComponentsToRenderLength(newComponentsToRenderLength);
        }
      }
    }, [
      customPageNumber,
      scrollPage,
      animationTimer,
      animationTimerBuffer,
      componentIndex,
      componentsToRenderLength,
      childrenArray,
    ]);

    useEffect(() => {
      if (isTransitionAfterComponentsToRenderChanged) {
        isTransitionAfterComponentsToRenderChanged = false;
        if (customPageNumber !== undefined) {
          scrollPage(customPageNumber);

          setTimeout(() => {
            setComponentIndex(customPageNumber);
          }, animationTimer + animationTimerBuffer);
        }
      }
    }, [
      animationTimer,
      animationTimerBuffer,
      componentsToRenderLength,
      customPageNumber,
      scrollPage,
    ]);

    return (
      <div
        ref={scrollContainer}
        style={{
          height: containerHeight,
          width: containerWidth,
          overflow: "hidden",
        }}
      >
        <div
          ref={pageContainer}
          onWheel={wheelScroll}
          style={{
            height: "100%",
            width: "100%",
            transition: `transform ${animationTimer}ms ${transitionTimingFunction}`,
            outline: "none",
          }}
          tabIndex={0}
        >
          {setRenderComponents()}
        </div>
      </div>
    );
  },
);

ReactPageScroller.displayName = "ReactPageScroller";

export default ReactPageScroller;
