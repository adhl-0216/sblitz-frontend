'use client'
import Container from '@mui/material/Container';
import AppAppBar from '@/components/home/AppAppBar';
import Features from '@/components/home/Features';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';


export default function Home() {
  return (
    <Container maxWidth="lg">
      <AppAppBar />
      <Hero />
      <div>
        <Features />
        <Footer />
      </div>
    </Container>
  );
}
