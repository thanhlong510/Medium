import React, { useState, useEffect, useRef } from 'react';
import { BiCategory } from "react-icons/bi";
const interestsOptions = [
  'Programming',
  'Technology',
  'Writing',
  'Relationships',
  'Productivity',
  'Politics',
  'Sports',
];
interface MultiSelectCategoryProps {
    handleInterestToggle: (a:string)=>void,
    selectedInterests: string[]

}

const MultiSelectCategory: React.FC<MultiSelectCategoryProps> = ({handleInterestToggle, selectedInterests}) => {

  const [availableInterests, setAvailableInterests] = useState<string[]>(interestsOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    <div ref={dropdownRef} className="relative ">
      <div className="flex  gap-2 sm:max-w-xl md:max-w-2xl lg:max-w-3xl absolute top-4">
        {selectedInterests?.map(interest => (
          <span
            key={interest}
            className="bg-gray-300 px-2 py-1  rounded-xl cursor-pointer flex items-center"
            onClick={() => handleInterestToggle(interest)}
          >
            <span className="mr-1  font-normal overflow-hidden overflow-ellipsis">{interest}</span>
            <span className="text-slate-900 cursor-pointer">&times;</span>
          </span>
        ))}
      </div>
      <div className="relative mt-[60px]">
      <div className='flex gap-3 items-center'>
      <BiCategory
          className="h-[20px] w-[20px]"
          onClick={handleDropdownToggle}
        /> 
        <p onClick={handleDropdownToggle} className='text-center font-semibold text-[#334155] text-sm cursor-pointer'>
            Add your category
        </p>
      </div>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-4 border border-gray-300 rounded-xl bg-white z-10 w-250">
           
            {availableInterests?.map(interest => (
              <div
                key={interest}
                className={`p-2 cursor-pointer font-semibold ${
                  selectedInterests.includes(interest) ? 'bg-gray-300 selected' : ''
                }`}
                onClick={() => handleInterestToggle(interest)}
                onMouseEnter={(e) => e.currentTarget.classList.add('hover:bg-green-400','hover:rounded-xl', 'text-white')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-green-400','hover:rounded-xl', 'text-white')}
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

    </div>
  );
};

export default MultiSelectCategory;
