import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHome, faUser, faHeart, faScroll } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';
import Image from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import { Link } from 'gatsby';

import '../scss/main.scss';

import ExternalLink from './ExternalLink';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
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
    <>
      <header className="header text-center">
        <Navbar variant="dark" expand="lg">
          <Navbar.Toggle>
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>

          <Navbar.Collapse className="flex-column">
            <div className="profile-section pt-3 pt-lg-0">
              <Link to="/">
                <Image
                  fixed={data.avatar.childImageSharp.fixed}
                  className="profile-image mb-3 rounded-circle mx-auto"
                />
              </Link>

              <div className="bio mb-3 text-justify">
                Hi, my name is Bud Byrd. I write software on clouds that runs clouds. I really enjoy learning new
                things, taking pictures, and making great Texas BBQ.
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

            <Nav className="flex-column text-left" activeKey="/">
              <Nav.Item>
                <Nav.Link as={Link} href="/">
                  <FontAwesomeIcon icon={faHome} className="mr-2" fixedWidth />
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="#">
                  <FontAwesomeIcon icon={faUser} className="mr-2" fixedWidth />
                  About Me
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="#">
                  <FontAwesomeIcon icon={faScroll} className="mr-2" fixedWidth />
                  Resume
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <div className="main-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
        <main className="flex-grow-1 position-relative">{children}</main>
        <footer class="footer text-center py-2 theme-bg-dark">
          <p className="mb-0">
            <small class="copyright">Copyright &copy; 2020 Bud Byrd.</small>
          </p>
          <p>
            <small class="copyright">
              Designed with <FontAwesomeIcon icon={faHeart} style={{ color: '#fb866a' }} /> by{' '}
              <ExternalLink href="http://themes.3rdwavemedia.com">Xiaoying Riley</ExternalLink> for developers.
            </small>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
