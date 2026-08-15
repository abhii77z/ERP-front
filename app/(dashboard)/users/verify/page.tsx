'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userService, authService } from '@/src/services/api-client';
import { User } from '@/src/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';

export default function VerifyUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    // Check role and fetch users
    const init = async () => {
      try {
        const me = await authService.getMe();
        if (me.role !== 'ADMIN') {
          router.push('/dashboard');
          return;
        }

        const data = await userService.getUsers();
        // Extract array if backend returns ApiResponse format, assuming axios/fetch unpacks it.
        // The api-client.ts unpacks `response.data`, so if backend returns ApiResponse<List<User>>, 
        // the type returned is an array.
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to initialize verify users page', error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleVerify = async (id: string) => {
    try {
      setVerifyingId(id);
      await userService.verifyUser(id);
      
      // Update local state
      setUsers(users.map(u => 
        u.id === id ? { ...u, status: 'ACTIVE' } : u
      ));
    } catch (error) {
      console.error('Failed to verify user', error);
      alert('Failed to verify user. Please try again.');
    } finally {
      setVerifyingId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading users...</div>;
  }

  const pendingUsers = users.filter(u => u.status === 'PENDING');
  const otherUsers = users.filter(u => u.status !== 'PENDING');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Verify Users</h1>
        <p className="text-slate-500">Approve new signups to grant them access to the system.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals ({pendingUsers.length})</CardTitle>
          <CardDescription>These users have signed up but cannot log in until you verify them.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              <CheckCircle className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              No pending users to verify.
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pendingUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-slate-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button 
                          size="sm" 
                          onClick={() => handleVerify(user.id)}
                          disabled={verifyingId === user.id}
                        >
                          {verifyingId === user.id ? 'Verifying...' : 'Verify User'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {otherUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Other Users</CardTitle>
            <CardDescription>Users who are already active or inactive.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {otherUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          user.status === 'ACTIVE' 
                            ? 'bg-green-50 text-green-700 ring-green-600/20' 
                            : 'bg-red-50 text-red-700 ring-red-600/20'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
