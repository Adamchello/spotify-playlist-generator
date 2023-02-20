export type ResponseAPI<Data> =
  | { status: 'success'; data: Data; error?: never }
  | { status: 'error'; data?: never; error: string };
