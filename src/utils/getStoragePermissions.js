import * as MediaLibrary from "expo-media-library";

const getStoragePermissions = async () => {
  // Check if app has permission to access the media library
  const { status } = await MediaLibrary.getPermissionsAsync();
  if (status !== "granted") {
    // If permission is not granted, request permission from the user
    const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
    if (newStatus !== "granted") {
      // Permission is still not granted
      return false;
    }
  }
  return true;
};

export default getStoragePermissions;
