import { useState } from "react";
import {MdKeyboardArrowDown} from "react-icons/md";


const SelectDropDown = ({onChange, placeholder, value, options})=>{
    const [open, setOpen] = useState(false);

    return(
        <section className="w-[200px]">
            <div onClick={()=> setOpen(!open)}
            tabIndex={0} 
            className="w-full flex justify-between items-center py-2 px-3 border-2 border-gray-400
              rounded-md cursor-pointer focus:border-[var(--ring)] focus:border-2">
                <p className="text-sm text-[var(--foreground)]">{ value ? value : placeholder}</p>
                <MdKeyboardArrowDown className={`text-base ease-in-out duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}/>
            </div>


            {open &&  <div className="bg-[var(--card)] absolute top-16 w-[200px] max-h-[300px] px-1 py-3 border shadow-lg border-gray-200 rounded-md z-20 overflow-y-scroll ">
              <style jsx>{`
                ::-webkit-scrollbar {
                display: none;
                }
              `}</style>

                {options.map((option)=>
                  <div onClick={()=> {
                    onChange(option?.themeName);
                    setOpen(false);
                  }}
                  className={`flex justify-start items-center ${option?.themeName === value ? 'bg-[#d5e9fb]' : 'bg-white'} space-x-2 hover:bg-[aliceblue] px-2 rounded-md cursor-pointer`}>
                    <span className={`w-5 h-5 ${option?.color} rounded-full`}></span>
                    <p className="text-sm py-2 text-[var(--card-foreground)] cursor-pointer">{option?.themeName}</p>
                  </div>
                )}
            </div>
            }

        </section>
    )
}
export default SelectDropDown;