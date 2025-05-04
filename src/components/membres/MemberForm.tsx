
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

export type Member = {
  id: string;
  nom: string;
  telephone: string;
  adresse: string;
  dateAdhesion: string;
};

type MemberFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (member: Omit<Member, "id">) => void;
  initialData?: Member;
  title?: string;
};

const MemberForm = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title = "Ajouter un membre",
}: MemberFormProps) => {
  const [formData, setFormData] = useState<Omit<Member, "id">>({
    nom: initialData?.nom || "",
    telephone: initialData?.telephone || "",
    adresse: initialData?.adresse || "",
    dateAdhesion: initialData?.dateAdhesion || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        nom: "",
        telephone: "",
        adresse: "",
        dateAdhesion: new Date().toISOString().split("T")[0],
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
              <Label htmlFor="nom" className="text-right">
                Nom complet
              </Label>
              <Input
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telephone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adresse" className="text-right">
                Adresse
              </Label>
              <Input
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateAdhesion" className="text-right">
                Date d'adhésion
              </Label>
              <Input
                id="dateAdhesion"
                name="dateAdhesion"
                type="date"
                value={formData.dateAdhesion}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Modifier" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberForm;
