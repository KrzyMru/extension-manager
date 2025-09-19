import { useState } from "react";
import type { ExtensionProps } from "./types";
import Switch from "react-switch";

const Extension = (props: ExtensionProps) => {
    const { logo, name, description, isActive } = { ...props };
    const [active, setActive] = useState<boolean>(isActive);

    return (
        <div className="extension">
            <div className="extension__main">
                <img 
                    src={logo}
                    alt='extension logo'
                    className='extension__logo'
                />
                <div className="extension__text">
                    <h6 className="extension__name">{name}</h6>
                    <p className="extension__description">{description}</p>
                </div>
            </div>
            <div className="extension__buttons">
                <button
                    type="button"
                    title="Remove"
                    className="button button--extension"
                >
                    Remove
                </button>
                <Switch 
                    onChange={() => setActive(!active)} 
                    checked={active}                   
                />
            </div>
        </div>
    );
}

export default Extension;