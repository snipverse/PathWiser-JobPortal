const API_BASE = import.meta.env.VITE_API_URL;
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
    try {
      const fetchWithCheck = async (url) => {
        const res = await fetch(`${API_BASE}${url}`, { credentials: 'include' });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status} for ${url}: ${text}`);
        }
        return res.json();
      };
      const [users, jobs, applications, companies] = await Promise.all([
        fetchWithCheck('/api/v1/admin/users'),
        fetchWithCheck('/api/v1/admin/jobs'),
        fetchWithCheck('/api/v1/admin/applications'),
        fetchWithCheck('/api/v1/admin/companies'),
      ]);
      setStats({
        users: users.users || [],
        jobs: jobs.jobs || [],
        applications: applications.applications || [],
        companies: companies.companies || [],
      });
    } catch (err) {
      setStats({ users: [], jobs: [], applications: [], companies: [] });
      alert('Admin API error: ' + err.message);
    } finally {
      setLoading(false);
    }
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
    await fetch(`${API_BASE}/api/v1/admin/${type}/${id}`, { method: 'DELETE', credentials: 'include' });
    fetchStats();
  };

  // Edit handlers (open a modal or alert for now)
  const handleEdit = (type) => (row) => {
    // You can replace this with a modal or form for editing
    alert(`Edit ${type}:\n` + JSON.stringify(row, null, 2));
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 sm:mb-8 text-center sm:text-left">Admin Dashboard</h1>
        {/* Responsive chart grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-10">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
            <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4 text-blue-600">Jobs, Users, Applications (Monthly)</h2>
            <Bar data={barData} />
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
            <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4 text-blue-600">Users by Role</h2>
            <Pie data={pieUserData} />
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
            <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4 text-blue-600">Applications by Status</h2>
            <Pie data={pieAppData} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100 mb-6 sm:mb-10">
          <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4 text-blue-600">Growth Trends</h2>
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
          onEdit={handleEdit('user')}
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
          data={stats.jobs.map(j => ({
            ...j,
            company: (j.company && typeof j.company === 'object' && j.company.name) ? j.company.name : (typeof j.company === 'string' ? j.company : ''),
          }))}
          onDelete={id => handleDelete('job', id)}
          onEdit={handleEdit('job')}
        />
        {/* Companies Table */}
        <AdminTable
          title="Companies"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'website', label: 'Website' },
            { key: 'location', label: 'Location' },
          ]}
          data={stats.companies.map(c => ({
            ...c,
            website: c.website || c.siteUrl || '',
          }))}
          onDelete={id => handleDelete('company', id)}
          onEdit={handleEdit('company')}
        />
        {/* Applications Table */}
        <AdminTable
          title="Applications"
          columns={[
            { key: 'applicant', label: 'Applicant' },
            { key: 'job', label: 'Job' },
            { key: 'status', label: 'Status' },
          ]}
          data={stats.applications.map(a => ({
            ...a,
            applicant: (a.applicant && typeof a.applicant === 'object')
              ? (a.applicant.fullname || a.applicant.email || (a.applicant._id || a.applicant))
              : (a.applicant || ''),
            job: (a.job && typeof a.job === 'object')
              ? (a.job.title || (a.job._id || a.job))
              : (a.job || ''),
          }))}
          onDelete={id => handleDelete('application', id)}
          onEdit={handleEdit('application')}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
