import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export interface ProfileData {
  name: string;
  skills: string;
  experience: string;
  availability: string;
}

const ProfileForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    skills: "",
    experience: "",
    availability: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.skills || !formData.experience || !formData.availability) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("profileData", JSON.stringify(formData));
    toast({
      title: "Success",
      description: "Profile data saved successfully",
    });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 slide-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Profile</h2>
          <p className="mt-2 text-gray-600">Fill in your professional details</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="mt-1"
                placeholder="React, Node.js, TypeScript..."
              />
            </div>

            <div>
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="mt-1"
                placeholder="Describe your professional experience..."
              />
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="mt-1"
                placeholder="Full-time, Part-time, etc."
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;