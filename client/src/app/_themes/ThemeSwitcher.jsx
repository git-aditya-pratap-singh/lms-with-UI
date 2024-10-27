import {useState, useEffect} from "react";
import ThemeDropDown from "../components/FormComponents/ThemeDropDown";

const ThemeSwitcher = ()=>{

    const [themeItems, setThemeItems] = useState( JSON.parse(localStorage.getItem('theme')) || 
    {color: 'bg-[#007DFC]', themeName: 'Blue Theme', value: 'blue-theme'} );

    useEffect(() => {
        // Set the chosen theme on the root HTML element
        document.documentElement.className = themeItems?.value;
        localStorage.setItem('theme', JSON.stringify(themeItems) );
      }, [themeItems]);

    return(
        <>
        <ThemeDropDown
            value={themeItems}
            onChange={(newValue)=> setThemeItems(newValue)}
            placeholder="Select Theme"
            options={
                [
                    {color: 'bg-[#FF0026]', themeName: 'Red Theme', value: 'red-theme'}, 
                    {color: 'bg-[#007DFC]', themeName: 'Blue Theme', value: 'blue-theme'},  
                    {color: 'bg-[#2BFF8B]', themeName: 'Green Theme', value: 'green-theme'},
                    {color: 'bg-[#f78126]', themeName: 'Orange Theme', value: 'orange-theme'},
                    {color: 'bg-[#9E3DFF]', themeName: 'Violet Theme', value: 'violet-theme'}
                ]
            }
        />
        </>
    )
}
export default ThemeSwitcher;