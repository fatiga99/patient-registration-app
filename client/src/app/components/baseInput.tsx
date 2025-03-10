import { BaseInputProps } from "./interfaces/iBaseInputProps";


const BaseInput: React.FC<BaseInputProps> = ({ variant = 'loginForm', className, children, ...props }) => {
    const baseStyles = 'h-[56px] bg-[#FBEEFF] backdrop-blur-[40px] focus:outline-none';

    const variants = {
        patientForm: 'p-2 border rounded-[8px] text-[16px] text-[#99879D] leading-[18.8px] font-public-sans'
    };

    const InputClasses = `${baseStyles} ${variants} ${className || ''}`.trim();

    return (
        <input className={InputClasses} {...props}>
            {children}
        </input>
    );
};

export default BaseInput;