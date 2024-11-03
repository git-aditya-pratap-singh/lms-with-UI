import { useState } from "react";
import {MdKeyboardArrowDown} from "react-icons/md";


const ThemeDropDown = ({onChange, placeholder, value, options})=>{
    const [open, setOpen] = useState(false);

    return(
        <section className="w-[11rem]">
            <div onClick={()=> setOpen(!open)}
            tabIndex={0} 
            className="w-full flex justify-between items-center py-2 px-3 border-2 border-gray-400
              rounded-md cursor-pointer focus:border-[var(--ring)] focus:border-2">

                <div className="flex justify-center items-center space-x-2">
                  <label className={`${ value?.color ? `${value?.color} w-5 h-5 rounded-full` : ''}`}></label>
                  <p className="text-sm text-[var(--foreground)]">{ value?.themeName ? value?.themeName : placeholder}</p> 
                </div>
                
                <MdKeyboardArrowDown className={`text-base ease-in-out duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}/>
            </div>


            {open &&  <div className="bg-[var(--card)] absolute top-[8.3rem] sm:top-[4rem] w-[11rem] px-2 py-3 border shadow-lg border-gray-200 rounded-md z-20 overflow-y-scroll ">
              <style jsx>{`
                ::-webkit-scrollbar {
                display: none;
                }
              `}</style>

                {options.map((option, index)=>
                  <div key={index} onClick={()=> {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`flex justify-start items-center ${option?.themeName === value?.themeName && 'bg-[#d5e9fb]'} space-x-2 hover:bg-[aliceblue] px-2 rounded-md cursor-pointer`}>
                    <span className={`w-5 h-5 ${option?.color} rounded-full`}></span>
                    <p className={`text-sm py-2 ${option?.themeName === value?.themeName ? 'text-gray-800' : 'text-[var(--card-foreground)]'}  
                      cursor-pointer`}>{option?.themeName}</p>
                  </div>
                )}
            </div>
            }

        </section>
    )
}
export default ThemeDropDown;