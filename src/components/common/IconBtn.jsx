import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outLine = false,
    customClasses,
    type,
}) => {
    return (                                                
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className= {` ${customClasses} text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-500 text-black hover:scale-95 transition-all duration-200 flex items-center gap-1`}
        >{
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }</button>
    )
}

export default IconBtn