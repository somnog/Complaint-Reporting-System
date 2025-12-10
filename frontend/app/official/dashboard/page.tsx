import ProtectedRoute from "@/app/components/ProtectedRoute";


export default function OfficialDashboard() {
  return (
    <ProtectedRoute allowedRoles={['OFFICIAL', 'ADMIN']}>
      <h1>Official Dashboard</h1>
      {/* Your official dashboard content here */}
    </ProtectedRoute>
  );
}
