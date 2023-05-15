import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHome, faUser, faTools } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';

import { Link } from 'gatsby';

import '../scss/main.scss';

import ExternalLink from './external-link';

const Header = () => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      logo: file(absolutePath: { regex: "/logo.svg/" }) {
        publicURL
      }
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData(width: 160, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `);

  return (
    <header className="main-header text-center">
      <Navbar variant="light" expand="lg" className="d-flex flex-row flex-lg-column">
        <Navbar.Brand className="mr-lg-0">
          <Link to="/">
            <img src={data.logo.publicURL} className="header-logo" alt="budjb.dev" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="flex-column">
          <div className="d-block pt-3">
            <GatsbyImage
              image={data.avatar.childImageSharp.gatsbyImageData}
              className="profile-image mb-3 rounded-circle mx-auto"
            />

            <div className="bio mb-3 text-justify">
              Hi, my name is Bud Byrd. I write software on clouds that runs clouds. I really enjoy learning new things,
              taking pictures, and making great Texas BBQ.
            </div>

            <ul className="social-list list-inline py-3 mx-auto">
              <li className="list-inline-item">
                <ExternalLink href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}>
                  <FontAwesomeIcon icon={faTwitter} />
                </ExternalLink>
              </li>
              <li className="list-inline-item">
                <ExternalLink href={`https://www.linkedin.com/in/${data.site.siteMetadata.social.linkedin}`}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </ExternalLink>
              </li>
              <li className="list-inline-item">
                <ExternalLink href={`https://github.com/${data.site.siteMetadata.social.github}`}>
                  <FontAwesomeIcon icon={faGithub} />
                </ExternalLink>
              </li>
            </ul>
            <hr />
          </div>

          <Nav className="d-inline-block text-left my-0 mx-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon icon={faHome} className="mr-2" fixedWidth />
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/projects">
                <FontAwesomeIcon icon={faTools} className="mr-2" fixedWidth />
                Projects
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon icon={faUser} className="mr-2" fixedWidth />
                About Me
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="text-center py-3 bg-dark text-gray-500">
      <p className="mb-0">
        <small className="copyright">Copyright &copy; 2020 Bud Byrd.</small>
      </p>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <div className="d-block d-lg-flex flex-row">
        <Header />
        <main className="mvh-100 d-block flex-grow-1 mt-lg-0 position-relative">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
