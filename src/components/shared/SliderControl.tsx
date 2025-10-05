import { useState } from 'react';
import './SliderControl.css';

interface SliderControlProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export default function SliderControl({
  label,
  options,
  value,
  onChange,
  ariaLabel,
}: SliderControlProps) {
  const currentIndex = options.findIndex(
    (opt) => opt.toLowerCase() === value.toLowerCase()
  );
  const [activeIndex, setActiveIndex] = useState(currentIndex !== -1 ? currentIndex : 0);

  const handleChange = (index: number) => {
    setActiveIndex(index);
    onChange(options[index].toLowerCase());
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      handleChange(index - 1);
    } else if (e.key === 'ArrowRight' && index < options.length - 1) {
      handleChange(index + 1);
    }
  };

  return (
    <div className="slider-control">
      <label className="slider-label">{label}</label>
      <div className="slider-track" role="radiogroup" aria-label={ariaLabel || label}>
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={activeIndex === index}
            className={`slider-option ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={activeIndex === index ? 0 : -1}
          >
            <span className="slider-option-text">{option}</span>
          </button>
        ))}
        <div
          className="slider-indicator"
          style={{
            left: `${(activeIndex / (options.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
