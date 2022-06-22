import { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Container from './components/Container';
import Navbar from './components/Navbar';
import Loader from './components/Loader';


const Category = lazy(() =>
  import('./pages/Category' /* webpackChunkName: "category-page" */),
);

const Product = lazy(() =>
  import('./pages/Product' /* webpackChunkName: "product-page" */),
);

const Cart = lazy(() =>
  import('./pages/Cart' /* webpackChunkName: "cart-page" */),
);

class App extends Component {
  render() {
    const { data } = this.props;
    const { error, loading } = data;
    const all = data?.categories?.reduce((acc, item) => {
      acc.push(...item.products);
      return acc;
    }, []);

    return (
      <BrowserRouter>
      <Container>
        <Navbar categories={data.categories} />

        <Suspense fallback={<Loader />}>
            <Routes>
              {data.categories && (
                <Route path="/" element={
                  <Category
                    products={all}
                    error={data.error}
                    loading={data.loading}
                  />
                }/>
              )}

              {data.categories &&
                data.categories.map((category, idx) => {
                  return (
                    <Route path={`/${category.name}`} key={idx} element={
                      <Category
                        products={category.products}
                        name={category.name}
                        error={data.error}
                        loading={data.loading}
                      />
                    } />
                  );
                })}

              {data.categories &&
                data.categories.map((category, idx) => {
                  return (
                    <Route
                      path={`/${category.name}/:productId`}
                      key={idx}
                      element={<Product />}
                    />
                  );
                })}

              <Route path="/cart" element={<Cart />} />

            </Routes>
        </Suspense>
        {error && <p>{JSON.stringify(error.message)}</p>}
        {loading && <Loader />}
      </Container>
      </BrowserRouter>
    );
  }
}

export default graphql(
  gql`
    query {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          category
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
    }
  `,
)(App);
