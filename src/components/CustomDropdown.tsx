
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import "../styles/components/CustomDropdown.css";

interface DropdownOption {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = "Seçiniz",
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`custom-dropdown-container ${className}`} ref={dropdownRef}>
            <button
                type="button"
                className={`custom-dropdown-button ${isOpen ? "is-open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="selected-text">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={18} className="dropdown-arrow" />
            </button>

            {isOpen && (
                <div className="custom-dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`custom-dropdown-item ${option.value === value ? "is-selected" : ""
                                }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            <div className="item-icon-container">
                                {option.value === value && <Check size={16} className="check-icon" />}
                            </div>
                            <span className="item-label">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
