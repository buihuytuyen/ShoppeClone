export const PurchaseStatus = {
  InCart: -1,
  All: 0,
  WaitForConfirmation: 1,
  WaitForGetting: 2,
  InProgress: 3,
  Delivered: 4,
  Cancelled: 5
} as const;
