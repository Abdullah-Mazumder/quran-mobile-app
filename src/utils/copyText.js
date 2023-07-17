import * as Clipboard from "expo-clipboard";

export default async function (text) {
  await Clipboard.setStringAsync(text);
}
