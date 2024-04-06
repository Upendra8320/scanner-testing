import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useParams } from "react-router-dom";

const QrReader = () => {
  const { id } = useParams();
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(undefined);
  const [canScan, setCanScan] = useState<boolean>(true);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    if (canScan) {
      setScannedResult(result?.data);
      alert(result.data);
    }
  };

  const onScanFail = (err: string | Error) => {};

  useEffect(() => {
    QrScanner.listCameras(true).then((cameras) => {
      setCameras(cameras);
      if (cameras.length > 0) {
        setSelectedCameraId(cameras[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (videoEl.current && cameras.length > 0 && selectedCameraId) {
      const selectedCamera = cameras.find(camera => camera.id === selectedCameraId);
      if (!scanner.current && selectedCamera) {
        scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
          onDecodeError: onScanFail,
          preferredCamera: selectedCamera.id,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          overlay: qrBoxEl.current || undefined,
          maxScansPerSecond: 25,
        });

        scanner.current.start().then(() => {
          setQrOn(true);
        }).catch((err) => {
          console.error(err);
          setQrOn(false);
        });
      } else if (scanner.current && selectedCamera) {
        scanner.current.setCamera(selectedCamera.id).catch(console.error);
      }
    }

    return () => {
      scanner?.current?.stop();
    };
  }, [selectedCameraId, cameras]);

  useEffect(() => {
    if (!qrOn) {
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.");
    }
  }, [qrOn]);

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCameraId(e.target.value);
  };

  return (
    <>
      <h1>QR Scanner</h1>
      <div className="mx-4 mt-10">
        <div className="border-gray">
          <video ref={videoEl}></video>
        </div>

        <select onChange={handleCameraChange} value={selectedCameraId} className="my-4">
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>{camera.label || `Camera ${camera.id}`}</option>
          ))}
        </select>

        <div className="my-6">
          <h1 className="text-[30px] text-center text-gray-500 font-[700]">Scan QR Code</h1>
        </div>
        <div className="text-container mx-2 px-4 py-2 rounded-[10px] shadow-3xl mb-4">
          <p className="text-[#525252d8] text-center text-[16px] font-[400] py-1">
            Please scan the QR code label on the packaging to access details and update the consumed quantity.
          </p>
        </div>
      </div>
    </>
  );
};

export default QrReader;
