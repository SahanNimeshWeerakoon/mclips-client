"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { SelectedGenre } from "@/components/selectedGenre";

export default function Create() {
  const [genres, setGenres] = useState<string[]>(siteConfig.genres);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [inputs, setInputs] = useState<{name: string, description: string, video: null | File }>({ name: "", description: "", video: null });

  const handleGenreSelect = (value: string) => {
      setSelectedGenres(prev => [...prev, value]);
      setGenres(prev => prev.filter(genre => genre !== value));
  }
  const handleGenreDeSelect = (value: string) => {
      setSelectedGenres(prev => prev.filter(genre => genre !== value));
      setGenres(prev => [...prev, value]);
  }

  const handleInputChange = (value: File | null | string, name: string) => { 
    setInputs((prev: any) => ({ ...prev, [name]: value }));
  }

  const getFirstFrameAsThumbnail = (file: File): Promise<Blob> => {
    return new Promise((res, rej) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if(!ctx) return rej("Could not get canvas context");

        video.preload = 'metadata';
        video.muted = true;
        video.src = URL.createObjectURL(file);

        video.onloadedmetadata = () => {
          const targetTime = Math.min(2, video.duration);
          video.currentTime = targetTime;
        }

        video.onseeked = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(video.src);
                if(!blob) return rej("Could not get thumbnail");
                else return res(blob);
            }, "image/jpeg", 0.85);
        }

        video.onerror = (error) => {
            URL.revokeObjectURL(video.src);
            return rej("Error loading video");
        }
    });
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputs.video) return;

    const thumbnail = await getFirstFrameAsThumbnail(inputs.video);

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("video", inputs.video as Blob);
    formData.append("genres", JSON.stringify(selectedGenres));
    formData.append("thumbnail", thumbnail, "thumbnail.jpg");

    let uploadRes: any = await fetch('/api/video/create', {
      method: 'POST',
      body: formData,
    });

    uploadRes = await uploadRes.json();

    if(!uploadRes.success) {
      alert("Something went wrong!");
    } else {
      alert("Video uploaded successfully!");
      location.reload();
    }
  }

  return (
    <section className="flex justify-center pt-10 min-h-screen bg-gray-50">
      <div className="bg-transparent rounded-2xl p-8 w-[30%]">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-primary">Create</span>{" "}
          <span className="text-default-900">Video</span>
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Movie Name</label>
            <Input type="text" variant="bordered" size="lg" placeholder="Enter movie name" onValueChange={(value: string) => handleInputChange(value, "name")} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <Input type="text" variant="bordered" size="lg" placeholder="Enter description" onValueChange={(value: string) => handleInputChange(value, "description")} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Genre</label>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                    className={buttonStyles({
                        color: "primary",
                        radius: "sm",
                        variant: "bordered",
                        size: "lg",
                        fullWidth: true
                    })}
                    >
                    Select Genre
                    </Button>
                </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Static Actions"
                        selectionMode="multiple"
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            handleGenreSelect(value);
                        }}
                    >
                            {genres.map((genre) => (
                                <DropdownItem key={genre}>{genre}</DropdownItem>
                            ))}
                    </DropdownMenu>
                </Dropdown>
                <div className="flex items-center justify-start mt-3 flex-wrap gap-2">
                    {selectedGenres.map(itm => <span key={itm}><SelectedGenre handleClick={() => handleGenreDeSelect(itm)} value={itm} /></span>)}
                </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:text-sm file:font-medium 
                         file:bg-primary file:text-white hover:file:bg-primary/80"
              onChange={(e) => handleInputChange(e.target.files ? e.target.files[0] : null, "video")}
            />
          </div>
          <div className="flex justify-center">
            <Button color="primary" type="submit" size="lg" className="w-[50%]">
                Upload
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}