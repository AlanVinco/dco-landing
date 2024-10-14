import React from "react";

const VisitCount = ({ num }) => {
    const digits = num.toString().split("");

    return (
        <div className="flex space-x-2 font-bold">
            {digits.map((digit, index) => (
                <kbd key={index} className="kbd card glass text-white">
                    {digit}
                </kbd>
            ))}
        </div>
    );
};

export default VisitCount;
