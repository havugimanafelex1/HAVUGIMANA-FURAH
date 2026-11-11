import { useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Everyday Canvas Tote",
    category: "Accessories",
    price: 32,
    color: "Sand",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    name: "Classic Crew Sweater",
    category: "Clothing",
    price: 68,
    color: "Oatmeal",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "Studio Ceramic Mug",
    category: "Home",
    price: 24,
    color: "Cream",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    name: "Minimal Leather Wallet",
    category: "Accessories",
    price: 45,
    color: "Chestnut",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 5,
    name: "Relaxed Linen Shirt",
    category: "Clothing",
    price: 58,
    color: "White",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    name: "Soft Knit Throw",
    category: "Home",
    price: 74,
    color: "Natural",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
  },
];

const categories = ["All", "Clothing", "Accessories", "Home"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(productId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function checkout() {
    window.alert(
      "Thanks for shopping! Checkout can be connected to your payment provider.",
    );
  }

  return (
    <div className="store">
      <div className="announcement">
        Free shipping on orders over $75 <span>·</span> Thoughtfully made for everyday
      </div>

      <header className="header">
        <a className="brand" href="#" aria-label="Form and Field home">
          form<span>&</span>field
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#about">Our story</a>
          <a href="#footer">Contact</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
          aria-label={`Open shopping bag, ${cartCount} items`}
        >
          Bag <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">The everyday collection</p>
            <h1>Good things.<br />Made to last.</h1>
            <p className="hero-description">
              Considered essentials for slower mornings, well-lived days, and
              everything in between.
            </p>
            <a className="primary-button" href="#shop">Explore the collection</a>
          </div>
          <div className="hero-image" role="img" aria-label="Warm, thoughtfully designed living space" />
          <div className="hero-note">Made with care, chosen to stay.</div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A little bit of lovely</p>
              <h2>Shop the collection</h2>
            </div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search products"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
              />
            </label>
          </div>

          <div className="shop-controls">
            <div className="category-list" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "category active" : "category"}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="product-count">{visibleProducts.length} products</span>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img className="product-image" src={product.image} alt={product.name} />
                    <button
                      className="quick-add"
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      +
                    </button>
                  </div>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.color} · {product.category}</p>
                    </div>
                    <span className="price">${product.price}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-search">No products found. Try another search.</p>
          )}
        </section>

        <section className="story-section" id="about">
          <p className="eyebrow">Less, but better</p>
          <h2>Objects for the way<br />you really live.</h2>
          <p>
            We believe the best things are useful, beautiful, and made with
            intention. Find your new everyday favorites.
          </p>
        </section>
      </main>

      <footer className="footer" id="footer">
        <a className="brand" href="#">form<span>&</span>field</a>
        <span>Thoughtful goods for everyday living.</span>
        <span>© 2025 Form & Field</span>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onMouseDown={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            aria-label="Shopping bag"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2>Your bag ({cartCount})</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your bag is taking a little break.</p>
                <button className="text-button" onClick={() => setCartOpen(false)}>
                  Keep exploring
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.color}</p>
                        <div className="quantity-control">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <strong>${item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

                <div className="drawer-footer">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </div>
                  <p>Shipping and taxes calculated at checkout.</p>
                  <button className="checkout-button" onClick={checkout}>
                    Continue to checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
