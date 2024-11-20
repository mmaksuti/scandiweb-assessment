import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';

class AllRoutes extends React.Component {
    render() {
        return (
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<></>} />
                </Routes>
            </Router>
        );
    }
}

export default AllRoutes;