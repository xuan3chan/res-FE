import type { User } from "./auth.types";

export type ChallengeType =
  | "BLINK"
  | "TURN_HEAD"
  | "OPEN_MOUTH"
  | "READ_NUMBER";

export type FaceLoginDecision = "LOGIN_SUCCESS" | "REQUIRE_STEP_UP" | "DENY";

export interface FaceLoginPayload {
  frames: string[];
  challengeType: ChallengeType;
  challengePassed: boolean;
  deviceId?: string;
}

export interface FaceLoginResponse {
  success: boolean;
  decision: FaceLoginDecision;
  accessToken?: string;
  user?: User;
  // Legacy fields for backward compatibility
  userId?: string;
  userName?: string;
  role?: string;
  isLive: boolean;
  livenessScore: number;
  similarity?: number;
  distance?: number;
  message: string;
}

export interface FaceRegistrationResponse {
  id: string;
  email: string;
  username: string;
  name: string;
  isActive: boolean;
  hasFaceRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
