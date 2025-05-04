
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/common/DataTable";
import { Users, CreditCard, FileText } from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { useNavigate } from "react-router-dom";

// Define types for our data for better type safety
interface Transaction {
  id: number;
  date: string;
  type: string;
  membre: string;
  montant: number;
}

interface DebtMember {
  id: number;
  nom: string;
  montantPret: number;
  montantRembourse: number;
  dateEcheance: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  // Données simulées pour le tableau de bord
  const stats = {
    totalMembres: 25,
    totalCotisations: 1250000,
    totalPrets: 750000,
    totalRemboursements: 500000,
  };

  // Données simulées pour le graphique de répartition des prêts
  const pretData = [
    { name: "Remboursés", value: stats.totalRemboursements },
    { name: "En cours", value: stats.totalPrets - stats.totalRemboursements },
  ];

  // Couleurs pour le graphique à secteurs
  const COLORS = ["#2D8B75", "#EF7C19"];

  // Données simulées pour le graphique des cotisations mensuelles
  const cotisationsData = [
    { name: "Jan", montant: 120000 },
    { name: "Fév", montant: 150000 },
    { name: "Mar", montant: 180000 },
    { name: "Avr", montant: 200000 },
    { name: "Mai", montant: 220000 },
    { name: "Juin", montant: 180000 },
  ];

  // Données simulées pour les dernières transactions
  const dernieresTransactions: Transaction[] = [
    { id: 1, date: "2023-05-01", type: "Cotisation", membre: "Amadou Diallo", montant: 25000 },
    { id: 2, date: "2023-05-02", type: "Prêt", membre: "Fatou Ndiaye", montant: 100000 },
    { id: 3, date: "2023-05-03", type: "Remboursement", membre: "Ibrahim Sow", montant: 30000 },
    { id: 4, date: "2023-05-04", type: "Cotisation", membre: "Aïcha Touré", montant: 25000 },
    { id: 5, date: "2023-05-05", type: "Remboursement", membre: "Mamadou Bah", montant: 50000 },
  ];

  // Données simulées pour les membres avec des prêts en cours
  const membresEnDette: DebtMember[] = [
    { id: 1, nom: "Fatou Ndiaye", montantPret: 100000, montantRembourse: 30000, dateEcheance: "2023-07-02" },
    { id: 2, nom: "Moussa Diop", montantPret: 80000, montantRembourse: 20000, dateEcheance: "2023-06-15" },
    { id: 3, nom: "Aminata Ba", montantPret: 50000, montantRembourse: 0, dateEcheance: "2023-08-10" },
  ];

  const transactionColumns = [
    { 
      header: "Date", 
      accessor: (item: Transaction) => new Date(item.date).toLocaleDateString() 
    },
    { 
      header: "Type", 
      accessor: (item: Transaction) => item.type
    },
    { 
      header: "Membre", 
      accessor: (item: Transaction) => item.membre 
    },
    { 
      header: "Montant", 
      accessor: (item: Transaction) => `${item.montant.toLocaleString()} FCFA`,
      className: "text-right"
    },
  ];

  const detteColumns = [
    { 
      header: "Membre", 
      accessor: (item: DebtMember) => item.nom
    },
    { 
      header: "Montant prêt", 
      accessor: (item: DebtMember) => `${item.montantPret.toLocaleString()} FCFA`,
      className: "text-right"
    },
    { 
      header: "Remboursé", 
      accessor: (item: DebtMember) => `${item.montantRembourse.toLocaleString()} FCFA`,
      className: "text-right"
    },
    { 
      header: "Reste", 
      accessor: (item: DebtMember) => `${(item.montantPret - item.montantRembourse).toLocaleString()} FCFA`,
      className: "text-right font-semibold"
    },
    { 
      header: "Échéance", 
      accessor: (item: DebtMember) => new Date(item.dateEcheance).toLocaleDateString()
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Aperçu général de la gestion de votre tontine
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Membres"
          value={stats.totalMembres.toString()}
          icon={<Users size={24} />}
        />
        <StatCard
          title="Total des cotisations"
          value={`${stats.totalCotisations.toLocaleString()} FCFA`}
          icon={<CreditCard size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total des prêts"
          value={`${stats.totalPrets.toLocaleString()} FCFA`}
          icon={<FileText size={24} />}
        />
        <StatCard
          title="Remboursement"
          value={`${Math.round((stats.totalRemboursements / stats.totalPrets) * 100)}%`}
          icon={<FileText size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Répartition des prêts</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pretData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pretData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} FCFA`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Cotisations mensuelles</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cotisationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} FCFA`} />
                <Legend />
                <Bar dataKey="montant" name="Montant (FCFA)" fill="#1A365D" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tableaux */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Dernières transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <DataTable
              data={dernieresTransactions}
              columns={transactionColumns}
              keyExtractor={(item) => item.id}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Prêts en cours</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <DataTable
              data={membresEnDette}
              columns={detteColumns}
              keyExtractor={(item) => item.id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
