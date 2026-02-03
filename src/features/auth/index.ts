// Public API for auth feature
// Only import from this file outside of the auth feature

// Components
export {
  LoginForm,
  RegisterForm,
  FaceRegistration,
  FaceLogin,
} from "./components";

// Hooks
export { useLogin, useRegister, useFaceRegister, useFaceLogin } from "./hooks";

// Types
export type {
  User,
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  TokenPayload,
  FaceLoginPayload,
  FaceLoginResponse,
  FaceRegistrationResponse,
} from "./types";

// API
export { authApi } from "./api";
