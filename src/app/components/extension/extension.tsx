import "./extension.css";
import type { ExtensionProps } from "./types";
import CustomSwitch from "./components/custom-switch";

const Extension = (props: ExtensionProps) => {
    const { logo, name, description, isActive, onDelete, onCheck } = { ...props };

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
                    onClick={() => onDelete(name)}
                >
                    Remove
                </button>
                <CustomSwitch checked={isActive} onClick={() => onCheck(name)} />
            </div>
        </div>
    );
}

export default Extension;