import { useSelector } from "react-redux";
import CustomIconButton from "../CustomIconButton";

const SavedAyahbutton = ({ surahNumber, ayahNumber }) => {
  const { readLater } = useSelector((state) => state.nobleQuran);
  return (
    <>
      {readLater[surahNumber] && readLater[surahNumber] === ayahNumber && (
        <CustomIconButton title="সর্বশেষ পঠিত" />
      )}
    </>
  );
};

export default SavedAyahbutton;
