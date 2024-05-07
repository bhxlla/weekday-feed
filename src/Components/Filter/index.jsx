import { useState } from "react";
import { Close, DownArrow, UpArrow } from "../../Utils/Arrows";

// A Reusable Single Filter Component in a dropdown fashion, takes various props - allOptions, selectedOptions. 
export const Filter = ({
    allOptions,
    onSelectOption,
    selectedOptions,
    placeholder,
    deleteOption,
    isSalary
}) => {

    const [show, setShow] = useState(false)

    const selectItem = item => {
        setShow(false);
        onSelectOption(item);
    }

    const allOptionsToShow = allOptions.filter(role => !selectedOptions.includes(role))

    return (
        <div className='feed-filter-box' >
            <p className='feed-filter-title' >{ selectedOptions.length > 0 ? `${placeholder}` : " " }</p>
            <div className='feed-filter' >
                <div className='feed-selection-box' >
                    {(selectedOptions.length !== 0) ? (
                        selectedOptions.map(el => (
                            <div key={el} className='feed-filter-selected-box' >
                                <p className='feed-filter-selected' >{el}{isSalary ? " LPA" :""}</p>
                                <div className='feed-filter-selected-box-cross' onClick={() => deleteOption(el)} ><Close /></div>
                            </div>
                        ))
                    ) : (
                        <p className='feed-filter-placeholder' >{placeholder}</p>
                    )}
                </div>

                <div className='filter-arrow' onClick={() => setShow(value => !value)} > { show ? <UpArrow /> : <DownArrow />}</div>
                {show && (
                    <div className='filter-options' >
                        {allOptionsToShow.map(item => (
                            <p key={item} onClick={() => selectItem(item)} >{item}{isSalary ? " LPA" :""}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}