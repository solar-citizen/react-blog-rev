import styles from './Pagination.module.css';

export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const baseStyles = {
    color: '#5a5a5a',
  };
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
              style={currentPage === pageNumber ? activeStyles : baseStyles}
              onClick={(event) => paginate(event, pageNumber)}
              href={`blog/page${pageNumber}`}
            >
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
