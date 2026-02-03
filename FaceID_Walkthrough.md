# FaceID Feature Walkthrough

This guide explains how to use the newly implemented FaceID features.

## Prerequisites

- Ensure you have a camera connected or accessible by your browser.
- You must allow camera permissions when prompted by the browser.

## 1. Face Registration

To register your face, you must be logged in first.

1.  Log in to the application using your email and password.
2.  Navigate to `/face-register` (or use a button/link if added to the dashboard).
3.  You will see a camera preview with an oval guide.
4.  Position your face inside the guide.
5.  Click **Capture Photo**.
6.  Preview the captured image.
    - Click **Retake** if the image is blurry or not centered.
    - Click **Confirm** to upload and register your face.
7.  Upon success, you will be redirected to the dashboard.

## 2. Face Login

To log in using your face:

1.  Make sure you are logged out.
2.  Navigate to `/face-login` (or click "Face Login" if linked on the login page).
3.  The camera will start, and you will receive a random challenge (e.g., "Please blink twice").
4.  Perform the action while looking at the camera.
5.  The system captures frames for 3 seconds.
6.  If successful, you will be logged in and redirected to the dashboard.
    - If liveness check fails, you will be asked to try again.
    - If face match is low confidence, you may be asked for additional verification (Step-Up auth - currently shows a toast info).

## Developer Notes

- **Routes**:
  - `/face-register`: Protected route for face registration.
  - `/face-login`: Public route for face login.
- **Components**:
  - `FaceRegistration`: Handles camera capture and API submission.
  - `FaceLogin`: Handles liveness challenges and frame collection.
- **API**:
  - `authApi.registerUserFace`: POST `/users/{id}/register-face`
  - `authApi.registerAdminFace`: POST `/admins/{id}/register-face`
  - `authApi.faceLogin`: POST `/auth/face-login`
