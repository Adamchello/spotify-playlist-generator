export type CreateUserResponseAPI =
  | { ok: true; user: { email: string; id: string } }
  | { ok: false; error: string };
