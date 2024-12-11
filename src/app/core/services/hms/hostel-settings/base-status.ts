import { BaseStatus } from "src/app/core/models/hms/hostel-settings/baseStatus";

export class BaseStatusDataService {
    BaseStatusData: BaseStatus[] = [
        { Id: 0, name: 'Active', value: 1 },
        { Id: 1, name: 'Inactive', value: 0 },
        { Id: 2, name: 'Pending', value: 2 },
        { Id: 3, name: 'Suspended', value: 3 },
    ];
}
