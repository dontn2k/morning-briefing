import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Wie Notifications angezeigt werden wenn die App offen ist
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Berechtigung anfragen
export async function requestPermissions() {
  if (!Device.isDevice && Platform.OS !== "ios") {
    // Simulator erlaubt Notifications ohne echtes Gerät
    return true;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

// Tägliche Notification planen
export async function scheduleDailyBriefing(hour, minute) {
  // Erst alle alten canceln
  await Notifications.cancelAllScheduledNotificationsAsync();

  const granted = await requestPermissions();
  if (!granted) return false;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Guten Morgen ☀️",
      body: "Dein Morning Briefing wartet auf dich.",
      sound: false,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  return true;
}

// Alle Notifications abbrechen
export async function cancelBriefingNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
