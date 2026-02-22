import React, { useState } from 'react';

// Utils and Data
import { DRIVE_DATABASE } from './data/drives';
import { DriveLogicEngine } from './utils/engine';

// Layout Components
import Navbar from './components/Layout/Navbar';
import AboutModal from './components/Layout/AboutModal';
import HelpModal from './components/Layout/HelpModal';

// Shared Components
import AIAssistant from './components/Shared/AIAssistant';
import LoadingScreen from './components/Shared/LoadingScreen';

// Page Components
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import CustomerDetailsPage from './components/Pages/CustomerDetailsPage';
import DriveSelectionPage from './components/Pages/DriveSelectionPage';
import ReportPage from './components/Pages/ReportPage';

const App = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [user, setUser] = useState(null);
    
    const [projectDetails, setProjectDetails] = useState({
        projectName: '', 
        customer: '', 
        location: '', 
        city: '', 
        country: '', 
        date: new Date().toISOString().split('T')[0]
    });
    
    const [inputs, setInputs] = useState({
        voltage: 400, 
        powerKw: 11, 
        temp: 40, 
        altitude: 100, 
        cableLength: 50, 
        family: 'All'
    });
    
    const [matches, setMatches] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedDrive, setSelectedDrive] = useState(null);

    const changeStep = (newStep, data = null) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if(data) setSelectedDrive(data);
            setStep(newStep);
            window.scrollTo(0, 0);
        }, 1500);
    };

    const calculateMatches = () => {
        const results = DriveLogicEngine.findBestMatch(inputs, DRIVE_DATABASE);
        setMatches(results);
    };

    const goHome = () => {
        setStep(1);
        setHasSearched(false);
        setMatches([]);
        setUser(null);
    };

    return (
        <React.Fragment>
            {loading && <LoadingScreen />}
            
            {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
            {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

            <div className={`font-sans text-gray-900 ${loading ? 'blur-sm pointer-events-none' : ''}`}>
                <Navbar 
                    onHome={() => step === 1 ? null : goHome()} 
                    setShowAbout={setShowAbout} 
                    setShowHelp={setShowHelp} 
                />

                {step > 1 && <AIAssistant step={step} />}

                {step === 1 && <HomePage onStart={() => changeStep(2)} />}
                
                {step === 2 && (
                    <LoginPage 
                        onLogin={() => { setUser({name: 'Engineer'}); changeStep(3); }} 
                        onBack={() => setStep(1)} 
                    />
                )}
                
                {step === 3 && (
                    <CustomerDetailsPage 
                        details={projectDetails} 
                        setDetails={setProjectDetails} 
                        onNext={() => changeStep(4)} 
                        onBack={() => setStep(1)} 
                    />
                )}
                
                {step === 4 && (
                    <DriveSelectionPage 
                        inputs={inputs} 
                        setInputs={setInputs} 
                        onCalculate={calculateMatches} 
                        matches={matches} 
                        hasSearched={hasSearched} 
                        setHasSearched={setHasSearched} 
                        onBack={() => changeStep(3)} 
                        setStep={(s, drive) => changeStep(s, drive)} 
                    />
                )}
                
                {step === 5 && selectedDrive && (
                    <ReportPage 
                        drive={selectedDrive} 
                        inputs={inputs} 
                        details={projectDetails} 
                        onBack={() => changeStep(4)} 
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default App;
