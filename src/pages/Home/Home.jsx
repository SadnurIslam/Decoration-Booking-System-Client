import React from 'react';
import Hero from './Hero';
import ServicesSection from './ServicesSection';
import TopDecorators from './TopDecorators';

const Home = () => {
    return (
        <div className="space-y-28">
            <Hero></Hero>
            <ServicesSection></ServicesSection>
            <TopDecorators></TopDecorators>
        </div>
    );
};

export default Home;