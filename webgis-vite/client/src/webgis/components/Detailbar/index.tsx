import React, { memo } from 'react';
import s from './detailbar.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  handleShowLayerbar: () => void;
  children?: React.ReactNode;
  position: 'left' | 'right';
  size: 'small' | 'large';
}

const LayerBar = (props: Props) => {
  const layerWidth = props.size === 'small' ? '250px' : '350px';

  return (
    <div
      className={`${s.wrapper} ${props.className} ${props.isOpen ? 'bg-white' : 'bg-main-yellow'}`}
      style={{
        height: !props.isOpen ? '40px' : 'calc(100vh - 8.5rem)',
        width: !props.isOpen ? '50px' : layerWidth,
        left: props.position === 'left' ? '0.5rem' : 'unset',
        right: props.position === 'right' ? '0.5rem' : 'unset',
      }}
    >
      <ButtonCollapse handlePress={props.handleShowLayerbar} />
      {props.isOpen && props.children}
    </div>
  );
};

interface ButtonTypes {
  handlePress: () => void;
}

const ButtonCollapse = (props: ButtonTypes) => (
  <div
    className="inline-flex items-center justify-center rounded-md p-2 text-slate-800 hover:cursor-pointer"
    aria-controls="mobile-menu"
    aria-expanded="false"
    onClick={props.handlePress}
  >
    <svg
      className="block h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
    <svg
      className="hidden h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
);

export default memo(LayerBar);
