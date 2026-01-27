"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { SignaturePad } from "./signature-pad";
import { FileUpload } from "./file-upload";
import { ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

type OrgAddPatientProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

type Step = 1 | 2 | 3 | 4;

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bloodType: string;
  emergencyContact: string;
  emergencyPhone: string;
  physician: string;
  profilePicture: File | null;
  passport: File | null;
  signature: string | null;
};

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

const COUNTRY_CODES = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+234", country: "Nigeria" },
  { code: "+254", country: "Kenya" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+39", country: "Italy" },
  { code: "+61", country: "Australia" },
];

const BLOOD_TYPES = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

export function OrgAddPatients({
  open,
  onOpenChange,
  onSuccess,
}: OrgAddPatientProps) {
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+234",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bloodType: "",
    emergencyContact: "",
    emergencyPhone: "",
    physician: "",
    profilePicture: null,
    passport: null,
    signature: null,
  });

  // Fetch doctors on mount
  useEffect(() => {
    if (open) {
      fetchDoctors();
    }
  }, [open]);

  const fetchDoctors = async () => {
    try {
      setDoctorsLoading(true);
      const response = await fetch("/api/org/doctor");
      if (response.ok) {
        const data = await response.json();
        setDoctors(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setDoctorsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", `${formData.countryCode}${formData.phone}`);
      submitData.append("dateOfBirth", formData.dateOfBirth);
      submitData.append("gender", formData.gender);
      submitData.append("address", formData.address);
      submitData.append("city", formData.city);
      submitData.append("state", formData.state);
      submitData.append("zipCode", formData.zipCode);
      submitData.append("bloodType", formData.bloodType);
      submitData.append("emergencyContact", formData.emergencyContact);
      submitData.append("emergencyPhone", formData.emergencyPhone);
      submitData.append("physicianId", formData.physician);

      if (formData.profilePicture) {
        submitData.append("profilePicture", formData.profilePicture);
      }
      if (formData.passport) {
        submitData.append("passport", formData.passport);
      }
      if (formData.signature) {
        submitData.append("signature", formData.signature);
      }

      const response = await fetch("/api/org/patients", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        onSuccess?.();
        onOpenChange(false);
        setStep(1);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          countryCode: "+234",
          dateOfBirth: "",
          gender: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          bloodType: "",
          emergencyContact: "",
          emergencyPhone: "",
          physician: "",
          profilePicture: null,
          passport: null,
          signature: null,
        });
      }
    } catch (error) {
      console.error("Failed to add patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (step > 1 || Object.values(formData).some((v) => v !== null && v !== "")) {
      setShowExitDialog(true);
    } else {
      onOpenChange(false);
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: "Personal Information",
      2: "Medical Details",
      3: "Documents",
      4: "Review & Sign",
    };
    return titles[step];
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {step > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <DialogTitle>Add New Patient</DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Step {step} of 4: {getStepTitle()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-2xl text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex gap-2 mt-4">
              {([1, 2, 3, 4] as const).map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={cn(
                      "h-2 flex-1 rounded-full transition-colors",
                      s <= step ? "bg-blue-600" : "bg-slate-200"
                    )}
                  />
                </div>
              ))}
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pb-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) =>
                        handleInputChange("countryCode", value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((item) => (
                          <SelectItem key={item.code} value={item.code}>
                            {item.code} {item.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      placeholder="901234567"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="flex-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input
                      id="zip"
                      placeholder="Zip code"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blood">Blood Type *</Label>
                    <Select
                      value={formData.bloodType}
                      onValueChange={(value) =>
                        handleInputChange("bloodType", value)
                      }
                    >
                      <SelectTrigger id="blood">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOOD_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medical Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="physician">Assigned Physician *</Label>
                  {doctorsLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <Select
                      value={formData.physician}
                      onValueChange={(value) =>
                        handleInputChange("physician", value)
                      }
                    >
                      <SelectTrigger id="physician">
                        <SelectValue placeholder="Select a physician" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            <span className="font-medium">{doctor.name}</span>
                            <span className="text-muted-foreground ml-2">
                              ({doctor.specialization})
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact Name *</Label>
                  <Input
                    id="emergency"
                    placeholder="Full name"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      handleInputChange("emergencyContact", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) =>
                        handleInputChange("countryCode", value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((item) => (
                          <SelectItem key={item.code} value={item.code}>
                            {item.code} {item.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="emergencyPhone"
                      placeholder="901234567"
                      value={formData.emergencyPhone}
                      onChange={(e) =>
                        handleInputChange("emergencyPhone", e.target.value)
                      }
                      className="flex-1"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Note:</span> Make sure all
                    medical details are accurate as they will be used for
                    treatment and emergency purposes.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="profilePic">Profile Picture *</Label>
                  <FileUpload
                    label="Upload a clear profile picture"
                    accept="image/*"
                    value={formData.profilePicture}
                    onFileChange={(file) =>
                      handleInputChange("profilePicture", file)
                    }
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="passport">Passport / ID Document *</Label>
                  <FileUpload
                    label="Upload passport or ID document"
                    accept="image/*,.pdf"
                    value={formData.passport}
                    onFileChange={(file) =>
                      handleInputChange("passport", file)
                    }
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900">
                    <span className="font-semibold">Document Requirements:</span>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Profile picture must be clear and recent</li>
                      <li>ID document must be valid and readable</li>
                      <li>Maximum file size: 5MB</li>
                    </ul>
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review & Sign */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="signature">Patient Signature *</Label>
                  <SignaturePad
                    value={formData.signature}
                    onSignatureChange={(sig) =>
                      handleInputChange("signature", sig)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Sign above to confirm the accuracy of provided information
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                  <p className="font-semibold text-sm">Summary</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{`${formData.firstName} ${formData.lastName}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{`${formData.countryCode}${formData.phone}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blood Type:</span>
                      <span>{formData.bloodType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Physician:</span>
                      <span>
                        {doctors.find((d) => d.id === formData.physician)?.name ||
                          "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Documents:</span>
                      <div className="flex gap-2">
                        {formData.profilePicture && (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                        {formData.passport && (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between gap-3 pt-6 border-t">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              {step < 4 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (step === 1 &&
                      (!formData.firstName ||
                        !formData.lastName ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.dateOfBirth ||
                        !formData.gender ||
                        !formData.address ||
                        !formData.city ||
                        !formData.state ||
                        !formData.bloodType)) ||
                    (step === 2 &&
                      (!formData.physician ||
                        !formData.emergencyContact ||
                        !formData.emergencyPhone)) ||
                    (step === 3 &&
                      (!formData.profilePicture || !formData.passport))
                  }
                  className="ml-auto"
                >
                  Next
                </Button>
              )}
              {step === 4 && (
                <Button
                  type="submit"
                  disabled={isLoading || !formData.signature}
                  className="ml-auto bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Create Patient"
                  )}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Are you sure you want to exit without saving?
          </AlertDialogDescription>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowExitDialog(false);
                onOpenChange(false);
                setStep(1);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  countryCode: "+234",
                  dateOfBirth: "",
                  gender: "",
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  bloodType: "",
                  emergencyContact: "",
                  emergencyPhone: "",
                  physician: "",
                  profilePicture: null,
                  passport: null,
                  signature: null,
                });
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Discard
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
