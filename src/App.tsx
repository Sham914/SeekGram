import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CollegeDirectory from './components/CollegeDirectory';
import CollegeDetails from './components/CollegeDetails';
import EventHub from './components/EventHub';
import KeamPredictor from './components/KeamPredictor';
import Footer from './components/Footer';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';

function App() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        checkAdminStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdminStatus(userId) {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('admins')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return;
    }
    
    setIsAdmin(!!data);
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar session={session} isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="/colleges" element={<CollegeDirectory />} />
          <Route path="/college/:id" element={<CollegeDetails />} />
          <Route path="/events" element={<EventHub />} />
          <Route path="/predictor" element={<KeamPredictor />} />
          <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/" />} />
          <Route path="/profile" element={session ? <Profile /> : <Navigate to="/auth" />} />
          <Route 
            path="/admin" 
            element={
              session && isAdmin ? <AdminPanel /> : <Navigate to="/auth" />
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;