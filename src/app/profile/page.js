import ProtectedRoute from "@/components/ProtectedRoute";

export default function Profile() {
    return (
        <ProtectedRoute>
            <div>
                <h1>Profile Page</h1>
                {/* Profile content goes here */}
            </div>
        </ProtectedRoute>
    );
}
