import styles from './Pagination.module.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const activeStyles = {
    color: '#bebebe',
    borderBottom: '1px solid #bebebe',
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.Pagination}>
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <a
              style={currentPage === pageNumber ? activeStyles : null}
              onClick={(event) => paginate(event, pageNumber)}
              href='!#'
            >
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
