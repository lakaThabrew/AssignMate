import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, PlusCircle, Sparkles, Users, TrendingUp, AlertCircle, BookOpen } from 'lucide-react';
import axios from 'axios';
import * as THREE from 'three';
import { useRole } from '../App';

export default function Dashboard() {
  const { role } = useRole();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef();

  useEffect(() => {
    // Three.js Scene Setup for premium look
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      renderer.setSize(canvasRef.current.parentElement.clientWidth, 400);

      const particlesGeometry = new THREE.BufferGeometry();
      const count = 500;
      const positions = new Float32Array(count * 3);
      for(let i=0; i<count*3; i++) positions[i] = (Math.random() - 0.5) * 10;
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({ color: '#C1BFFF', size: 0.05, transparent: true, opacity: 0.4 });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      camera.position.z = 5;
      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
      };
      const animId = requestAnimationFrame(animate);

      const handleResize = () => {
        if (!canvasRef.current) return;
        const width = canvasRef.current.parentElement.clientWidth;
        renderer.setSize(width, 400);
        camera.aspect = width / 400;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    }
  }, [role]); // Re-init if role changes and section re-renders

  useEffect(() => {
    axios.get('http://localhost:5000/api/history')
      .then(res => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching history", err);
        setLoading(false);
      });
  }, []);

  const averageScore = history.length > 0 ? (history.reduce((acc, curr) => acc + curr.scorePredicted, 0) / history.length).toFixed(1) : 0;

  return (
    <div>
      <section className="hero-section" style={{ padding: 0, height: '400px', position: 'relative' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#fff', fontWeight: 800 }}>
            {role === 'student' ? 'Hello, Ready to ' : 'Manage Class '}
            <span className="header-accent">{role === 'student' ? 'Improve?' : 'Performance'}</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            {role === 'student' 
              ? 'Upload your work to receive instant AI evaluation based on lecturer rubrics.' 
              : 'Analyze batch submissions, identify common weakness patterns, and manage grading rubrics easily.'}
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {role === 'student' ? (
              <Link to="/upload" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                <Sparkles size={20} />
                Get New Feedback
              </Link>
            ) : (
              <>
                <Link to="/rubrics" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                  <PlusCircle size={20} />
                  New Rubric Template
                </Link>
                <Link to="/results" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>
                  <TrendingUp size={20} />
                  Batch Insights
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {role === 'lecturer' && (
        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Average Class Score</p>
                <h2 style={{ fontSize: '2rem', margin: '5px 0' }}>{averageScore}%</h2>
              </div>
              <TrendingUp size={32} color="var(--color-primary)" />
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Total Submissions</p>
                <h2 style={{ fontSize: '2rem', margin: '5px 0' }}>{history.length}</h2>
              </div>
              <Users size={32} color="var(--color-secondary)" />
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Common Concern</p>
                <h2 style={{ fontSize: '1.5rem', margin: '5px 0' }}>Methodology</h2>
              </div>
              <AlertCircle size={32} color="#e74c3c" />
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>{role === 'student' ? 'Your Recent Evaluations' : 'Latest Submissions'}</h2>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : history.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>No evaluations found.</p>
          <Link to="/upload" className="btn btn-primary"><PlusCircle size={20} /> Create the first one</Link>
        </div>
      ) : (
        <div className="grid-2">
          {history.map((evalDoc) => (
            <div key={evalDoc._id} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ background: 'var(--color-light)', padding: '15px', borderRadius: '12px', color: 'var(--color-accent)' }}>
                <FileText size={32} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '5px' }}>{evalDoc.assignmentName}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                  {new Date(evalDoc.createdAt).toLocaleString()}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span className={`badge ${evalDoc.scorePredicted >= 80 ? 'badge-success' : evalDoc.scorePredicted >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                    Score: {evalDoc.scorePredicted}/100
                  </span>
                  {evalDoc.missingCriteria && evalDoc.missingCriteria.length > 0 && (
                    <span className="badge badge-warning">{evalDoc.missingCriteria.length} Missing</span>
                  )}
                </div>
              </div>
              <Link to={`/results/${evalDoc._id}`} state={{ evaluation: evalDoc }} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
