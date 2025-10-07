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

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("description", inputs.description);
        formData.append("video", inputs.video as Blob);
        formData.append("genres", JSON.stringify(selectedGenres));

        const res = await fetch(`http://20.193.147.237:8080/clips/create`, {
          method: "POST",
          body: formData,
        });

        console.log(res);
      } catch(err) {
        console.log(err);
      }
      // Handle form submission logic here
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-transparent rounded-2xl p-8 w-[30%]">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-primary">Create</span>{" "}
          <span className="text-default-900">Video</span>
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Movie Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Movie Name</label>
            <Input type="text" variant="bordered" size="lg" placeholder="Enter movie name" onValueChange={(value: string) => handleInputChange(value, "name")} />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <Input type="text" variant="bordered" size="lg" placeholder="Enter description" onValueChange={(value: string) => handleInputChange(value, "description")} />
          </div>

          {/* Genre Dropdown */}
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
                            // console.log("Selected genres:", selected);
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

          {/* Video Uploader */}
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

          {/* Submit Button */}
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