
import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CotisationForm, { Cotisation } from "@/components/cotisations/CotisationForm";
import { Member } from "@/components/membres/MemberForm";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Cotisations = () => {
  // Membres simulés
  const [membres] = useState<Member[]>([
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

  // État pour gérer les cotisations
  const [cotisations, setCotisations] = useState<Cotisation[]>([
    {
      id: "1",
      membreId: "1",
      nomMembre: "Amadou Diallo",
      montant: 25000,
      date: "2023-05-01",
    },
    {
      id: "2",
      membreId: "2",
      nomMembre: "Fatou Ndiaye",
      montant: 25000,
      date: "2023-05-02",
    },
    {
      id: "3",
      membreId: "3",
      nomMembre: "Ibrahim Sow",
      montant: 25000,
      date: "2023-05-03",
    },
    {
      id: "4",
      membreId: "1",
      nomMembre: "Amadou Diallo",
      montant: 25000,
      date: "2023-04-01",
    },
    {
      id: "5",
      membreId: "2",
      nomMembre: "Fatou Ndiaye",
      montant: 25000,
      date: "2023-04-02",
    },
  ]);

  // États pour le formulaire et les filtres
  const [formOpen, setFormOpen] = useState(false);
  const [cotisationToDelete, setCotisationToDelete] = useState<Cotisation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<string>("all");

  const { toast } = useToast();

  // Colonnes pour la table de cotisations
  const columns = [
    {
      header: "Date",
      accessor: (item: Cotisation) => new Date(item.date).toLocaleDateString(),
    },
    { header: "Membre", accessor: "nomMembre" },
    {
      header: "Montant",
      accessor: (item: Cotisation) => `${item.montant.toLocaleString()} FCFA`,
      className: "text-right",
    },
  ];

  // Fonction pour ajouter une nouvelle cotisation
  const handleAddCotisation = (cotisationData: Omit<Cotisation, "id" | "nomMembre">) => {
    const membre = membres.find(m => m.id === cotisationData.membreId);
    if (!membre) return;

    const newCotisation = {
      ...cotisationData,
      id: Date.now().toString(),
      nomMembre: membre.nom
    };

    setCotisations([...cotisations, newCotisation]);
    setFormOpen(false);
    toast({
      title: "Cotisation enregistrée",
      description: `La cotisation de ${membre.nom} a été enregistrée avec succès.`,
    });
  };

  // Gestionnaire de suppression
  const handleDelete = (cotisation: Cotisation) => {
    setCotisationToDelete(cotisation);
  };

  // Fonction pour confirmer la suppression
  const confirmDelete = () => {
    if (!cotisationToDelete) return;
    
    const updatedCotisations = cotisations.filter(c => c.id !== cotisationToDelete.id);
    setCotisations(updatedCotisations);
    toast({
      title: "Cotisation supprimée",
      description: `La cotisation de ${cotisationToDelete.nomMembre} a été supprimée.`,
      variant: "destructive",
    });
    setCotisationToDelete(null);
  };

  // Filtrage des cotisations
  const filteredCotisations = cotisations.filter(cotisation => {
    const matchesSearch = 
      cotisation.nomMembre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cotisation.date.includes(searchTerm);
      
    const matchesMember = selectedMember === "all" || cotisation.membreId === selectedMember;
    
    return matchesSearch && matchesMember;
  });

  // Calcul du total des cotisations filtrées
  const totalCotisations = filteredCotisations.reduce((sum, cotisation) => sum + cotisation.montant, 0);

  // Calcul des totaux par membre
  const totalParMembre = membres.map(membre => {
    const cotisationsMembre = cotisations.filter(c => c.membreId === membre.id);
    const total = cotisationsMembre.reduce((sum, c) => sum + c.montant, 0);
    return {
      id: membre.id,
      nom: membre.nom,
      total,
      nbCotisations: cotisationsMembre.length
    };
  });

  const totalParMembreColumns = [
    { header: "Membre", accessor: "nom" },
    { 
      header: "Nombre de cotisations", 
      accessor: "nbCotisations",
      className: "text-center"
    },
    { 
      header: "Total cotisé", 
      accessor: (item: any) => `${item.total.toLocaleString()} FCFA`,
      className: "text-right font-medium"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestion des cotisations</h1>
        <p className="text-muted-foreground">
          Enregistrez et consultez les cotisations des membres.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Liste des cotisations</CardTitle>
              <CardDescription>
                Total: {totalCotisations.toLocaleString()} FCFA
              </CardDescription>
            </div>
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle cotisation
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select 
                  value={selectedMember} 
                  onValueChange={setSelectedMember}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par membre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les membres</SelectItem>
                    {membres.map((membre) => (
                      <SelectItem key={membre.id} value={membre.id}>
                        {membre.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DataTable
              data={filteredCotisations}
              columns={columns}
              keyExtractor={(item) => item.id}
              actions={{
                delete: handleDelete,
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total par membre</CardTitle>
            <CardDescription>
              Récapitulatif des cotisations par membre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={totalParMembre}
              columns={totalParMembreColumns}
              keyExtractor={(item) => item.id}
            />
          </CardContent>
        </Card>
      </div>

      {/* Formulaire d'ajout de cotisation */}
      <CotisationForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleAddCotisation}
        membres={membres}
      />

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!cotisationToDelete} onOpenChange={() => setCotisationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation de suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette cotisation de {cotisationToDelete?.nomMembre} ? Cette action ne peut pas être annulée.
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

export default Cotisations;
