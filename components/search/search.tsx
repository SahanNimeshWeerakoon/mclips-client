"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";
import { Input } from '@heroui/input'
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";
import { button as buttonStyles, input as inputStyles } from "@heroui/theme";

import { SelectedGenre } from "../selectedGenre";
import { CaretDownIcon } from "@/components/icons";
import { removeGenre, setGenre } from "@/store/slices/videoSlice";
import { RootState } from "@/store/store";

export default function Search() {
  const dispatch = useDispatch();

  const {selectedGenres, listedGenres} = useSelector((state: RootState) => state.video);

  const handleGenreSelect = (value: string) => dispatch(setGenre(value));
  const handleGenreDeSelect = (value: string) => dispatch(removeGenre(value));
  
  return (
    <section className="container mx-auto">
      <div className={`flex gap-10 ${!selectedGenres.length && 'items-center mb-5'}`}>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "bordered",
                size: "lg"
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
                label="Search"
                variant="bordered"
                type="text"
                radius="full"
                color="primary"
            />
            <div className="flex items-center justify-start mt-3 flex-wrap gap-2 mb-3">
                {selectedGenres.map(itm => <span key={itm}><SelectedGenre handleClick={() => handleGenreDeSelect(itm)} value={itm} /></span>)}
            </div>
        </div>
      </div>
    </section>
  );
}