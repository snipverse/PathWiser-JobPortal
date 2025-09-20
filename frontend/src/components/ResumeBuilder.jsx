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
    padding: 32,
    fontFamily: 'Helvetica',
    fontSize: 12,
    backgroundColor: '#f8fafc',
    color: '#22223b',
    border: '2px solid #3b82f6',
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 2,
  },
  contact: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 2,
    textAlign: 'right',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 6,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#22223b',
  },
  value: {
    marginBottom: 6,
    color: '#374151',
  },
  bulletList: {
    marginLeft: 12,
    marginBottom: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  bulletPoint: {
    width: 8,
    fontSize: 14,
    color: '#3b82f6',
  },
  divider: {
    borderBottom: '1px solid #e5e7eb',
    marginVertical: 10,
  },
});




const ResumePDF = ({ data }) => {
  // Parse skills and projects as bullet lists
  const skillsArr = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);
  const projectsArr = (data.projects || '').split(',').map(p => p.trim()).filter(Boolean);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.name}>{data.fullname || 'Full Name'}</Text>
          </View>
          <View>
            <Text style={styles.contact}>{data.email || 'Email'}</Text>
            <Text style={styles.contact}>{data.phone || 'Phone'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.value}>{data.summary || 'Short professional summary...'}</Text>
        </View>
        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.value}>{data.education || 'Your education details...'}</Text>
        </View>
        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.value}>{data.experience || 'Your work experience...'}</Text>
        </View>
        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.bulletList}>
            {skillsArr.length > 0 ? skillsArr.map((skill, idx) => (
              <View key={idx} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.value}>{skill}</Text>
              </View>
            )) : <Text style={styles.value}>Your skills...</Text>}
          </View>
        </View>
        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={styles.bulletList}>
            {projectsArr.length > 0 ? projectsArr.map((proj, idx) => (
              <View key={idx} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.value}>{proj}</Text>
              </View>
            )) : <Text style={styles.value}>Your projects...</Text>}
          </View>
        </View>
      </Page>
    </Document>
  );
};


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
