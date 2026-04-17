import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth.js";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { handleGetMe } = useAuth();

  useEffect(() => {
    if (!user) {
      handleGetMe();
    }
  }, [user, handleGetMe]);

  console.log(user);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
