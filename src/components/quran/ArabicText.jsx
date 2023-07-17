import { useSelector } from "react-redux";
import CustomText from "../CustomText";
import TajweedVerse from "./TajweedVerse";

const ArabicText = ({ colorText, arabic_text }) => {
  const { isEnableTajweed } = useSelector((state) => state.nobleQuran);
  return (
    <CustomText
      className={`px-0.5 mb-2 ${arabic_text.length > 120 ? "text-center" : ""}`}
    >
      <TajweedVerse
        verse={isEnableTajweed ? colorText : arabic_text}
        config={{}}
      />
    </CustomText>
  );
};

export default ArabicText;
