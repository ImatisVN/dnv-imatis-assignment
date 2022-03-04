import * as React from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { observer } from "mobx-react";

interface Option {
  id: string;
  name: string;
}

interface IProps {
  className?: string;
  label?: string;
  selectedOption: Option;
  onChange: (selectedOption: Option) => void;
  options: Array<Option>;
}

const Selector = () => (
  <svg
    className="w-5 h-5 text-indigo-600"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const Select = observer(
  ({ className, label, options, selectedOption, onChange }: IProps) => {
    return (
      <Listbox
        as="div"
        className={className}
        value={selectedOption}
        onChange={(selectedOption: Option) => {
          onChange(selectedOption);
        }}
      >
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="mb-1 text-sm font-medium text-blue-gray-500">
                {label}
              </Listbox.Label>
            )}
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block ml-1">{selectedOption?.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <Selector />
                </span>
              </Listbox.Button>

              <div className="absolute bottom-0 z-10 w-full mt-1 bg-white rounded-md shadow-lg mb-11">
                {/* bottom-0 will open the select menu up & mb-11 will put the dropup above the select option */}
                <Transition
                  show={open}
                  leave="transition duration-100 ease-in"
                  leaveFrom="transform opacity-100"
                  leaveTo="transform opacity-0"
                >
                  <Listbox.Options
                    static
                    className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {options.map((option) => {
                      return (
                        <Listbox.Option
                          as={React.Fragment}
                          key={option.id}
                          value={option}
                        >
                          {({ active, selected }) => {
                            return (
                              <li
                                className={clsx(
                                  "relative py-2 pl-3 cursor-default select-none pr-9 text-sm",
                                  {
                                    "text-white bg-indigo-600": active,
                                    "text-gray-900": !active,
                                  }
                                )}
                              >
                                <div className="flex items-center">
                                  <span
                                    className={clsx("ml-3 block", {
                                      "font-semibold": selected,
                                      "font-normal": !selected,
                                    })}
                                  >
                                    {option.name}
                                  </span>
                                </div>
                              </li>
                            );
                          }}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          </>
        )}
      </Listbox>
    );
  }
);
