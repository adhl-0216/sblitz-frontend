'use client'
import Container from '@mui/material/Container';
import AppAppBar from '@/components/AppAppBar';
import Features from '@/components/Features';
import { Divider } from '@mui/material';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';


export default function Home() {
  return (
    <Container maxWidth="lg">
      <AppAppBar />
      <Hero />
      <div>
        <Features />
        <Divider />
        <Footer />
      </div>
    </Container>
  );
}
