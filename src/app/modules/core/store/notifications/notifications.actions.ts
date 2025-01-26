import { createAction, props } from "@ngrx/store";
import { NotificationType } from "../../../../models/notification-type.enum";

export const showNotification = createAction(
    '[Notifications] Show Notification',
    props<{ notificationType: NotificationType, detail: string }>()
);
