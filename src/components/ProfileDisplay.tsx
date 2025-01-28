import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ProfileData } from "./ProfileForm";

const ProfileDisplay = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setResumeFile(file);
    toast({
      title: "Success",
      description: "Resume uploaded successfully",
    });
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 slide-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
          <p className="mt-2 text-gray-600">Review your professional details</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Full Name</h3>
            <p className="mt-1 text-gray-600">{profileData.name}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
            <p className="mt-1 text-gray-600">{profileData.skills}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">Experience</h3>
            <p className="mt-1 text-gray-600">{profileData.experience}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">Availability</h3>
            <p className="mt-1 text-gray-600">{profileData.availability}</p>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Resume</h3>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => document.getElementById("resume-upload")?.click()}
                variant="outline"
              >
                {resumeFile ? "Change Resume" : "Upload Resume"}
              </Button>
              {resumeFile && (
                <span className="text-sm text-gray-600">
                  {resumeFile.name}
                </span>
              )}
            </div>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;