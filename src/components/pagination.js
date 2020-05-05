import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, numPages, pathPrefix = '', className }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? pathPrefix : `${pathPrefix}/page/${currentPage - 1}`;
  const nextPage = `${pathPrefix}/page/${currentPage + 1}`;

  return (
    <div className={`pagination d-flex flex-row justify-content-between ${className || ''}`}>
      <div className="text-left" style={{ flex: '1 1 0' }}>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            <FontAwesomeIcon icon={faArrowLeft} /> Previous
          </Link>
        )}
      </div>
      <div className="text-center" style={{ flex: '1 1 0' }}>
        Page {currentPage} of {numPages}
      </div>
      <div className="text-right" style={{ flex: '1 1 0' }}>
        {!isLast && (
          <Link to={nextPage} rel="next">
            Next <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
