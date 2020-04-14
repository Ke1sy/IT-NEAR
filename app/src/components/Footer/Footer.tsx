import React from 'react';
import {Container} from "@material-ui/core";

const Footer = () => {
  return <footer className="footer" style={{background: '#3d4977'}}>
    <Container maxWidth="lg">
      <div style={{color: '#fff', padding: '5px 0', fontSize: 12}}>
            Copyright © 2020 Andreeva Alina
      </div>
    </Container>
  </footer>
};

export default Footer;
