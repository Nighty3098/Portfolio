import React from "react";

interface PixelStarIconProps {
  className?: string;
}

const PixelStarIcon: React.FC<PixelStarIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 15 15"
    width="auto"
    height="auto"
    aria-hidden="true"
    focusable="false"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="7" y="0" width="2" height="1" fill="currentColor" />
    <rect x="7" y="1" width="2" height="2" fill="currentColor" />
    <rect x="6" y="3" width="4" height="2" fill="currentColor" />
    <rect x="1" y="5" width="14" height="2" fill="currentColor" />
    <rect x="3" y="7" width="10" height="2" fill="currentColor" />
    <rect x="4" y="9" width="3" height="2" fill="currentColor" />
    <rect x="9" y="9" width="3" height="2" fill="currentColor" />
    <rect x="3" y="11" width="3" height="2" fill="currentColor" />
    <rect x="10" y="11" width="3" height="2" fill="currentColor" />
  </svg>
);

export default PixelStarIcon;
