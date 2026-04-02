import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useRole } from "../context/useRole";
import { Link } from "react-router-dom";
import { Sparkles, PlusCircle, TrendingUp } from "lucide-react";

export default function Hero() {
  const { role } = useRole();
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / 400,
        0.1,
        1000,
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(canvasRef.current.parentElement.clientWidth, 400);

      const particlesGeometry = new THREE.BufferGeometry();
      const count = 500;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++)
        positions[i] = (Math.random() - 0.5) * 10;
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const particlesMaterial = new THREE.PointsMaterial({
        color: "#C1BFFF",
        size: 0.05,
        transparent: true,
        opacity: 0.4,
      });
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
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    }
  }, [role]);

  return (
    <section
      className="hero-section"
      style={{
        padding: 0,
        height: "400px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        marginBottom: "3rem",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            marginBottom: "1rem",
            color: "#fff",
            fontWeight: 800,
          }}
        >
          {role === "student" ? "Hello, Ready to " : "Manage Class "}
          <span className="header-accent">
            {role === "student" ? "Improve?" : "Performance"}
          </span>
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2.5rem",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem auto",
          }}
        >
          {role === "student"
            ? "Upload your work to receive instant AI evaluation based on lecturer rubrics."
            : "Analyze batch submissions, identify common weakness patterns, and manage grading rubrics easily."}
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          {role === "student" ? (
            <Link
              to="/upload"
              className="btn btn-primary"
              style={{ padding: "1rem 2rem" }}
            >
              <Sparkles size={20} />
              Get New Feedback
            </Link>
          ) : (
            <>
              <Link
                to="/rubrics"
                className="btn btn-primary"
                style={{ padding: "1rem 2rem" }}
              >
                <PlusCircle size={20} />
                New Rubric Template
              </Link>
              <Link
                to="/results"
                className="btn btn-outline"
                style={{ padding: "1rem 2rem" }}
              >
                <TrendingUp size={20} />
                Batch Insights
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
