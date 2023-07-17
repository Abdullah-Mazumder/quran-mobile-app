import { View } from "react-native";
import vibrate from "../../utils/vibratie";
import SaveToReadLater from "./SaveToReadLater";
import useTheme from "../../hooks/useTheme";
import CustomIconButton2 from "../CustomIconButton2";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { useSelector, useDispatch } from "react-redux";
import showToast from "../../utils/showToast";
import { setBookMarkList } from "../../redux/features/nobleQuran/nobleQuranSlice";

const ButtonAction = ({
  copyToClipboard,
  id,
  surahNumber,
  tafsir,
  setTafsirModal,
  bangl_text,
  arabic_text,
}) => {
  const dispatch = useDispatch();
  const { color } = useTheme();
  const { bookmarkList } = useSelector((state) => state.nobleQuran);

  const saveToBookmark = async () => {
    vibrate();
    try {
      let nobleQuranBookmarkList;
      if (!bookmarkList) {
        nobleQuranBookmarkList = {};
      } else {
        nobleQuranBookmarkList = JSON.parse(JSON.stringify(bookmarkList));
      }

      const key = `${surahNumber}:${id}`;

      if (nobleQuranBookmarkList[key]) {
        delete nobleQuranBookmarkList[key];
        showToast("Removed From Bookmark");
        dispatch(setBookMarkList(nobleQuranBookmarkList));
      } else {
        nobleQuranBookmarkList[key] = {
          surahNumber: surahNumber,
          ayahNumber: id,
          banglaTranslation: bangl_text,
          arabicText: arabic_text,
        };
        showToast("Saved to Bookmark");
        dispatch(setBookMarkList(nobleQuranBookmarkList));
      }
    } catch (error) {
      showToast();
    }
  };

  return (
    <>
      <View className="w-full flex items-center my-4">
        <View className="flex flex-row gap-2">
          <CustomIconButton2
            style={{
              borderWidth: 1,
              borderColor: color.txtColor,
              borderRadius: 5,
            }}
            onPress={() => saveToBookmark()}
          >
            <FontAwesomeIcon
              name="bookmark"
              solid={Boolean(bookmarkList[`${surahNumber}:${id}`])}
              color={color.txtColor}
              size={13}
            />
          </CustomIconButton2>
          <CustomIconButton2
            style={{
              borderWidth: 1,
              borderColor: color.txtColor,
              borderRadius: 5,
            }}
            onPress={() => copyToClipboard(id)}
          >
            <FontAwesomeIcon
              name="copy"
              solid={true}
              color={color.txtColor}
              size={13}
            />
          </CustomIconButton2>
          {tafsir[id] && (
            <CustomIconButton2
              style={{
                borderWidth: 1,
                borderColor: color.txtColor,
                borderRadius: 5,
              }}
              onPress={() => {
                setTafsirModal(id);
                vibrate();
              }}
            >
              <FontAwesomeIcon
                style={{
                  marginTop: 0.5,
                }}
                name="book-open"
                color={color.txtColor}
                size={12}
              />
            </CustomIconButton2>
          )}
          <View>
            <SaveToReadLater surahNumber={surahNumber} ayahNumber={id} />
          </View>
        </View>
      </View>
    </>
  );
};

export default ButtonAction;
