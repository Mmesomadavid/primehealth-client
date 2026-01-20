
import PrimaryLogo from "../assets/smallLogo.svg";
import SecondaryLogo from "../assets/smallLogo2.svg";

interface LogoProps {
  variant?: "primary" | "secondary";
}

const Logo = ({ variant = "primary" }: LogoProps) => {
  return (
    <div className="flex items-center justify-center">
      {variant === "primary" ? (
        <img src={PrimaryLogo} alt="Logo" className="h-10 w-auto" />
      ) : (
        <img src={SecondaryLogo} alt="Logo" className="h-10 w-auto" />
      )}
    </div>
  );
};

export default Logo;
