import { useDispatch, useSelector } from "react-redux";
import vibrate from "../../utils/vibratie";
import useTheme from "../../hooks/useTheme";
import {
  setReadLater,
  setLastReadSurah,
} from "../../redux/features/nobleQuran/nobleQuranSlice";
import showToast from "../../utils/showToast";
import CustomIconButton2 from "../CustomIconButton2";
import FontAwesomeIcon from "../FontAwesomeIcon";

const SaveToReadLater = ({ surahNumber, ayahNumber }) => {
  const dispatch = useDispatch();
  const { color } = useTheme();
  const { readLater, lastReadSurah } = useSelector((state) => state.nobleQuran);

  const saveToReadlater = async (surah, ayah) => {
    vibrate();

    let nobleQuranLocal;
    if (!readLater) {
      nobleQuranLocal = {
        lastRead: null,
        readLater: {},
      };
    } else {
      nobleQuranLocal = {
        lastRead: lastReadSurah,
        readLater: JSON.parse(JSON.stringify(readLater)),
      };
    }

    if (
      nobleQuranLocal.readLater[surah] &&
      nobleQuranLocal.readLater[surah] == ayah
    ) {
      delete nobleQuranLocal.readLater[surah];
      nobleQuranLocal.lastRead =
        Object.keys(nobleQuranLocal.readLater)[
          Object.keys(nobleQuranLocal.readLater).length - 1
        ] || null;

      showToast("Removed From Read Later");
    } else {
      nobleQuranLocal.readLater = {
        ...nobleQuranLocal.readLater,
        [surah]: ayah,
      };
      nobleQuranLocal.lastRead = surah;
      showToast("Saved to Read Later");
    }

    dispatch(setReadLater({ ...nobleQuranLocal.readLater }));
    dispatch(setLastReadSurah(nobleQuranLocal.lastRead));
  };
  return (
    <>
      <CustomIconButton2
        style={{
          borderWidth: 1,
          borderColor: color.txtColor,
          borderRadius: 5,
        }}
        onPress={() => saveToReadlater(surahNumber, ayahNumber)}
      >
        <FontAwesomeIcon
          name={
            readLater[surahNumber] && readLater[surahNumber] == ayahNumber
              ? "trash"
              : "save"
          }
          solid={true}
          color={color.txtColor}
          size={13}
        />
      </CustomIconButton2>
    </>
  );
};

export default SaveToReadLater;
