"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";
import { useState } from "react";
import { Input } from '@heroui/input'
import { Button } from "@heroui/button";
import { button as buttonStyles, input as inputStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";

export default function Search() {
    const [genres, setGenres] = useState<string[]>(siteConfig.genres);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const handleGenreSelect = (value: string) => {
        setSelectedGenres(prev => [...prev, value]);
        setGenres(prev => prev.filter(genre => genre !== value));
    }
  return (
    <section>
      <div className="flex gap-10 items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className={buttonStyles({
                color: "primary",
                radius: "sm",
                variant: "bordered",
                size: "lg"
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
        <div className="w-full">
            <Input
                label="Email"
                variant="bordered"
                type="text"
                radius="full"
                color="primary"
            />
            <div className="flex items-center justify-start">
                {selectedGenres.map(itm => <p key={itm}>{itm}</p>)}
            </div>
        </div>
      </div>
    </section>
  );
}