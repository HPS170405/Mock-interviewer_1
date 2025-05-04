
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface WebcamViewProps {
  onRecordingData?: (data: Blob) => void;
  isRecording?: boolean;
}

const WebcamView: React.FC<WebcamViewProps> = ({ onRecordingData, isRecording = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    // Request access to webcam when component mounts
    startCamera();
    
    // Clean up when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      stopRecording();
    };
  }, []);

  useEffect(() => {
    // Handle recording state changes
    if (isRecording) {
      startRecording();
    } else if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      stopRecording();
    }
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera and microphone. Please check permissions.");
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    
    setRecordedChunks([]);
    
    try {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorder.start(100); // Collect data in 100ms chunks
      console.log("Recording started");
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Could not start recording. Please try again.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped");
      
      // Process the recorded chunks after a short delay to ensure all data is collected
      setTimeout(() => {
        if (recordedChunks.length > 0) {
          const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
          if (onRecordingData) {
            onRecordingData(recordedBlob);
          }
          setRecordedChunks([]);
        }
      }, 200);
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="relative w-full max-w-2xl rounded-lg overflow-hidden bg-black">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-auto ${videoEnabled ? 'opacity-100' : 'opacity-50'}`}
        />
        
        {!videoEnabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">Camera Off</span>
          </div>
        )}
        
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-white text-sm">Recording</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full" 
          onClick={toggleAudio}
        >
          {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full" 
          onClick={toggleVideo}
        >
          {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default WebcamView;
