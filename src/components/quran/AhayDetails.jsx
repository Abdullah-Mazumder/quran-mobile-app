import { useSelector } from "react-redux";
import CustomIconButton from "../CustomIconButton";

const AhayDetails = ({ page, juz, ruku, manzil, id, surahNumber }) => {
  const { bookmarkList } = useSelector((state) => state.nobleQuran);
  return (
    <>
      {bookmarkList && bookmarkList[`${surahNumber}:${id}`] && (
        <CustomIconButton title={"বুকমার্ক করা"} />
      )}
    </>
  );
};

export default AhayDetails;
