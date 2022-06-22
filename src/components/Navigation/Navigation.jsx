import { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';

class Navigation extends Component {
  render() {
    const categories = this.props.categories;
    return (
      <ul className={styles.list}>
        {categories &&
          categories.map(category => {
            return (
              <li className={styles.item} key={category.name}>
                <Link
                  to={`/${category.name}`}
                  className={styles.link}
                  activeClassName={styles['link--active']}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default Navigation;
