import { ResponseAPI } from '../types';

type User = { email: string; id: string };

export type CreateUserResponseAPI = ResponseAPI<User>;
