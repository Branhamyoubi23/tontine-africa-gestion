
import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PretForm, { Pret } from "@/components/prets/PretForm";
import RemboursementForm, { Remboursement } from "@/components/prets/RemboursementForm";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Prets = () => {
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

  // État pour gérer les prêts
  const [prets, setPrets] = useState<Pret[]>([
    {
      id: "1",
      membreId: "1",
      nomMembre: "Amadou Diallo",
      montant: 150000,
      montantRembourse: 100000,
      dateDebut: "2023-03-15",
      dateFin: null,
      statut: "en_cours",
    },
    {
      id: "2",
      membreId: "2",
      nomMembre: "Fatou Ndiaye",
      montant: 100000,
      montantRembourse: 50000,
      dateDebut: "2023-04-10",
      dateFin: null,
      statut: "en_cours",
    },
    {
      id: "3",
      membreId: "3",
      nomMembre: "Ibrahim Sow",
      montant: 80000,
      montantRembourse: 80000,
      dateDebut: "2023-02-20",
      dateFin: "2023-04-20",
      statut: "remboursé",
    },
  ]);

  // État pour gérer les remboursements
  const [remboursements, setRemboursements] = useState<Remboursement[]>([
    {
      id: "1",
      pretId: "1",
      nomMembre: "Amadou Diallo",
      montant: 50000,
      date: "2023-04-15",
    },
    {
      id: "2",
      pretId: "1",
      nomMembre: "Amadou Diallo",
      montant: 50000,
      date: "2023-05-15",
    },
    {
      id: "3",
      pretId: "2",
      nomMembre: "Fatou Ndiaye",
      montant: 50000,
      date: "2023-05-10",
    },
    {
      id: "4",
      pretId: "3",
      nomMembre: "Ibrahim Sow",
      montant: 40000,
      date: "2023-03-20",
    },
    {
      id: "5",
      pretId: "3",
      nomMembre: "Ibrahim Sow",
      montant: 40000,
      date: "2023-04-20",
    },
  ]);

  // États pour les formulaires et les filtres
  const [pretFormOpen, setPretFormOpen] = useState(false);
  const [remboursementFormOpen, setRemboursementFormOpen] = useState(false);
  const [selectedPret, setSelectedPret] = useState<Pret | null>(null);
  const [pretToDelete, setPretToDelete] = useState<Pret | null>(null);
  const [remboursementToDelete, setRemboursementToDelete] = useState<Remboursement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("prets");

  const { toast } = useToast();

  // Colonnes pour la table des prêts
  const pretColumns = [
    {
      header: "Date",
      accessor: (item: Pret) => new Date(item.dateDebut).toLocaleDateString(),
    },
    { header: "Membre", accessor: "nomMembre" },
    {
      header: "Montant",
      accessor: (item: Pret) => `${item.montant.toLocaleString()} FCFA`,
      className: "text-right",
    },
    {
      header: "Remboursé",
      accessor: (item: Pret) => `${item.montantRembourse.toLocaleString()} FCFA (${Math.round((item.montantRembourse / item.montant) * 100)}%)`,
      className: "text-right",
    },
    {
      header: "Statut",
      accessor: (item: Pret) => (
        <Badge variant={item.statut === "remboursé" ? "outline" : "default"}>
          {item.statut === "remboursé" ? "Remboursé" : "En cours"}
        </Badge>
      ),
    },
  ];

  // Colonnes pour la table des remboursements
  const remboursementColumns = [
    {
      header: "Date",
      accessor: (item: Remboursement) => new Date(item.date).toLocaleDateString(),
    },
    { header: "Membre", accessor: "nomMembre" },
    {
      header: "Montant",
      accessor: (item: Remboursement) => `${item.montant.toLocaleString()} FCFA`,
      className: "text-right",
    },
  ];

  // Fonction pour ajouter un nouveau prêt
  const handleAddPret = (pretData: Omit<Pret, "id" | "nomMembre" | "montantRembourse" | "dateFin" | "statut">) => {
    const membre = membres.find(m => m.id === pretData.membreId);
    if (!membre) return;

    const newPret = {
      ...pretData,
      id: Date.now().toString(),
      nomMembre: membre.nom,
      montantRembourse: 0,
      dateFin: null,
      statut: "en_cours" as const,
    };

    setPrets([...prets, newPret]);
    setPretFormOpen(false);
    toast({
      title: "Prêt enregistré",
      description: `Le prêt de ${membre.nom} a été enregistré avec succès.`,
    });
  };

  // Fonction pour ajouter un nouveau remboursement
  const handleAddRemboursement = (remboursementData: Omit<Remboursement, "id" | "nomMembre">) => {
    // Trouver le prêt concerné
    const pret = prets.find(p => p.id === remboursementData.pretId);
    if (!pret) return;

    // Créer le nouveau remboursement
    const newRemboursement = {
      ...remboursementData,
      id: Date.now().toString(),
      nomMembre: pret.nomMembre,
    };

    // Mettre à jour le prêt avec le nouveau montant remboursé
    const nouveauMontantRembourse = pret.montantRembourse + remboursementData.montant;
    const estTotalementRembourse = nouveauMontantRembourse >= pret.montant;
    
    const pretsMisAJour = prets.map(p => {
      if (p.id === pret.id) {
        return {
          ...p,
          montantRembourse: nouveauMontantRembourse,
          statut: estTotalementRembourse ? "remboursé" as const : "en_cours" as const,
          dateFin: estTotalementRembourse ? new Date().toISOString().split("T")[0] : null,
        };
      }
      return p;
    });

    // Mettre à jour les états
    setRemboursements([...remboursements, newRemboursement]);
    setPrets(pretsMisAJour);
    setRemboursementFormOpen(false);
    setSelectedPret(null);
    
    toast({
      title: "Remboursement enregistré",
      description: `Le remboursement de ${pret.nomMembre} a été enregistré avec succès.`,
    });

    if (estTotalementRembourse) {
      toast({
        title: "Prêt remboursé",
        description: `Le prêt de ${pret.nomMembre} a été entièrement remboursé !`,
        variant: "default",
      });
    }
  };

  // Gestionnaires de suppression
  const handleDeletePret = (pret: Pret) => {
    setPretToDelete(pret);
  };

  const handleDeleteRemboursement = (remboursement: Remboursement) => {
    setRemboursementToDelete(remboursement);
  };

  // Fonction pour effectuer un remboursement sur un prêt spécifique
  const handleRembourser = (pret: Pret) => {
    setSelectedPret(pret);
    setRemboursementFormOpen(true);
  };

  // Fonction pour confirmer la suppression d'un prêt
  const confirmDeletePret = () => {
    if (!pretToDelete) return;
    
    // Vérifier si des remboursements sont liés à ce prêt
    const hasRemboursements = remboursements.some(r => r.pretId === pretToDelete.id);
    
    if (hasRemboursements) {
      toast({
        title: "Suppression impossible",
        description: "Ce prêt a des remboursements associés. Veuillez d'abord supprimer les remboursements.",
        variant: "destructive",
      });
      setPretToDelete(null);
      return;
    }
    
    const updatedPrets = prets.filter(p => p.id !== pretToDelete.id);
    setPrets(updatedPrets);
    toast({
      title: "Prêt supprimé",
      description: `Le prêt de ${pretToDelete.nomMembre} a été supprimé.`,
      variant: "destructive",
    });
    setPretToDelete(null);
  };

  // Fonction pour confirmer la suppression d'un remboursement
  const confirmDeleteRemboursement = () => {
    if (!remboursementToDelete) return;
    
    // Trouver le prêt concerné pour mettre à jour le montant remboursé
    const pret = prets.find(p => p.id === remboursementToDelete.pretId);
    if (!pret) {
      setRemboursementToDelete(null);
      return;
    }
    
    // Mettre à jour le montant remboursé et le statut du prêt
    const nouveauMontantRembourse = pret.montantRembourse - remboursementToDelete.montant;
    
    const pretsMisAJour = prets.map(p => {
      if (p.id === pret.id) {
        return {
          ...p,
          montantRembourse: nouveauMontantRembourse,
          statut: "en_cours" as const, // Si on supprime un remboursement, le prêt revient à "en cours"
          dateFin: null, // On réinitialise la date de fin
        };
      }
      return p;
    });
    
    const remboursementsMisAJour = remboursements.filter(r => r.id !== remboursementToDelete.id);
    
    setPrets(pretsMisAJour);
    setRemboursements(remboursementsMisAJour);
    toast({
      title: "Remboursement supprimé",
      description: `Le remboursement de ${remboursementToDelete.nomMembre} a été supprimé.`,
      variant: "destructive",
    });
    setRemboursementToDelete(null);
  };

  // Filtrage des prêts
  const filteredPrets = prets.filter(pret => {
    const matchesSearch = 
      pret.nomMembre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pret.dateDebut.includes(searchTerm);
      
    const matchesStatus = selectedStatus === "all" || pret.statut === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filtrage des remboursements
  const filteredRemboursements = remboursements.filter(remboursement => {
    return remboursement.nomMembre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remboursement.date.includes(searchTerm);
  });

  // Calcul des totaux
  const totalPrets = prets.reduce((sum, pret) => sum + pret.montant, 0);
  const totalRembourse = prets.reduce((sum, pret) => sum + pret.montantRembourse, 0);
  const resteARembourser = totalPrets - totalRembourse;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestion des prêts</h1>
        <p className="text-muted-foreground">
          Enregistrez et suivez les prêts et les remboursements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-muted-foreground text-sm font-medium">Total des prêts</h3>
              <p className="text-3xl font-bold mt-2">{totalPrets.toLocaleString()} FCFA</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-muted-foreground text-sm font-medium">Montant remboursé</h3>
              <p className="text-3xl font-bold mt-2">{totalRembourse.toLocaleString()} FCFA</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-muted-foreground text-sm font-medium">Reste à rembourser</h3>
              <p className="text-3xl font-bold mt-2">{resteARembourser.toLocaleString()} FCFA</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prets">Prêts</TabsTrigger>
          <TabsTrigger value="remboursements">Remboursements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Liste des prêts</CardTitle>
                <CardDescription>
                  {filteredPrets.length} prêt{filteredPrets.length !== 1 ? 's' : ''}
                </CardDescription>
              </div>
              <Button onClick={() => setPretFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau prêt
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
                    value={selectedStatus} 
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="en_cours">En cours</SelectItem>
                      <SelectItem value="remboursé">Remboursé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DataTable
                data={filteredPrets}
                columns={pretColumns}
                keyExtractor={(item) => item.id}
                actions={{
                  edit: (pret) => {
                    if (pret.statut === "en_cours") {
                      handleRembourser(pret);
                    }
                  },
                  delete: handleDeletePret,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="remboursements">
          <Card>
            <CardHeader>
              <CardTitle>Historique des remboursements</CardTitle>
              <CardDescription>
                {filteredRemboursements.length} remboursement{filteredRemboursements.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DataTable
                data={filteredRemboursements}
                columns={remboursementColumns}
                keyExtractor={(item) => item.id}
                actions={{
                  delete: handleDeleteRemboursement,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Formulaire d'ajout de prêt */}
      <PretForm
        open={pretFormOpen}
        onOpenChange={setPretFormOpen}
        onSubmit={handleAddPret}
        membres={membres}
      />

      {/* Formulaire de remboursement */}
      <RemboursementForm
        open={remboursementFormOpen}
        onOpenChange={setRemboursementFormOpen}
        onSubmit={handleAddRemboursement}
        prets={prets}
        pretActuel={selectedPret || undefined}
      />

      {/* Dialog de confirmation de suppression d'un prêt */}
      <AlertDialog open={!!pretToDelete} onOpenChange={() => setPretToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation de suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce prêt de {pretToDelete?.nomMembre} ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePret} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de confirmation de suppression d'un remboursement */}
      <AlertDialog open={!!remboursementToDelete} onOpenChange={() => setRemboursementToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation de suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce remboursement de {remboursementToDelete?.nomMembre} ? Cela modifiera également le statut et le montant remboursé du prêt associé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRemboursement} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Prets;
