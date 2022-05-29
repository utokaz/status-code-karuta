export type statusCodeClassficationValueType =
  typeof statusCodeClassfication[keyof typeof statusCodeClassfication];

export const statusCodeClassfication = {
  information: "1",
  success: "2",
  redirect: "3",
  clientError: "4",
  serverError: "5",
} as const;
