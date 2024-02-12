import React, { useState, useEffect, useRef } from "react";
import { BiCategory } from "react-icons/bi";
const interestsOptions = [
  "Programming",
  "Technology",
  "Writing",
  "Relationships",
  "Productivity",
  "Politics",
  "Sports",
];
interface MultiSelectCategoryProps {
  handleInterestToggle: (a: string) => void;
  selectedInterests: string[];
}

const MultiSelectCategory: React.FC<MultiSelectCategoryProps> = ({
  handleInterestToggle,
  selectedInterests,
}) => {
  const [availableInterests, setAvailableInterests] =
    useState<string[]>(interestsOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    // Close the dropdown if clicked outside
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Update the available interests when selected interests change
    setAvailableInterests(
      interestsOptions.filter(
        (interest) => !selectedInterests.includes(interest),
      ),
    );

    // Add event listener for outside click
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedInterests]);

  return (
    <div ref={dropdownRef} className="relative ">
      <div className="absolute  top-4 flex gap-2 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {selectedInterests?.map((interest) => (
          <span
            key={interest}
            className="flex cursor-pointer items-center  rounded-xl bg-gray-300 px-2 py-1"
            onClick={() => handleInterestToggle(interest)}
          >
            <span className="mr-1  overflow-hidden overflow-ellipsis font-normal">
              {interest}
            </span>
            <span className="cursor-pointer text-slate-900">&times;</span>
          </span>
        ))}
      </div>
      <div className="relative mt-[60px]">
        <div className="flex items-center space-x-1">
          <BiCategory
            className="h-[20px] w-[20px]"
            onClick={handleDropdownToggle}
          />
          <p
            onClick={handleDropdownToggle}
            className="cursor-pointer text-center text-sm font-semibold text-[#334155]"
          >
            Add your category
          </p>
        </div>

        {isDropdownOpen && (
          <div className="w-250 absolute left-4 flex-row top-full font-semibold  text-sm z-10 rounded-xl border border-gray-300  bg-white">
            {availableInterests?.map((interest) => (
              <div
                key={interest}
                className={`cursor-pointer  p-2 px-4 font-semibold ${
                  selectedInterests.includes(interest)
                    ? "selected bg-gray-30 " 
                    : ""
                }`}
                onClick={() => handleInterestToggle(interest)}
                onMouseEnter={(e) =>
                  e.currentTarget.classList.add(
                    "hover:bg-gray-100",
                    "hover:rounded-xl",
                    
                  )
                }
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove(
                    "hover:bg-green-400",
                    "hover:rounded-xl",
                    "text-white",
                  )
                }
                style={{
                  width: "100%", // Chiều rộng tối đa của option
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
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
