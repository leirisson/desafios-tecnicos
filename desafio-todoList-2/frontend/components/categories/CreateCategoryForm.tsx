"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import CategoryModal from "@/components/categories/CategoryModal";

export default function CreateCategoryForm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} className="w-fit">
        <Plus className="h-4 w-4" />
        Nova Categoria
      </Button>
      <CategoryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
