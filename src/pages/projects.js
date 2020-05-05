import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faBus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import ExternalLink from '../components/external-link';

const Project = ({ children, icon }) => {
  return (
    <section>
      <figure className="d-flex align-items-center justify-content-center display-1 m-lg-3 p-5 bg-dark text-white">
        <FontAwesomeIcon icon={icon} />
      </figure>
      <div className="flex-grow-1 p-3">{children}</div>
    </section>
  );
};

export default () => {
  return (
    <Layout>
      <SEO title="Projects" description="My personal projects." />
      <div className="projects limited-content-width my-3 mx-auto py-3 px-lg-3">
        <Project icon={faList}>
          <h1>
            <ExternalLink href="https://wishlist.budjb.com">Wishlist</ExternalLink>
          </h1>
          <p>
            I never know the answer to "what do you want for ______". Neither does my wife. I created the Wishlist web
            application to make it easier to share gift ideas between people from a central place.
          </p>
          <p>
            It also gave me a excellent opportunity to get my feet wet with the{' '}
            <ExternalLink href="https://en.wikipedia.org/wiki/MEAN_(solution_stack)">MEAN stack</ExternalLink>.
          </p>
          <p>
            It's free for anyone to use, so <ExternalLink href="https://wishlist.budjb.com">check it out!</ExternalLink>
          </p>
        </Project>

        <Project icon={faGlobe}>
          <h1>
            <ExternalLink href="https://github.com/budjb/http-requests">HTTP Requests</ExternalLink>
          </h1>
          <p>
            The HTTP Requests project is a collection of Java libraries that attempts to accomplish an HTTP client
            abstraction, much like Slf4J did for logging. Application authors can use this library to make HTTP requests
            and swap the backend as necessary. Library authors may use this library to not impose implementation
            requirements to users of their projects.
          </p>
          <p>
            The library includes bindings for Apache's HTTP client, Jersey 1, and Jersey 2. Integrations for Spring Boot
            are available, and conversions using Jackson and Groovy built-ins are provided.
          </p>
        </Project>

        <Project icon={faBus}>
          <h1>
            <ExternalLink href="https://github.com/budjb/grails-rabbitmq-native">
              RabbitMQ Native for Grails
            </ExternalLink>
          </h1>
          <p>
            The <code>rabbitmq-native</code> plugin for Grails allows for easy integration with the RabbitMQ message
            broker. It provides a powerful message conversion system and the ability to easy connect to multiple brokers
            within the same application.
          </p>
          <p>
            I used this plugin at my job to implement a message-based API gateway architecture, which gave us the
            ability to write microservies with automatic load balancing before the microservices architecture gained
            ground.
          </p>
        </Project>
      </div>
    </Layout>
  );
};
