import './PlantFilterControl.css';

export interface FilterOption {
  value: string;
  label: string;
  description: string;
  emoji: string;
}

interface PlantFilterControlProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export default function PlantFilterControl({
  label,
  options,
  value,
  onChange,
  ariaLabel,
}: PlantFilterControlProps) {
  const handleClick = (optionValue: string) => {
    // If clicking the same option again, deselect it (pass empty string)
    if (value === optionValue) {
      onChange('');
    } else {
      onChange(optionValue);
    }
  };

  return (
    <div className="plant-filter-control">
      <label className="plant-filter-label">{label}</label>
      <div className="plant-filter-options" role="radiogroup" aria-label={ariaLabel || label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            className={`plant-filter-option ${value === option.value ? 'active' : ''}`}
            onClick={() => handleClick(option.value)}
          >
            <span className="plant-filter-emoji">{option.emoji}</span>
            <span className="plant-filter-option-label">{option.label}</span>
            <span className="plant-filter-option-desc">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
