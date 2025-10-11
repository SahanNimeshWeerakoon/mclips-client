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
    <Button
      radius="full"
      color="secondary"
      onPress={handleClick}
      className="flex justify-between items-center"
      endContent={<CloseIcon className="w-3 h-3 text-black" />}
    >
      {value}
    </Button>
  );
};