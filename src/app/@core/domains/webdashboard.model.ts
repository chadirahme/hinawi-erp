export class WebDashboard {

  id: number;
  userId: number;
  dashName: string;
  dashOrder: number;
  youTubeDesc: string;
  safeURL: any;
}

export class MobileAttendance {
  userId: number;
  userName: string;
  customerType: string;
  customerName: string;
  checkinNote: string;
  checkinLatitude: number;
  checkinLongitude: number;
}

export class ChequeModel {
  id: number;
}

export class HRListValues {
  id: number;
  fieldId: number;
  fieldName: string;
  description: string;
  arDescription: string;
  subId: number;
  defaultValue: string;
  required: string;
  priorityId: number;
  isEdit: string;
  notes: string;
}
