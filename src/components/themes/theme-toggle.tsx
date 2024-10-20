"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <div className="flex gap-1 justify-between">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="md:ml-0 ml-2">Toggle theme</span>
              <span className="sr-only">Toggle theme</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <span className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Light Theme
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <span className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Dark Theme
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <span className="flex items-center gap-2">
              <Laptop className="w-4 h-4" />
              System Theme
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ModeToggle;
