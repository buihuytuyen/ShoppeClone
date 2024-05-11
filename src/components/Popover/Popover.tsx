import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { ReactNode, useId, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  render: ReactNode;

  className?: string;

  placment?: Placement;
}

const ARROW_WIDTH = 20;
const ARROW_HEIGHT = 10;

export default function Popover({ children, render, className, placment = 'bottom-end' }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(ARROW_HEIGHT - 5), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    placement: placment
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const arrowX = middlewareData.arrow?.x ?? 0;
  const arrowY = middlewareData.arrow?.y ?? 0;
  const transformX = arrowX + ARROW_WIDTH / 2;
  const transformY = arrowY + ARROW_HEIGHT;

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      transform: 'scale(0.8)',
      opacity: 0
    },
    duration: {
      open: 200,
      close: 100
    },
    common: ({ side }) => ({
      transformOrigin: {
        top: `${transformX}px calc(100% + ${ARROW_HEIGHT}px)`,
        bottom: `${transformX}px ${-ARROW_HEIGHT}px`,
        left: `calc(100% + ${ARROW_HEIGHT}px) ${transformY}px`,
        right: `${-ARROW_HEIGHT}px ${transformY}px`
      }[side]
    })
  });

  const id = useId();

  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {isMounted && (
        <FloatingPortal id={id}>
          <FloatingFocusManager context={context} modal={false} closeOnFocusOut={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className='z-10 focus:outline-none'
            >
              <div className='bg-white text-black border-none rounded-sm shadow-lg min-w-40 h-auto' style={styles}>
                {render}
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  style={{ transform: 'translateY(-1px)' }}
                  className='fill-white [&>path:first-of-type]:stroke-pink-500 [&>path:last-of-type]:stroke-white'
                  height={ARROW_HEIGHT}
                  width={ARROW_WIDTH}
                />
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}
