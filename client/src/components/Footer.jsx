import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 0px;
  background-color: transparent;
  color: white;
  text-align: center;
  width: 100vw;
  position:absolute;
  left:0;
  bottom:0;
  right:0;
`;

const SocialLink = styled.a`
  margin: 0 2px;
  color: white;
  font-size: 1.5em;

  &:hover {
    color: #007bff;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <SocialLink href="https://github.com/CarlosLavayenJr/GoodGameOrg" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </SocialLink>
        <footer className="footer">
          <p>Made with ❤️️ &copy; 2024 Copy Pasta Purists</p>
          </footer>
    </FooterContainer>
  );
}

export default Footer;
