"use client";

import { Button } from "@heroui/button";
import {
  CloseIcon
} from "@/components/icons";

interface SelectedGenreProps {
  value: string;
  handleClick: () => void;
}

export const SelectedGenre = ({ value, handleClick }: SelectedGenreProps) => {
  return (
    <Button radius="full" className="flex justify-between items-center" color="secondary" onPress={handleClick}>
      {value}
      <CloseIcon />
    </Button>
  );
};