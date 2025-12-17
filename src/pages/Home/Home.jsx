import React from 'react';
import Hero from './Hero';
import ServicesSection from './ServicesSection';

const Home = () => {
    return (
        <div className="space-y-28">
            <Hero></Hero>
            <ServicesSection></ServicesSection>
        </div>
    );
};

export default Home;