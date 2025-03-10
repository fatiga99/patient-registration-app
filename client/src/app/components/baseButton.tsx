import { BaseButtonProps } from "./interfaces/iBaseButtonProps";


const BaseButton: React.FC<BaseButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
    const baseStyles = 'cursor-pointer rounded-[60px] transition-colors font-public-sans font-medium text-[18px] leading-[21.15px] w-[263px] h-[59px]';

    const variants = {
        primary: 'bg-[#9378FF] hover:bg-purple-600  text-white',
        back: 'bg-transparent text-[#9378FF] hover:bg-[#9378FF] hover:text-white'
    };

    const buttonClasses = `${baseStyles} ${variants[variant]} ${className || ''}`.trim();

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default BaseButton;
