import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 20px;
  background-color: #333;
  color: white;
  text-align: center;
`;

const SocialLink = styled.a`
  margin: 0 10px;
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
          <h6>Made with ❤️️</h6>
            <p>
                &copy; 2024 Copy Pasta Purists
            </p>
          </footer>
    </FooterContainer>
  );
}

export default Footer;
