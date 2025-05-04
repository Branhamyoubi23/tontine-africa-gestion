
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Member } from "@/components/membres/MemberForm";

export type Cotisation = {
  id: string;
  membreId: string;
  nomMembre: string;
  montant: number;
  date: string;
};

type CotisationFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (cotisation: Omit<Cotisation, "id" | "nomMembre">) => void;
  membres: Member[];
  initialData?: Cotisation;
  title?: string;
};

const CotisationForm = ({
  open,
  onOpenChange,
  onSubmit,
  membres,
  initialData,
  title = "Enregistrer une cotisation",
}: CotisationFormProps) => {
  const [formData, setFormData] = useState<Omit<Cotisation, "id" | "nomMembre">>({
    membreId: initialData?.membreId || "",
    montant: initialData?.montant || 0,
    date: initialData?.date || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "montant" ? parseFloat(value) : value 
    }));
  };

  const handleSelectMember = (value: string) => {
    setFormData((prev) => ({ ...prev, membreId: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        membreId: "",
        montant: 0,
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="membre" className="text-right">
                Membre
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.membreId}
                  onValueChange={handleSelectMember}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un membre" />
                  </SelectTrigger>
                  <SelectContent>
                    {membres.map((membre) => (
                      <SelectItem key={membre.id} value={membre.id}>
                        {membre.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="montant" className="text-right">
                Montant
              </Label>
              <Input
                id="montant"
                name="montant"
                type="number"
                min="0"
                step="0.01"
                value={formData.montant}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Modifier" : "Enregistrer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CotisationForm;
