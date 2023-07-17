import { View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { IconButton, Pressable } from "@react-native-material/core";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import convertToBanglaNumber from "engnumber-to-banglanumber";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullSurahAndTafsir } from "../../redux/features/fullSurah/fullSurahSlice";
import CustomText from "../../components/CustomText";
import { banglaFont, englishFont } from "../../utils/fonts";
import { FlashList } from "@shopify/flash-list";
import CustomButton from "../../components/CustomButton";
import { useWindowDimensions } from "react-native";
import * as Clipboard from "expo-clipboard";
import vibrate from "../../utils/vibratie";
import SavedAyahbutton from "../../components/quran/SavedAyahbutton";
import useGoToBackHandler from "../../hooks/useGoToBackHandler";
import AhayDetails from "../../components/quran/AhayDetails";
import ButtonAction from "../../components/quran/ButtonAction";
import { useRef } from "react";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import useTheme from "../../hooks/useTheme";
import showToast from "../../utils/showToast";
import Loader from "../../components/Loader";
import BismillahImage from "../../components/BismillahImage";
import CustomIconButton from "../../components/CustomIconButton";
import TafsirModal from "../../components/quran/TafsirModal";
import SettingsBoxModal from "../../components/quran/SettingsBoxModal";
import DownloadWarningModal from "../../components/quran/DownloadWarningModal";
import DownloadModal from "../../components/quran/DownloadModal";
import BanglaText from "../../components/quran/BanglaText";
import EnglishText from "../../components/quran/EnglishText";
import getStoragePermissions from "../../utils/getStoragePermissions";
import ArabicText from "../../components/quran/ArabicText";
import {
  setIsPlayFullSurah,
  setRepeatAyahPlaying,
} from "../../redux/features/nobleQuran/nobleQuranSlice";
import SelectBox from "../../components/SelectBox";
import CheckBoxWithLabel from "../../components/CheckBoxWithLabel";

