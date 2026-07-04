import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layout/AppLayout';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Services } from './pages/Services/Services';
import { ServiceDetails } from './pages/ServiceDetails/ServiceDetails';
import { FAQ } from './pages/FAQ/FAQ';
import { Contact } from './pages/Contact/Contact';
import { BookAppointment } from './pages/BookAppointment/BookAppointment';
import { NotFound } from './pages/NotFound/NotFound';

import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetails />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="book" element={<BookAppointment />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
