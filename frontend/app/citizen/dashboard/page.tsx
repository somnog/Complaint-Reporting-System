import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function CitizenDashboard() {
  return (
    <ProtectedRoute allowedRoles={['CITIZEN']}>
      <h1>Citizen Dashboard</h1>
      {/* Your citizen dashboard content here */}
    </ProtectedRoute>
  );
}
