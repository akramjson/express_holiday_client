import React, { useEffect, useState } from "react";
import { assets } from "../../../assets";
import { cn } from "../../../utils/Cfunction";
import "./informer.css";

type InformerProps = {
  title: string;
  description: string;
  type: "success" | "error";
  isActive: boolean;
  direction?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number; // Duration for visibility
  onClose: () => void;
};

const ANIMATION_DURATION = 1500; // Animation duration for visibility
const SLIDE_OUT_DURATION = 400; // Slide-out duration

const Informer: React.FC<InformerProps> = ({
  title,
  description,
  type,
  isActive,
  direction = "top-right",
  duration = ANIMATION_DURATION,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    let removeTimer: NodeJS.Timeout;

    if (isActive) {
      setIsAnimating(true);
      setIsVisible(true);

      hideTimer = setTimeout(() => {
        setIsAnimating(false);
        removeTimer = setTimeout(() => {
          setIsVisible(false);
          if (onClose) onClose(); // Trigger callback to reset parent state
        }, SLIDE_OUT_DURATION);
      }, duration);
    } else {
      setIsAnimating(false);
      setIsVisible(false);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [isActive, duration, onClose]);

  // Early return if not visible
  if (!isVisible) return null;

  // Mapping icons for success and error
  const iconMap = {
    success: <assets.doneIcon className="text-2xl text-success" />,
    error: <assets.errIcon className="text-2xl text-error" />,
  };

  const icon = iconMap[type];

  // Building class names
  const baseClasses =
    "p-4 rounded-md absolute shadow-md flex items-start transition-opacity duration-200 gap-2";
  const typeClasses =
    type === "success"
      ? "bg-green-100 border-l-4 border-success"
      : "bg-red-100 border-l-4 border-error";
  const animationClasses = isAnimating ? "slide-in" : "slide-out";

  // Position classes based on direction prop
  const positionClasses = {
    "top-left": "top-10 left-10",
    "top-right": "top-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "bottom-right": "bottom-10 right-10",
  }[direction];

  const classNames = cn(
    baseClasses,
    typeClasses,
    animationClasses,
    positionClasses,
    "z-50"
  );

  return (
    <div className={classNames}>
      <div className="rounded-full flex mt-1 justify-center font-bold">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Informer;
