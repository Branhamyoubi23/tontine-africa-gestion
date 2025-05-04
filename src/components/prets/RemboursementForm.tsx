
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
import type { Pret } from "./PretForm";

export type Remboursement = {
  id: string;
  pretId: string;
  nomMembre: string;
  montant: number;
  date: string;
};

type RemboursementFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (remboursement: Omit<Remboursement, "id" | "nomMembre">) => void;
  prets: Pret[];
  pretActuel?: Pret;
  title?: string;
};

const RemboursementForm = ({
  open,
  onOpenChange,
  onSubmit,
  prets,
  pretActuel,
  title = "Enregistrer un remboursement",
}: RemboursementFormProps) => {
  const [formData, setFormData] = useState<Omit<Remboursement, "id" | "nomMembre">>({
    pretId: pretActuel?.id || "",
    montant: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "montant" ? parseFloat(value) : value 
    }));
  };

  const handleSelectPret = (value: string) => {
    setFormData((prev) => ({ ...prev, pretId: value }));
  };

  // Filtrer uniquement les prêts en cours
  const pretsEnCours = prets.filter(pret => pret.statut === "en_cours");

  const pretSelectionne = prets.find(pret => pret.id === formData.pretId);
  const resteAPayer = pretSelectionne 
    ? pretSelectionne.montant - pretSelectionne.montantRembourse 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      pretId: "",
      montant: 0,
      date: new Date().toISOString().split("T")[0],
    });
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
              <Label htmlFor="pret" className="text-right">
                Prêt
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.pretId}
                  onValueChange={handleSelectPret}
                  required
                  disabled={!!pretActuel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un prêt" />
                  </SelectTrigger>
                  <SelectContent>
                    {pretsEnCours.map((pret) => (
                      <SelectItem key={pret.id} value={pret.id}>
                        {pret.nomMembre} - {pret.montant} FCFA
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {pretSelectionne && (
              <div className="text-sm px-4 py-2 bg-muted rounded-md">
                <p>Montant total: {pretSelectionne.montant} FCFA</p>
                <p>Déjà remboursé: {pretSelectionne.montantRembourse} FCFA</p>
                <p className="font-semibold">Reste à payer: {resteAPayer} FCFA</p>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="montant" className="text-right">
                Montant
              </Label>
              <Input
                id="montant"
                name="montant"
                type="number"
                min="0"
                max={resteAPayer || undefined}
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
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RemboursementForm;
