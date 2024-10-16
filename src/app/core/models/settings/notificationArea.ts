import { NotificationType } from "../../enums/globalEnum";

export class NotificationArea {
    notificationAreaID: number;
    notificationAreaName: string;
    notificationType: NotificationType;
    notificationBody: string;
    isActive: boolean;
    expireTime: number;
    notificationTypeName: string;
}