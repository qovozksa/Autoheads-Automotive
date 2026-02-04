
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Inventory from './components/Inventory';
import Craftsmanship from './components/Craftsmanship';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatSpecialist from './components/ChatSpecialist';
import Dashboard from './components/Dashboard';
import { INITIAL_CARS, INITIAL_REVIEWS } from './constants';
import { CarModel, Review } from './types';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState<CarModel[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load from local storage or defaults
  useEffect(() => {
    const savedCars = localStorage.getItem('autoheads_cars');
    const savedReviews = localStorage.getItem('autoheads_reviews');
    
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    } else {
      setCars(INITIAL_CARS);
      localStorage.setItem('autoheads_cars', JSON.stringify(INITIAL_CARS));
    }

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('autoheads_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const updateCars = (newCars: CarModel[]) => {
    setCars(newCars);
    localStorage.setItem('autoheads_cars', JSON.stringify(newCars));
  };

  const updateReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('autoheads_reviews', JSON.stringify(newReviews));
  };

  const heroCars = cars.filter(c => c.showInHero);
  const inventoryCars = cars.filter(c => c.showInInventory);

  if (isAdmin) {
    return (
      <Dashboard 
        cars={cars} 
        setCars={updateCars} 
        reviews={reviews} 
        setReviews={updateReviews} 
        onExit={() => setIsAdmin(false)} 
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <Navbar />
      <main>
        <Hero flagshipCars={heroCars} />
        <div className="h-24 bg-gradient-to-b from-black to-[#0D0D0D]" />
        <Inventory inventoryCars={inventoryCars} />
        <Experience />
        <Craftsmanship />
        <Testimonials reviews={reviews} />
      </main>
      <Footer onDashboardClick={() => setIsAdmin(true)} />
      <ChatSpecialist />
    </div>
  );
};

export default App;
