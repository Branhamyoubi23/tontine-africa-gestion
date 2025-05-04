
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Rediriger vers la page de connexion
    const user = sessionStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    } else {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-tontine-primary">Tontine Africa</h1>
        <p className="text-xl text-gray-600">Redirection en cours...</p>
      </div>
    </div>
  );
};

export default Index;