const SingleSurah = () => {
  const isFocused = useIsFocused();
  const listRef = useRef(null);
  const pickerRef = useRef(null);
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  useGoToBackHandler(route?.params?.fromWhichScreen || "QuranHome");
  const { color } = useTheme();
  const {
    readLater,
    lastReadSurah,
    isShowAudioPlayer,
    bookmarkList,
    isPlayFullSurah,
    repeatAyahPlaying,
  } = useSelector((state) => state.nobleQuran);
  const {
    fullSurahData: fullSurahWithDetails,
    isLoading: loading,
    tafsirData: tafsir,
  } = useSelector((state) => state.fullSurahWithTafsir);

  const { surah, surahDetails } = fullSurahWithDetails || {};
  const [tafsirModal, setTafsirModal] = useState(false);
  const [settingBox, setSettingBox] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(false);
  let [currentAyah, setCurrentAyah] = useState(1);
  const [downloadWarningModal, setDownloadWarningModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [ayahInView, setAyahInView] = useState(1);
  const [isDownloadedSurah, setIsDownloadedSurah] = useState(false);
  let [numDownloadedFiles, setNumDownloadedFiles] = useState(1);
  const [isPlaySurah, setIsPlaySurah] = useState(false);
  const [soundObject, setSoundObject] = useState(null);

  const copyToClipboard = async (ayah) => {
    vibrate();
    await Clipboard.setStringAsync(`
    ${surah.verses[ayah - 1].arabic_text} ${
      surah.verses[ayah - 1].bangla_mkhan
    } ${surah.verses[ayah - 1].english_text} সূরা - ${
      surahDetails.enTranslatedName
    } আয়াত - ${convertToBanglaNumber(ayah.toString())}
    `);
    showToast("কপি করা হয়েছে।");
  };

  const downloadSurah = async () => {
    if ((await getStoragePermissions()) === false) return;
    setDownloadModal(true);

    const folderName = `surah_${surah?.id}`;
    const folderPath = `${FileSystem.documentDirectory}${folderName}`;

    let folderExists = false;
    try {
      const info = await FileSystem.getInfoAsync(folderPath);
      folderExists = info.exists;

      if (!folderExists) {
        await FileSystem.makeDirectoryAsync(folderPath, {
          intermediates: true,
        });
      }

      const length = surahDetails.totalAyah;
      const verses = surah.verses;

      for (let i = 0; i < length; i++) {
        const audioLink = verses[i].audio;
        const fileName = `ayah_${i + 1}.mp3`;
        const fileUri = `${folderPath}/${fileName}`;

        await FileSystem.downloadAsync(audioLink, fileUri);
        setNumDownloadedFiles(numDownloadedFiles++);
      }

      setIsDownloadedSurah(true);
      setDownloadModal(false);
    } catch (error) {
      showToast();
      setDownloadModal(false);
      setIsDownloadedSurah(false);
    }
  };

  const goToForward = () => {
    if (currentAyah < surahDetails.totalAyah) {
      setCurrentAyah(currentAyah + 1);
    }
  };

  const gotoBackward = () => {
    if (currentAyah > 1) {
      setCurrentAyah(currentAyah - 1);
    }
  };

  const debounceHandler = (fn) => {
    let timeoutInstance;
    return function () {
      if (timeoutInstance) {
        clearTimeout(timeoutInstance);
      }
      timeoutInstance = setTimeout(() => {
        fn();
      }, 400);
    };
  };

  const openDropdown = () => {
    pickerRef?.current?.openDropdown();
  };

  useEffect(() => {
    if (!loading && isFocused && isPlaySurah) {
      if (soundObject) {
        soundObject.playAsync();
      } else {
        const fn = async () => {
          let count = repeatAyahPlaying - 1;
          const sound = new Audio.Sound();
          const filePath = `${FileSystem.documentDirectory}surah_${surah?.id}/ayah_${currentAyah}.mp3`;

          try {
            await Audio.setAudioModeAsync({
              staysActiveInBackground: true,
            });

            await sound.loadAsync({ uri: filePath });
            setSoundObject(sound);
            sound.setOnPlaybackStatusUpdate(async (status) => {
              if (status.didJustFinish) {
                if (count) {
                  await sound.replayAsync();
                  count--;
                } else {
                  if (currentAyah == surahDetails.totalAyah) {
                    setIsPlaySurah(false);
                    setSoundObject(null);
                  } else {
                    if (isPlayFullSurah) {
                      goToForward();
                    } else {
                      setIsPlaySurah(false);
                      setSoundObject(null);
                    }
                  }
                }
              }
            });
            await sound.playAsync();
          } catch (error) {
            showToast();
          }
        };
        fn();
      }
    }
  }, [isFocused, isPlaySurah, loading, currentAyah, soundObject]);

  useEffect(() => {
    if (!loading && isFocused && surah) {
      const fn = async () => {
        const folderName = `surah_${surah?.id}`;
        const folderPath = `${FileSystem.documentDirectory}${folderName}`;

        let folderExists = false;
        try {
          const info = await FileSystem.getInfoAsync(folderPath);
          folderExists = info.exists;
        } catch (error) {
          setIsDownloadedSurah(false);
          showToast();
        }

        let files = [];

        if (folderExists) {
          try {
            files = await FileSystem.readDirectoryAsync(folderPath);
          } catch (error) {
            setIsDownloadedSurah(false);
            showToast();
          }
        }

        if (folderExists && files.length === surahDetails.totalAyah) {
          setIsDownloadedSurah(true);
        } else if (folderExists && files.length !== surahDetails.totalAyah) {
          await FileSystem.deleteAsync(folderPath, { idempotent: true });
          setIsDownloadedSurah(false);
        }

        if (files.length < surahDetails.totalAyah) {
          setIsDownloadedSurah(false);
        }
      };
      fn();
    }
  }, [loading, isFocused]);

  useEffect(() => {
    if (route?.params?.fromWhichScreen === "Bookmark") {
      setCurrentAyah(route?.params?.ayahNumber);
    } else if (!loading && readLater && readLater[surah?.id]) {
      setCurrentAyah(readLater[surah?.id]);
    }
  }, [loading, route?.params?.fromWhichScreen]);

  useEffect(() => {
    setCurrentAyah(1);
    if (route?.params?.surahNumber) {
      dispatch(getFullSurahAndTafsir(route.params.surahNumber));
    } else {
      dispatch(getFullSurahAndTafsir(lastReadSurah));
    }
  }, [
    route?.params?.surahNumber,
    route?.params?.fromWhichScreen,
    route?.params?.ayahNumber,
  ]);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setAudioPlayer(false);
      setDownloadWarningModal(false);
      setTafsirModal(false);
      setDownloadModal(false);
      setIsDownloadedSurah(false);
      setNumDownloadedFiles(1);
      setIsPlaySurah(false);
      if (isPlaySurah) {
        const fn = async () => {
          if (soundObject) {
            await soundObject.unloadAsync();
          }
        };
        fn();
      }
      setSoundObject(null);
    }
  }, [isFocused]);

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollToIndex({
        animated: true,
        index: currentAyah - 1,
        viewPosition: -0.012,
      });
    }
  }, [currentAyah]);

  useEffect(() => {
    const fn = async () => {
      if (soundObject) {
        try {
          await soundObject.unloadAsync();
          setSoundObject(null);
        } catch (error) {
          setIsPlaySurah(false);
          setSoundObject(null);
        }
      }
    };
    fn();
  }, [currentAyah]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    setAyahInView((prevState) => {
      if (
        viewableItems[0]?.item?.id &&
        viewableItems[0].item?.id != prevState
      ) {
        return viewableItems[0]?.item?.id;
      }
      return prevState;
    });
  };

  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const { page, juz, ruku, manzil } = surah?.verses[ayahInView - 1] || {};

  return (
    <View style={{ flex: 1 }} className="relative">
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="flex flex-row items-center justify-between"
      >
        <View>
          <IconButton
            icon={(props) => (
              <Ionicon
                name="arrow-back-outline"
                {...props}
                size={30}
                color={color.txtColor}
              />
            )}
            onPress={() => {
              vibrate();
              navigation.navigate("QuranHome");
            }}
          />
        </View>
        <View>
          {!loading && surah && surahDetails && (
            <>
              <View className="flex flex-row items-start justify-center gap-1">
                <CustomText
                  className="text-sm text-center"
                  style={englishFont.banglaRegular}
                >
                  {surahDetails?.arabicInBangla}
                </CustomText>
                <CustomText className="text-sm text-center">
                  {surahDetails?.banglaName}
                </CustomText>
              </View>
              <View className="flex items-center">
                <View className="flex flex-row gap-2">
                  <View className="flex flex-row items-center">
                    <CustomText className="text-xs">সূরা - </CustomText>
                    <CustomText className="text-xs">
                      {convertToBanglaNumber(surahDetails?.id.toString())}
                    </CustomText>
                  </View>
                  <View className="flex flex-row items-center">
                    <CustomText className="text-xs">আয়াত - </CustomText>
                    <CustomText className="text-xs">
                      {convertToBanglaNumber(
                        surahDetails?.totalAyah.toString()
                      )}
                    </CustomText>
                  </View>
                  {route.params?.fromWhichScreen === "Bookmark" ? (
                    <View>
                      {bookmarkList &&
                        bookmarkList[
                          `${surahDetails.id}:${route.params?.ayahNumber}`
                        ] && (
                          <View>
                            <View className="flex flex-row items-center">
                              <CustomText
                                className="text-xs font-bold"
                                style={{ color: color.activeIconColor }}
                              >
                                আয়াত নং -{" "}
                              </CustomText>
                              <CustomText
                                className="text-xs font-bold"
                                style={{ color: color.activeIconColor }}
                              >
                                {convertToBanglaNumber(
                                  route.params?.ayahNumber.toString()
                                )}
                              </CustomText>
                            </View>
                          </View>
                        )}
                    </View>
                  ) : (
                    <View>
                      {readLater[surahDetails.id] && (
                        <View className="flex flex-row items-center">
                          <CustomText
                            className="text-xs font-bold"
                            style={{ color: color.activeIconColor }}
                          >
                            সর্বশেষ পঠিত -{" "}
                          </CustomText>
                          <CustomText
                            className="text-xs font-bold"
                            style={{ color: color.activeIconColor }}
                          >
                            {convertToBanglaNumber(
                              readLater[surahDetails.id].toString()
                            )}
                          </CustomText>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
              {page && (
                <View className="flex flex-row items-center justify-center my-0.5">
                  <CustomButton
                    uniqueColor
                    title={`পৃষ্ঠা-${convertToBanglaNumber(page.toString())}`}
                  />
                  <CustomButton
                    uniqueColor
                    title={`পারা-${convertToBanglaNumber(juz.toString())}`}
                  />
                  <CustomButton
                    uniqueColor
                    title={`রুকু-${convertToBanglaNumber(ruku.toString())}`}
                  />
                  <CustomButton
                    uniqueColor
                    title={`মঞ্জিল-${convertToBanglaNumber(manzil.toString())}`}
                  />
                </View>
              )}
            </>
          )}
        </View>
        <View>
          <IconButton
            icon={(props) => (
              <Ionicon
                name="settings-outline"
                {...props}
                size={22}
                color={color.txtColor}
              />
            )}
            onPress={() => {
              vibrate();
              setSettingBox(true);
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {loading && (
          <View className="w-full h-full flex items-center justify-center">
            <Loader />
          </View>
        )}
        <>
          {!loading && surah && surahDetails && (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, width: "100%" }}>
                <FlashList
                  ref={listRef}
                  data={surah?.verses}
                  showsVerticalScrollIndicator={false}
                  initialScrollIndex={currentAyah - 1}
                  renderItem={({ item }) => {
                    const {
                      id,
                      bangla_mkhan,
                      english_text,
                      arabic_text,
                      page,
                      colorText,
                      is_sajdah_ayat,
                      juz,
                      ruku,
                      manzil,
                    } = item || {};
                    return (
                      <View
                        style={{
                          paddingBottom:
                            id === surahDetails.totalAyah ? height / 1.4 : 0,
                        }}
                      >
                        {surah?.id !== 1 && id === 1 && (
                          <>
                            <View className="flex items-center mt-1">
                              <View className="h-10 w-[60%]">
                                <BismillahImage />
                              </View>
                            </View>
                          </>
                        )}

                        <View
                          style={{
                            backgroundColor: color.bgColor1,
                          }}
                          className="py-1 px-0.5"
                        >
                          <View className="flex flex-row justify-center flex-wrap">
                            <CustomButton
                              uniqueColor={true}
                              title={`আয়াত-${convertToBanglaNumber(
                                id.toString()
                              )}`}
                            />
                            <AhayDetails
                              page={page}
                              juz={juz}
                              ruku={ruku}
                              manzil={manzil}
                              id={id}
                              surahNumber={surah.id}
                            />
                            {is_sajdah_ayat && (
                              <CustomIconButton title={"সিজদাহ আয়াত"} />
                            )}
                            <SavedAyahbutton
                              surahNumber={surah?.id}
                              ayahNumber={id}
                            />
                          </View>
                        </View>

                        <View className="p-3">
                          <ArabicText
                            arabic_text={arabic_text}
                            colorText={colorText}
                          />

                          <BanglaText text={bangla_mkhan} />

                          <EnglishText text={english_text} />
                        </View>

                        <ButtonAction
                          copyToClipboard={copyToClipboard}
                          id={id}
                          surahNumber={surah?.id}
                          tafsir={tafsir}
                          setTafsirModal={setTafsirModal}
                          arabic_text={arabic_text}
                          bangl_text={bangla_mkhan}
                        />
                      </View>
                    );
                  }}
                  estimatedItemSize={400}
                  onViewableItemsChanged={onViewableItemsChanged}
                />
              </View>
            </View>
          )}
        </>
      </View>
      {tafsir && (
        <TafsirModal
          setTafsirModal={setTafsirModal}
          tafsir={tafsir}
          tafsirModal={tafsirModal}
        />
      )}
      {settingBox && <SettingsBoxModal setSettingBox={setSettingBox} />}
      {!loading && surah && surahDetails && (
        <>
          {isShowAudioPlayer && (
            <>
              <View
                className={`absolute ${
                  audioPlayer ? "bottom-[0]" : "bottom-[-185]"
                } right-0 w-full py-2`}
                style={{
                  backgroundColor: color.bgColor1,
                  borderTopWidth: 6,
                  borderColor: color.activeIconColor,
                  borderRadius: 10,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderRightWidth: 0.0001,
                  borderLeftWidth: 0.0001,
                  borderBottomWidth: 0.0001,
                }}
              >
                <View className="w-full absolute top-[-20] flex items-center justify-center z-10">
                  <View
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: color.bgColor2,
                      borderWidth: 2,
                      borderColor: color.activeIconColor,
                      overflow: "hidden",
                    }}
                  >
                    <Pressable
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="flex items-center justify-center"
                      onPress={() => {
                        vibrate();
                        setAudioPlayer(!audioPlayer);
                      }}
                    >
                      <Ionicon
                        name="chevron-up-outline"
                        size={22}
                        color={color.activeIconColor}
                        className={`${audioPlayer ? "rotate-180" : "rotate-0"}`}
                      />
                    </Pressable>
                  </View>
                </View>
                <View className="w-full flex items-center mt-2">
                  <View className=" flex flex-row gap-3">
                    <View
                      className="rounded-full overflow-hidden"
                      style={{ width: 40, height: 40 }}
                    >
                      <Pressable
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={debounceHandler(gotoBackward)}
                      >
                        <Ionicon
                          name="play-back"
                          size={28}
                          color={color.activeIconColor}
                          className="mr-1"
                        />
                      </Pressable>
                    </View>
                    {isDownloadedSurah ? (
                      <View>
                        {isPlaySurah ? (
                          <View
                            className="rounded-full overflow-hidden"
                            style={{ width: 40, height: 40 }}
                          >
                            <Pressable
                              className=""
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onPress={async () => {
                                setIsPlaySurah(false);
                                if (soundObject) {
                                  await soundObject.pauseAsync();
                                }
                              }}
                            >
                              <Ionicon
                                name="pause"
                                size={28}
                                color={color.activeIconColor}
                              />
                            </Pressable>
                          </View>
                        ) : (
                          <View
                            className="rounded-full overflow-hidden"
                            style={{ width: 40, height: 40 }}
                          >
                            <Pressable
                              className=""
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onPress={() => {
                                setCurrentAyah(ayahInView);
                                listRef.current.scrollToIndex({
                                  animated: true,
                                  index: ayahInView - 1,
                                });
                                setIsPlaySurah(true);
                              }}
                            >
                              <Ionicon
                                name="play"
                                size={28}
                                color={color.activeIconColor}
                                className="ml-1"
                              />
                            </Pressable>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        <View
                          className="rounded-full overflow-hidden"
                          style={{ width: 40, height: 40 }}
                        >
                          <Pressable
                            className=""
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onPress={() => {
                              setDownloadWarningModal(true);
                            }}
                          >
                            <FontAwesome
                              name="download"
                              size={23}
                              color={color.activeIconColor}
                            />
                          </Pressable>
                        </View>
                      </View>
                    )}
                    <View
                      className="rounded-full overflow-hidden"
                      style={{ width: 40, height: 40 }}
                    >
                      <Pressable
                        className=""
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={debounceHandler(goToForward)}
                      >
                        <Ionicon
                          name="play-forward"
                          size={28}
                          color={color.activeIconColor}
                          className="ml-1"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <>
                  <View className="w-full flex flex-row items-center justify-between px-2">
                    <CustomText
                      className="font-bold"
                      style={[{ color: color.activeIconColor }]}
                    >
                      {convertToBanglaNumber(currentAyah.toString())}
                    </CustomText>
                    <CustomText
                      className="font-bold"
                      style={[{ color: color.activeIconColor }]}
                    >
                      {convertToBanglaNumber(surahDetails.totalAyah.toString())}
                    </CustomText>
                  </View>
                  <View className="px-2">
                    <Slider
                      disabled={!audioPlayer}
                      value={currentAyah}
                      minimumValue={1}
                      maximumTrackTintColor={color.maximumTintColor}
                      minimumTrackTintColor={color.activeIconColor}
                      maximumValue={surahDetails.totalAyah}
                      thumbStyle={{ backgroundColor: color.activeIconColor }}
                      thumbTouchSize={{ width: 50, height: 50 }}
                      step={1}
                      trackStyle={{ height: 6 }}
                      onSlidingComplete={(value) => {
                        setCurrentAyah(value[0]);
                      }}
                    />
                  </View>
                </>
                <CheckBoxWithLabel
                  actionName={setIsPlayFullSurah}
                  label="সম্পূর্ণ সুরা শুনুন"
                  value={isPlayFullSurah}
                />

                <View className="my-2">
                  <Pressable onPress={openDropdown}>
                    <View className="flex flex-row justify-between items-center px-[10px] my-3">
                      <CustomText
                        style={[
                          banglaFont.banglaRegular,
                          { fontWeight: "bold" },
                        ]}
                      >
                        আয়াত পুনরাবৃত্তি করুন
                      </CustomText>
                      <SelectBox
                        ref={pickerRef}
                        data={data}
                        dropdownWidth={70}
                        dropdownHeight={500}
                        defaultValue={repeatAyahPlaying}
                        onSelect={(selectedItem) => {
                          dispatch(setRepeatAyahPlaying(+selectedItem));
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                          return convertToBanglaNumber(selectedItem.toString());
                        }}
                        rowTextForSelection={(item) => {
                          return convertToBanglaNumber(item.toString());
                        }}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>

              <>
                <DownloadWarningModal
                  downloadSurah={downloadSurah}
                  downloadWarningModal={downloadWarningModal}
                  setDownloadWarningModal={setDownloadWarningModal}
                />
              </>

              <>
                <DownloadModal
                  downloadModal={downloadModal}
                  numDownloadedFiles={numDownloadedFiles}
                  totalAyah={surahDetails?.totalAyah}
                />
              </>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default SingleSurah;
