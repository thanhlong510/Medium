import React, { useState, useEffect, useRef } from 'react';
import { api } from '~/utils/api';

const interestsOptions = [
  'Programming',
  'Data Science',
  'Technology',
  'Self Improvement',
  'Writing',
  'Relationships',
  'Machine Learning',
  'Productivity',
  'Politics',
  'Sports',
];

const MultiSelectDropdown: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [availableInterests, setAvailableInterests] = useState<string[]>(interestsOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const createPost = api.post.create.useMutation({

  })

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      // If the interest is already selected, remove it
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      // If the interest is not selected, add it
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    // Close the dropdown if clicked outside
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Update the available interests when selected interests change
    setAvailableInterests(interestsOptions.filter(interest => !selectedInterests.includes(interest)));

    // Add event listener for outside click
    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedInterests]);

  return (
    <div ref={dropdownRef} className="relative">
      <div className="flex flex-wrap gap-2 absolute -top-10">
        {selectedInterests.map(interest => (
          <span
            key={interest}
            className="bg-gray-300 px-2 py-1 rounded-xl cursor-pointer flex items-center"
            onClick={() => handleInterestToggle(interest)}
          >
            <span className="mr-1">{interest}</span>
            <span className="text-red-500 cursor-pointer">&times;</span>
          </span>
        ))}
      </div>
      <div className="relative mt-[60px]">
        <input
          type="text"
          placeholder="Select your interests..."
          onClick={handleDropdownToggle}
          readOnly
          className={`cursor-pointer border border-gray-300 rounded px-2 py-1 w-[250px] h-[50px] `}
          value={selectedInterests.join(', ')}
        />
        {isDropdownOpen && (
          <div className="absolute top-full left-0 border border-gray-300 rounded-xl bg-white z-10 w-250">
           
            {availableInterests.map(interest => (
              <div
                key={interest}
                className={`p-2 cursor-pointer font-semibold ${
                  selectedInterests.includes(interest) ? 'bg-gray-300 selected' : ''
                }`}
                onClick={() => handleInterestToggle(interest)}
                onMouseEnter={(e) => e.currentTarget.classList.add('hover:bg-green-400', 'text-white')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-green-400', 'text-white')}
                style={{
                  width: '100%', // Chiều rộng tối đa của option
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {interest}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className='w-[100px] h-[50px] bg-red-700 mt-4 rounded-full' >
        Submit
      </button>
    </div>
  );
};

export default MultiSelectDropdown;
