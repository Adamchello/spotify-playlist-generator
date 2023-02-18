type User = { email: string; id: string };

export type CreateUserResponseAPI =
  | { status: 'success'; user: User; error?: never }
  | { status: 'error'; user?: never; error: string };
