import React from 'react'
import HeroPage from './HeroPage'
import UseCases from './UseCases'
import ProblemSection from './ProblemSection'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'

const HomeSection = () => {
    return (
        <div>
            <HeroPage/>
            <UseCases/>
            <AboutSection />
            <ProblemSection/>
            {/* <ContactSection /> */}
        </div>
    )
}

export default HomeSection
