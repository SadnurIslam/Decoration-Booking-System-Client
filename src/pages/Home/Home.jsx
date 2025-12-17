import React from 'react';
import Hero from './Hero';
import ServicesSection from './ServicesSection';
import TopDecorators from './TopDecorators';
import CoverageMap from './CoverageMap';

const Home = () => {
    return (
        <div className="space-y-28">
            <Hero></Hero>
            <ServicesSection></ServicesSection>
            <TopDecorators></TopDecorators>
            <CoverageMap></CoverageMap>
        </div>
    );
};

export default Home;