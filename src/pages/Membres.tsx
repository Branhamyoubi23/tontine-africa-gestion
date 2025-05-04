
import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MemberForm, { Member } from "@/components/membres/MemberForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const Membres = () => {
  // État pour gérer les membres
  const [membres, setMembres] = useState<Member[]>([
    {
      id: "1",
      nom: "Amadou Diallo",
      telephone: "+221 77 123 45 67",
      adresse: "Dakar, Sénégal",
      dateAdhesion: "2023-01-15",
    },
    {
      id: "2",
      nom: "Fatou Ndiaye",
      telephone: "+221 76 234 56 78",
      adresse: "Thiès, Sénégal",
      dateAdhesion: "2023-02-10",
    },
    {
      id: "3",
      nom: "Ibrahim Sow",
      telephone: "+221 70 345 67 89",
      adresse: "Saint-Louis, Sénégal",
      dateAdhesion: "2023-01-05",
    },
  ]);

  // État pour le formulaire
  const [formOpen, setFormOpen] = useState(false);
  const [editMember, setEditMember] = useState<Member | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  const { toast } = useToast();

  // Colonnes pour la table de membres
  const columns = [
    { header: "Nom", accessor: "nom" },
    { header: "Téléphone", accessor: "telephone" },
    { header: "Adresse", accessor: "adresse" },
    {
      header: "Date d'adhésion",
      accessor: (item: Member) => new Date(item.dateAdhesion).toLocaleDateString(),
    },
  ];

  // Fonction pour ajouter un nouveau membre
  const handleAddMember = (memberData: Omit<Member, "id">) => {
    const newMember = {
      ...memberData,
      id: Date.now().toString(),
    };
    setMembres([...membres, newMember]);
    setFormOpen(false);
    toast({
      title: "Membre ajouté",
      description: `${memberData.nom} a été ajouté avec succès.`,
    });
  };

  // Fonction pour modifier un membre
  const handleEditMember = (memberData: Omit<Member, "id">) => {
    if (!editMember) return;
    const updatedMembres = membres.map((member) => {
      if (member.id === editMember.id) {
        return { ...memberData, id: member.id };
      }
      return member;
    });
    setMembres(updatedMembres);
    setFormOpen(false);
    setEditMember(undefined);
    toast({
      title: "Membre modifié",
      description: `${memberData.nom} a été modifié avec succès.`,
    });
  };

  // Gestionnaire d'édition
  const handleEdit = (member: Member) => {
    setEditMember(member);
    setFormOpen(true);
  };

  // Gestionnaire de suppression
  const handleDelete = (member: Member) => {
    setMemberToDelete(member);
  };

  // Fonction pour confirmer la suppression
  const confirmDelete = () => {
    if (!memberToDelete) return;
    
    const updatedMembres = membres.filter((member) => member.id !== memberToDelete.id);
    setMembres(updatedMembres);
    toast({
      title: "Membre supprimé",
      description: `${memberToDelete.nom} a été supprimé avec succès.`,
      variant: "destructive",
    });
    setMemberToDelete(null);
  };

  // Fonction pour filtrer les membres selon la recherche
  const filteredMembers = membres.filter((member) =>
    member.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.telephone.includes(searchTerm) ||
    member.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestion des membres</h1>
        <p className="text-muted-foreground">
          Ajoutez, modifiez ou supprimez des membres de la tontine.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Liste des membres</CardTitle>
            <CardDescription>
              {membres.length} membre{membres.length !== 1 ? 's' : ''} enregistré{membres.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau membre
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Rechercher un membre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <DataTable
            data={filteredMembers}
            columns={columns}
            keyExtractor={(item) => item.id}
            actions={{
              edit: handleEdit,
              delete: handleDelete,
            }}
          />
        </CardContent>
      </Card>

      {/* Formulaire d'ajout/modification */}
      <MemberForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={editMember ? handleEditMember : handleAddMember}
        initialData={editMember}
        title={editMember ? "Modifier un membre" : "Ajouter un membre"}
      />

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!memberToDelete} onOpenChange={() => setMemberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation de suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer {memberToDelete?.nom} ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Membres;
