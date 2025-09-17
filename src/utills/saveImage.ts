import * as FileSystem from "expo-file-system";

export async function saveUserImage(
  userId: number,
  uri: string
): Promise<string> {
  const fileName = `user_${userId}.jpg`;
  const dest = `${FileSystem.documentDirectory}${fileName}`;

  const info = await FileSystem.getInfoAsync(dest);
  if (info.exists) {
    await FileSystem.deleteAsync(dest, { idempotent: true });
  }

  await FileSystem.copyAsync({ from: uri, to: dest });
  return dest;
}

export async function loadUserImage(userId: number): Promise<string | null> {
  const fileName = `user_${userId}.jpg`;
  const path = `${FileSystem.documentDirectory}${fileName}`;
  const info = await FileSystem.getInfoAsync(path);
  return info.exists ? path : null;
}

export async function deleteUserImage(userId: number): Promise<void> {
  const fileName = `user_${userId}.jpg`;
  const path = `${FileSystem.documentDirectory}${fileName}`;
  const info = await FileSystem.getInfoAsync(path);
  if (info.exists) {
    await FileSystem.deleteAsync(path, { idempotent: true });
  }
}
