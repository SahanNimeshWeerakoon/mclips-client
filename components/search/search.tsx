"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useEffect } from "react";
import { Input } from '@heroui/input'
import { Button } from "@heroui/button";
import { useSelector } from "react-redux";
import { button as buttonStyles } from "@heroui/theme";

import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { SelectedGenre } from "../selectedGenre";
import { CaretDownIcon } from "@/components/icons";
import { fetchVideos } from "@/store/slices/videoSlice";
import { removeGenre, setGenre } from "@/store/slices/searchSlice";

export default function Search() {
  const dispatch = useAppDispatch();

  const {selectedGenres, listedGenres, keyword} = useSelector((state: RootState) => state.search);

  const handleGenreSelect = (value: string) => dispatch(setGenre(value));
  const handleGenreDeSelect = (value: string) => dispatch(removeGenre(value));

  useEffect(() => {
    dispatch(fetchVideos());
  }, [keyword, selectedGenres]);

  return (
    <section className="container mx-auto">
      <div className={`flex gap-10 ${!selectedGenres.length && 'items-center mb-5'}`}>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className={buttonStyles({
                size: "lg",
                radius: "full",
                color: "primary",
                variant: "bordered"
              })}
              endContent={<CaretDownIcon className="text-primary w-20 h-20" />}
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
              {listedGenres.map((genre: string) => (
                <DropdownItem key={genre}>{genre}</DropdownItem>
              ))}
            </DropdownMenu>
        </Dropdown>
        <div className={`w-full ${!selectedGenres.length && 'flex items-center'}`}>
            <Input
                type="text"
                radius="full"
                label="Search"
                color="primary"
                variant="bordered"
            />
            <div className="flex items-center justify-start mt-3 flex-wrap gap-2 mb-3">
                {selectedGenres.map(itm => <span key={itm}><SelectedGenre handleClick={() => handleGenreDeSelect(itm)} value={itm} /></span>)}
            </div>
        </div>
      </div>
    </section>
  );
}