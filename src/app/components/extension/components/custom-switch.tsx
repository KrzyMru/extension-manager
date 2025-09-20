import "./custom-switch.css";
import { useContext, useEffect, useState } from "react";
import hslToHex from "../utils/hsl-to-hex";
import Switch from "react-switch";
import { ThemeContext } from "../../../../contexts/theme-context/theme-context";

const CustomSwitch = ({ checked, onClick }: { checked: boolean, onClick: () => void }) => {
    const { theme } = useContext(ThemeContext);
    const [colors, setColors] = useState({ on: "", off: "" });

    useEffect(() => {
        // This needs to wait until theme is applied, to not grab past styles
        requestAnimationFrame(() => {
            const rootStyles = getComputedStyle(document.documentElement);
            const onColor = rootStyles.getPropertyValue('--switch-color-active').trim();
            const offColor = rootStyles.getPropertyValue('--switch-color-inactive').trim();
            setColors({ on: hslToHex(onColor), off: hslToHex(offColor) });
        });
    }, [theme]);

    return (
        <Switch
            onChange={onClick} 
            checked={checked}  
            height={20}
            width={40}
            handleDiameter={16}
            checkedIcon={false}
            uncheckedIcon={false} 
            onColor={colors.on}  
            offColor={colors.off}              
        />
    );
}

export default CustomSwitch;