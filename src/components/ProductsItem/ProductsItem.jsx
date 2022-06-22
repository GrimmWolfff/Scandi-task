import { Component } from 'react';
import { connect } from 'react-redux';
import DelayLink from '../DelayLink';

import { addProductSuccess } from '../../redux/cart/cart_action';

import styles from './ProductsItem.module.css';

import { ReactComponent as EmpryCart } from '../../images/empty-cart.svg';

class ProductsItem extends Component {
  addToCart = product => {
    this.props.dispatchToCart(product);

    alert('Added to cart');
  };

  render() {
    const product = this.props.product;
    const categoryName = this.props.category;
    const stockStatus = product.inStock
      ? styles.item
      : `${styles.item} ${styles['item--none']}`;
    return (
      <li className={stockStatus}>
        <DelayLink
          to={{
            pathname: `/${categoryName}/${product.id}`,
            state: { from: this.props.location },
          }}
          // onDelayStart={() => { /* fadeout class */ }}
          // onDelayEnd={() => { /* fadein class */ }}
          delay={800}
          className={styles.item__link}
        >
          <article>
            <div className={styles.item__thumb}>
              <img
                src={product.gallery[0]}
                className={styles.item__image}
                title={product.name}
                alt={product.name}
                width="356"
                height="338"
                loading="lazy"
              />
            </div>

            {!product.inStock && (
              <p className={styles.item__out}>Out of stock</p>
            )}

            <div className={styles.item__content}>
              <h2 className={styles.item__title}>{product.name}</h2>
              <p className={styles.item__price}>${product.prices[0].amount}</p>
            </div>
          </article>
        </DelayLink>

        {product.inStock && (
          <button
            type="button"
            className={styles.item__cart}
            onClick={() => this.addToCart(product)}
            title="Add to cart"
            alt="Add to cart"
          >
            <EmpryCart />
          </button>
        )}
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchToCart: product => dispatch(addProductSuccess(product)),
});

export default connect(null, mapDispatchToProps)(ProductsItem);
