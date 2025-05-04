
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simuler une connexion (à remplacer par une vraie API)
    setTimeout(() => {
      // Simple vérification pour démo
      if (username === "admin" && password === "admin123") {
        // Enregistrer une session (à améliorer avec un vrai token)
        sessionStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace Tontine Africa",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tontine-primary">Tontine Africa</h1>
          <p className="text-gray-600 mt-2">Plateforme de gestion de tontine</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Nom d'utilisateur
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Mot de passe
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full mt-6" disabled={loading} type="submit">
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Demo: utilisateur "admin", mot de passe "admin123"
            </p>
          </CardFooter>
        </Card>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          © Tontine Africa {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Login;
