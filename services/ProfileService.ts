"use client";

interface ProfileData {
  name: string;
  jobTitle: string;
  aboutMe: string;
}

class ProfileService {
  getLikedJobs(): string[] {
    const likedJobs = localStorage.getItem("likedJobs");
    return likedJobs ? JSON.parse(likedJobs) : [];
  }

  toggleLikedJob(jobIds: string[]): void {
    localStorage.setItem("likedJobs", JSON.stringify(jobIds));
  }

  setProfile(data: ProfileData): void {
    try {
      const serializedValue = JSON.stringify(data);
      localStorage.setItem("profile", serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  getProfile(): ProfileData | null {
    try {
      const serializedValue = localStorage.getItem("profile");
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  }
}

export const profileService = new ProfileService();
