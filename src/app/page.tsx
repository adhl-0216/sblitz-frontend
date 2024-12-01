'use client'
import Container from '@mui/material/Container';
import AppAppBar from '@/components/home/AppAppBar';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import Session from 'supertokens-web-js/recipe/session';
import { useEffect } from 'react';

async function checkAndRedirect() {
  if (await Session.doesSessionExist()) {
    window.location.href = '/dashboard';
  }
}


export default function Home() {
  useEffect(() => {
    checkAndRedirect();
  }, [])
  return (
    <Container maxWidth="lg">
      <AppAppBar />
      <Hero />
      <div>
        {/* <Features /> */}
        <Footer />
      </div>
    </Container>
  );
}
