import React, { useState } from "react";
import Chevron from "./chevron"

function Accordion(props) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0");
    const [setRotate, setRotateState] = useState("accordion-icon");
    const [setRotate45, setRotateState45] = useState("accordion-icon");

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0" : `10000px`);
        setRotateState(setActive === "active" ? "accordion-icon" : "accordion-icon rotate");
        setRotateState45(setActive === "active" ? "accordion-icon" : "accordion-icon rotate-45");
    }

    return (
        <div className={props.active ? "accordion-section" : "accordion-section disabled"}>
            <button className={`accordion ${setActive}`} onClick={props.active ? toggleAccordion : null}>
                <p className="accordion-title">{props.title}</p>
                {props.plus ? <i className={`${setRotate45} bi bi-plus`}></i> :
                    <Chevron className={`${setRotate}`} width={13} fill={props.active ? "#EC407A" : "#929292"} />
                }
            </button>
            <div style={{maxHeight: `${setHeight}`}} className="accordion-content">
                <div className="accordion-text" >{props.content}</div>
            </div>
        </div>
    );
}

export default Accordion;
