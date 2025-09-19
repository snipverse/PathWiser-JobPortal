import { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
    backgroundColor: '#f8fafc',
    color: '#22223b',
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3b82f6',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    marginBottom: 6,
  },
  divider: {
    borderBottom: '1px solid #e5e7eb',
    marginVertical: 8,
  },
});




const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{data.fullname || 'Full Name'}</Text>
        <Text>{data.email || 'Email'} | {data.phone || 'Phone'}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.label}>Summary</Text>
        <Text style={styles.value}>{data.summary || 'Short professional summary...'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Education</Text>
        <Text style={styles.value}>{data.education || 'Your education details...'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Experience</Text>
        <Text style={styles.value}>{data.experience || 'Your work experience...'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Skills</Text>
        <Text style={styles.value}>{data.skills || 'Your skills...'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Projects</Text>
        <Text style={styles.value}>{data.projects || 'Your projects...'}</Text>
      </View>
    </Page>
  </Document>
);


ResumePDF.propTypes = {
  data: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    summary: PropTypes.string,
    education: PropTypes.string,
    experience: PropTypes.string,
    skills: PropTypes.string,
    projects: PropTypes.string,
  }).isRequired,
};

const ResumeBuilder = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
    projects: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 sm:p-8 my-8 bg-white/80 rounded-2xl shadow-lg border border-gray-100 glass-effect">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">Resume Builder</h1>
        <form className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input name="fullname" value={form.fullname} onChange={handleChange} placeholder="Your full name" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input name="email" value={form.email} onChange={handleChange} placeholder="Email address" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" />
            </div>
          </div>
          <div>
            <Label>Summary</Label>
            <Input name="summary" value={form.summary} onChange={handleChange} placeholder="Short professional summary" />
          </div>
          <div>
            <Label>Education</Label>
            <Input name="education" value={form.education} onChange={handleChange} placeholder="Your education details" />
          </div>
          <div>
            <Label>Experience</Label>
            <Input name="experience" value={form.experience} onChange={handleChange} placeholder="Your work experience" />
          </div>
          <div>
            <Label>Skills</Label>
            <Input name="skills" value={form.skills} onChange={handleChange} placeholder="Your skills (comma separated)" />
          </div>
          <div>
            <Label>Projects</Label>
            <Input name="projects" value={form.projects} onChange={handleChange} placeholder="Your projects" />
          </div>
        </form>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center">
          <Button variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto">Back</Button>
          <PDFDownloadLink document={<ResumePDF data={form} />} fileName="resume.pdf">
            {({ loading }) => (
              <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700">
                {loading ? 'Generating PDF...' : 'Download Resume as PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
