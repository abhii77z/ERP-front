'use client';
import { useEffect, useState } from 'react';
import { employeeService } from '@/src/services/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, MoreHorizontal } from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeeService.getEmployees().then(data => {
      setEmployees(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Employees</h2>
          <p className="text-slate-500">Manage employee accounts and roles</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Employee</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-4">Loading...</TableCell></TableRow>
              ) : (
                employees.map(e => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium text-slate-900">{e.name}</TableCell>
                    <TableCell>{e.employeeId}</TableCell>
                    <TableCell>{e.department}</TableCell>
                    <TableCell><Badge variant="outline">{e.role}</Badge></TableCell>
                    <TableCell><Badge variant="success">{e.status}</Badge></TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
