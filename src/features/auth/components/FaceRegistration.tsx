import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { useFaceRegister } from "../hooks";
import styles from "./FaceRegistration.module.css";
import { Camera, RefreshCw, Check } from "lucide-react";

interface FaceRegistrationProps {
  userId: string;
  isAdmin?: boolean;
  onSuccess?: () => void;
}

export function FaceRegistration({
  userId,
  isAdmin = false,
  onSuccess,
}: FaceRegistrationProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { mutate: registerFace, isPending } = useFaceRegister();

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const confirm = async () => {
    if (!imgSrc) return;

    // Convert base64 to File
    const res = await fetch(imgSrc);
    const blob = await res.blob();
    const file = new File([blob], "face-capture.jpg", { type: "image/jpeg" });

    registerFace(
      { userId, file, isAdmin },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      },
    );
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Face Registration</h3>
        <p className="text-sm text-muted-foreground">
          Position your face within the oval guide and click capture
        </p>
      </div>

      {!imgSrc ? (
        <div className={styles.overlayContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={styles.webcam}
          />
          <div className={styles.guideOverlay}>
            <div className={styles.guideShape} />
          </div>
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <img src={imgSrc} alt="Captured face" className={styles.previewImage} />
        </div>
      )}

      <div className="flex gap-4 w-full max-w-[640px] justify-center">
        {!imgSrc ? (
          <Button onClick={capture} size="lg" className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Capture Photo
          </Button>
        ) : (
          <>
            <Button
              onClick={retake}
              variant="outline"
              size="lg"
              className="flex-1"
              disabled={isPending}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake
            </Button>
            <Button
              onClick={confirm}
              size="lg"
              className="flex-1"
              disabled={isPending}
            >
              {isPending ? (
                "Processing..."
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
