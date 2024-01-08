import * as React from 'react';
import './scss/App.scss';
import {lazy, Suspense} from 'react';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';

const LottieRenderer = lazy(() => import('./components/LottieRenderer'));

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header/>
            <main role="main" className="content">
                <ErrorBoundary>
                    <LottieRenderer/>
                    <MainContent/>
                </ErrorBoundary>
            </main>
            <Footer/>
        </Suspense>
    );
};

export default App;
