import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';

import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import AdminTable from './AdminTable';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const [stats, setStats] = useState({ users: [], jobs: [], applications: [], companies: [] });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    const [users, jobs, applications, companies] = await Promise.all([
      fetch('/api/v1/admin/users', { credentials: 'include' }).then(r => r.json()),
      fetch('/api/v1/admin/jobs', { credentials: 'include' }).then(r => r.json()),
      fetch('/api/v1/admin/applications', { credentials: 'include' }).then(r => r.json()),
      fetch('/api/v1/admin/companies', { credentials: 'include' }).then(r => r.json()),
    ]);
    setStats({
      users: users.users || [],
      jobs: jobs.jobs || [],
      applications: applications.applications || [],
      companies: companies.companies || [],
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  // Delete handlers
  const handleDelete = async (type, id) => {
    await fetch(`/api/v1/admin/${type}/${id}`, { method: 'DELETE', credentials: 'include' });
    fetchStats();
  };

  // Bar Chart: Number of jobs, users, applications over months
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' }));
  const countByMonth = (arr, key = 'createdAt') => {
    const counts = Array(12).fill(0);
    arr.forEach(item => {
      const d = new Date(item[key]);
      if (!isNaN(d)) counts[d.getMonth()]++;
    });
    return counts;
  };
  const barData = {
    labels: months,
    datasets: [
      { label: 'Jobs', data: countByMonth(stats.jobs), backgroundColor: '#3b82f6' },
      { label: 'Users', data: countByMonth(stats.users), backgroundColor: '#10b981' },
      { label: 'Applications', data: countByMonth(stats.applications), backgroundColor: '#f59e42' },
    ],
  };

  // Pie Chart: Users by role, Applications by status
  const userRoleCounts = stats.users.reduce((acc, u) => { acc[u.role] = (acc[u.role] || 0) + 1; return acc; }, {});
  const appStatusCounts = stats.applications.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {});
  const pieUserData = {
    labels: Object.keys(userRoleCounts),
    datasets: [{ data: Object.values(userRoleCounts), backgroundColor: ['#3b82f6', '#10b981', '#f59e42'] }],
  };
  const pieAppData = {
    labels: Object.keys(appStatusCounts),
    datasets: [{ data: Object.values(appStatusCounts), backgroundColor: ['#f59e42', '#10b981', '#ef4444'] }],
  };

  // Line Chart: Growth trends
  const lineData = {
    labels: months,
    datasets: [
      { label: 'Users', data: countByMonth(stats.users), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true },
      { label: 'Jobs', data: countByMonth(stats.jobs), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true },
      { label: 'Applications', data: countByMonth(stats.applications), borderColor: '#f59e42', backgroundColor: 'rgba(245,158,66,0.1)', fill: true },
    ],
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="font-semibold text-lg mb-4 text-blue-600">Jobs, Users, Applications (Monthly)</h2>
            <Bar data={barData} />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="font-semibold text-lg mb-4 text-blue-600">Users by Role</h2>
            <Pie data={pieUserData} />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="font-semibold text-lg mb-4 text-blue-600">Applications by Status</h2>
            <Pie data={pieAppData} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-10">
          <h2 className="font-semibold text-lg mb-4 text-blue-600">Growth Trends</h2>
          <Line data={lineData} />
        </div>
        {/* Users Table */}
        <AdminTable
          title="Users"
          columns={[
            { key: 'fullname', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
          ]}
          data={stats.users}
          onDelete={id => handleDelete('user', id)}
        />
        {/* Jobs Table */}
        <AdminTable
          title="Jobs"
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'company', label: 'Company' },
            { key: 'location', label: 'Location' },
            { key: 'salary', label: 'Salary' },
          ]}
          data={stats.jobs.map(j => ({ ...j, company: j.company?.name || j.company || '' }))}
          onDelete={id => handleDelete('job', id)}
        />
        {/* Companies Table */}
        <AdminTable
          title="Companies"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'location', label: 'Location' },
          ]}
          data={stats.companies}
          onDelete={id => handleDelete('company', id)}
        />
        {/* Applications Table */}
        <AdminTable
          title="Applications"
          columns={[
            { key: 'applicant', label: 'Applicant' },
            { key: 'job', label: 'Job' },
            { key: 'status', label: 'Status' },
          ]}
          data={stats.applications.map(a => ({ ...a, applicant: a.applicant?.fullname || a.applicant || '', job: a.job?.title || a.job || '' }))}
          onDelete={id => handleDelete('application', id)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
