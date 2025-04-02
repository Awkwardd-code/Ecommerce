const ProgressSteps = ({ step1, step2, step3 }) => {
    return (
        <div className="flex justify-center items-center space-x-6">
        {/* Step 1: Login */}
        <div className="flex flex-col items-center">
          <span className={`${step1 ? "text-green-500" : "text-gray-400"} text-lg font-semibold`}>
            Login
          </span>
          <div className="mt-2 text-2xl">{step1 ? "✅" : "⬜"}</div>
        </div>
      
        {/* Line Between Steps */}
        {step2 && <div className="h-0.5 w-16 bg-green-500"></div>}
      
        {/* Step 2: Shipping */}
        <div className="flex flex-col items-center">
          <span className={`${step2 ? "text-green-500" : "text-gray-400"} text-lg font-semibold`}>
            Shipping
          </span>
          <div className="mt-2 text-2xl">{step2 ? "✅" : "⬜"}</div>
        </div>
      
        {/* Line Between Steps */}
        {step3 && <div className="h-0.5 w-16 bg-green-500"></div>}
      
        {/* Step 3: Summary */}
        <div className="flex flex-col items-center">
          <span className={`${step3 ? "text-green-500" : "text-gray-400"} text-lg font-semibold`}>
            Summary
          </span>
          <div className="mt-2 text-2xl">{step3 ? "✅" : "⬜"}</div>
        </div>
      </div>
      
    );
};

export default ProgressSteps;