import { LOGO_SRC } from "./brand";

export async function enableNotifications() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    throw new Error("Notifications are not supported in this browser.");
  }
  const perm = await Notification.requestPermission();
  if (perm !== "granted") throw new Error("Permission denied. Enable notifications in the browser settings.");
  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.ready.catch(() => null);
    if (reg?.showNotification) {
      await reg.showNotification("Pakistan Tests Hub", {
        body: "Alerts for jobs, roll slips and saved tests will appear here.",
        icon: LOGO_SRC,
        badge: LOGO_SRC,
        tag: "pth-welcome",
        data: { url: "/alerts" },
      });
      return;
    }
  }
  new Notification("Pakistan Tests Hub", { body: "Notifications on. Alerts stay on this device.", icon: LOGO_SRC });
}

export function notifyLocal(title: string, body: string, url = "/alerts") {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((reg) => reg.showNotification(title, { body, icon: LOGO_SRC, data: { url } }))
      .catch(() => new Notification(title, { body, icon: LOGO_SRC }));
    return;
  }
  new Notification(title, { body, icon: LOGO_SRC });
}
