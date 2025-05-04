
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Parametres = () => {
  const [userInfo, setUserInfo] = useState({
    nom: "Admin",
    email: "admin@tontine-africa.com",
    telephone: "+221 70 123 45 67",
  });

  const [orgInfo, setOrgInfo] = useState({
    nomTontine: "Tontine Solidarité Africaine",
    devise: "FCFA",
    montantCotisationDefaut: 25000,
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { toast } = useToast();

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleOrgInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrgInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleDeviseChange = (value: string) => {
    setOrgInfo(prev => ({ ...prev, devise: value }));
  };

  const handleUpdateUserInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Informations mises à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };

  const handleUpdateOrgInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Informations mises à jour",
      description: "Les informations de la tontine ont été mises à jour avec succès.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    if (oldPassword !== "admin123") { // Simulation de vérification
      toast({
        title: "Erreur",
        description: "L'ancien mot de passe est incorrect.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été modifié avec succès.",
    });
    
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles et les paramètres de la tontine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Modifiez vos informations de profil.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateUserInfo}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={userInfo.nom}
                    onChange={handleUserInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    value={userInfo.telephone}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6">
                Enregistrer les modifications
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changer le mot de passe</CardTitle>
            <CardDescription>
              Mettez à jour votre mot de passe de connexion.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Ancien mot de passe</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6">
                Mettre à jour le mot de passe
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Paramètres de la tontine</CardTitle>
            <CardDescription>
              Configurez les paramètres généraux de la tontine.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateOrgInfo} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nomTontine">Nom de la tontine</Label>
                  <Input
                    id="nomTontine"
                    name="nomTontine"
                    value={orgInfo.nomTontine}
                    onChange={handleOrgInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="devise">Devise</Label>
                  <Select value={orgInfo.devise} onValueChange={handleDeviseChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FCFA">FCFA</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="montantCotisationDefaut">Montant de cotisation par défaut</Label>
                  <Input
                    id="montantCotisationDefaut"
                    name="montantCotisationDefaut"
                    type="number"
                    value={orgInfo.montantCotisationDefaut}
                    onChange={handleOrgInfoChange}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Enregistrer les paramètres
              </Button>
            </form>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <p className="text-sm text-muted-foreground">
              Ces paramètres s'appliquent à l'ensemble de la plateforme.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Parametres;
