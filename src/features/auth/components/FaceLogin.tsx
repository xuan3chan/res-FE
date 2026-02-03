import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFaceLogin } from "../hooks";
import { Loader2, RefreshCw, Camera, ArrowLeft } from "lucide-react";
import type { ChallengeType } from "../types";
import { cn } from "@/lib/utils";
import { CONSTANTS } from "@/config";
import styles from "./FaceLogin.module.css";

const CHALLENGES: { type: ChallengeType; text: string }[] = [
  { type: "BLINK", text: "Please blink twice" },
  { type: "TURN_HEAD", text: "Turn your head left then right" },
  { type: "OPEN_MOUTH", text: "Please open your mouth" },
];

export function FaceLogin() {
  const webcamRef = useRef<Webcam>(null);
  const [challenge, setChallenge] = useState<(typeof CHALLENGES)[0] | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const { mutate: faceLogin, isPending } = useFaceLogin();

  const startChallenge = useCallback(() => {
    const randomChallenge =
      CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    setChallenge(randomChallenge);
    setIsCapturing(true);
    setProgress(0);
  }, []);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let frames: string[] = [];

    if (isCapturing && challenge) {
      const duration = 3000;
      const frameRate = 100;
      const totalFrames = duration / frameRate;

      interval = setInterval(() => {
        if (webcamRef.current) {
          const frame = webcamRef.current.getScreenshot();
          if (frame) {
            frames.push(frame);
            setProgress((frames.length / totalFrames) * 100);
          }
        }

        if (frames.length >= totalFrames) {
          clearInterval(interval);
          setIsCapturing(false);

          faceLogin({
            frames,
            challengeType: challenge.type,
            challengePassed: true,
            deviceId: "web-browser",
          });
        }
      }, frameRate);
    }

    return () => clearInterval(interval);
  }, [isCapturing, challenge, faceLogin]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-lg tracking-tight flex items-center justify-center gap-2">
          <Camera className="h-5 w-5" />
          Face Login
        </CardTitle>
        <CardDescription>
          Look at the camera and follow the instructions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={styles.webcamContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={styles.webcam}
            onUserMedia={() => setCameraReady(true)}
          />

          <div className={styles.overlay}>
            <div
              className={cn(styles.guideBox, {
                [styles.active]: isCapturing,
              })}
            />

            {challenge && isCapturing && (
              <div className={styles.challengePrompt}>{challenge.text}</div>
            )}
          </div>

          {isCapturing && (
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {isPending ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </Button>
          ) : cameraReady && !isCapturing ? (
            <Button onClick={startChallenge} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Verification
            </Button>
          ) : !cameraReady ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading camera...
            </Button>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button variant="outline" className="w-full" asChild>
          <Link to={CONSTANTS.ROUTES.LOGIN}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Password Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
