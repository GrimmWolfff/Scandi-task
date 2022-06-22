import { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';

import SingleProduct from '../../components/SingleProduct';
import Loader from '../../components/Loader';

import styles from './Product.module.css';

function getPathname() {
  return window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1, window.location.pathname.length);
}

class Product extends Component {
  componentDidMount() {
    document.title = `Product | Scandiweb Dev Test`;
  }
  render() {
    const { data } = this.props;
    const { loading, error } = data;
    console.log(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1, window.location.pathname.length))
    return (
      <main className={styles.main}>
        {data.product && <SingleProduct product={data.product} />}

        {error && <p>{JSON.stringify(data?.error?.message)}</p>}

        {loading && <Loader />}
      </main>
    );
  }
}
export default 
  graphql(
    gql`
    query GET_PRODUCT {
      product(id: "${getPathname()}") {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency{
            symbol
            label
          }
          amount
        }
        brand
      }
    }
    `,
  )(Product);
