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
        icon: "/logo.png?v=3",
        badge: "/logo.png?v=3",
        tag: "pth-welcome",
        data: { url: "/alerts" },
      });
      return;
    }
  }
  new Notification("Pakistan Tests Hub", { body: "Notifications on. Alerts stay on this device.", icon: "/logo.png?v=3" });
}

export function notifyLocal(title: string, body: string, url = "/alerts") {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((reg) => reg.showNotification(title, { body, icon: "/logo.png?v=3", data: { url } }))
      .catch(() => new Notification(title, { body, icon: "/logo.png?v=3" }));
    return;
  }
  new Notification(title, { body, icon: "/logo.png?v=3" });
}
