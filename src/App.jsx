import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const initialProducts = [
  { id: 1, name: "Everyday Canvas Tote", category: "Accessories", price: 32, color: "Natural", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85", description: "A roomy everyday tote for work, errands, and weekends." },
  { id: 2, name: "Classic Knit Sweater", category: "Men's wear", price: 68, color: "Oatmeal", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85", description: "A soft, comfortable layer with an easy, timeless fit." },
  { id: 3, name: "Ceramic Coffee Mug", category: "Home", price: 24, color: "Cream", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85", description: "A beautifully simple ceramic mug for your favorite drink." },
  { id: 4, name: "Relaxed Linen Shirt", category: "Women's wear", price: 58, color: "Ivory", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85", description: "Lightweight linen for warm days and effortless layering." },
  { id: 5, name: "Weekend Denim", category: "Men's wear", price: 64, color: "Indigo", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85", description: "Comfortable classic denim made for everyday wear." },
  { id: 6, name: "Soft Knit Throw", category: "Home", price: 74, color: "Natural", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85", description: "A cozy textured throw that brings warmth to your living room." },
  { id: 7, name: "Everyday Midi Dress", category: "Women's wear", price: 72, color: "Terracotta", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85", description: "A comfortable, versatile dress for everyday plans." },
  { id: 8, name: "Modern 340L Refrigerator", category: "Appliances", price: 649, color: "Silver", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=900&q=85", description: "Spacious cooling with adjustable shelves and a clean, modern finish." },
  { id: 9, name: "Ultra HD Smart Television", category: "Appliances", price: 799, color: "Black", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85", description: "Enjoy movies and streaming on a bright, immersive 4K screen." },
  { id: 10, name: "Minimal Leather Wallet", category: "Accessories", price: 45, color: "Chestnut", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85", description: "A compact, practical wallet with a clean timeless design." },
  { id: 11, name: "Family Size Refrigerator", category: "Appliances", price: 899, color: "Graphite", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85", description: "Extra room for groceries with an organized, easy-access interior." },
  { id: 12, name: "Soft Everyday Jacket", category: "Women's wear", price: 96, color: "Camel", image: "https://images.unsplash.com/photo-1548624149-f7c9bf2b78a0?auto=format&fit=crop&w=900&q=85", description: "A polished outer layer with a soft feel and modern shape." },
];

const categories = ["All", "Men's wear", "Women's wear", "Home", "Appliances", "Accessories"];
const money = (value) => `$${Number(value).toFixed(2)}`;
const readStored = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

function App() {
  const [products, setProducts] = useState(() => readStored("ff-products", initialProducts));
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [merchantPhoto, setMerchantPhoto] = useState(() => localStorage.getItem("ff-merchant-photo") || "");
  const [newProduct, setNewProduct] = useState({ name: "", category: "Men's wear", price: "", image: "", description: "" });
  const photoInput = useRef(null);

  useEffect(() => localStorage.setItem("ff-products", JSON.stringify(products)), [products]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((item) => (activeCategory === "All" || item.category === activeCategory) && (!query || `${item.name} ${item.category} ${item.color || ""}`.toLowerCase().includes(query)));
  }, [products, activeCategory, search]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null);
    setCartOpen(true);
  }

  function updateQuantity(id, amount) {
    setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }

  function login(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() === "admin@formfield.com" && password === "admin123") {
      setLoggedIn(true);
      setError("");
    } else setError("Email or password is incorrect. Use the demo credentials below.");
  }

  function uploadPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (file.size > 2 * 1024 * 1024) { setError("Please select an image smaller than 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = String(reader.result);
      setMerchantPhoto(image);
      localStorage.setItem("ff-merchant-photo", image);
      setError("");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function submitProduct(event) {
    event.preventDefault();
    if (!newProduct.name.trim() || !newProduct.image.trim() || Number(newProduct.price) <= 0) return;
    setProducts((items) => [{ ...newProduct, id: Date.now(), price: Number(newProduct.price), color: "Available now" }, ...items]);
    setNewProduct({ name: "", category: "Men's wear", price: "", image: "", description: "" });
  }

  return (
    <div className="store">
      <div className="announcement">Complimentary shipping on orders over $75 <span>✦</span> Thoughtfully chosen for everyday</div>
      <header className="header">
        <a className="brand" href="#home">form<span>&</span>field</a>
        <nav className="main-nav" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#footer">Contact</a></nav>
        <div className="header-actions"><button className="admin-link" onClick={() => { setAdminOpen(true); setError(""); }}>Admin</button><button className="cart-button" onClick={() => setCartOpen(true)}>Bag <span className="cart-count">{cartCount}</span></button></div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy"><p className="eyebrow">A home, thoughtfully lived in</p><h1>Make room<br />for lovely.</h1><p className="hero-description">Beautiful everyday essentials, considered clothing, and modern home finds—chosen to make life feel a little more special.</p><a className="primary-button" href="#shop">Discover the collection <span>↗</span></a><p className="hero-caption">FORM & FIELD — THE EVERYDAY EDITION</p></div>
          <div className="hero-photo" role="img" aria-label="Light-filled living room with a comfortable sofa, wall art, plants and a coffee table"><span className="photo-label">Made with care, chosen to stay.</span></div>
        </section>

        <section className="intro-strip"><span>Considered design</span><i>✦</i><span>Everyday comfort</span><i>✦</i><span>Good things that last</span></section>

        <section className="shop-section" id="shop"><div className="section-heading"><div><p className="eyebrow">Find your next favorite</p><h2>Shop the collection</h2></div><label className="search-box"><span>⌕</span><input type="search" placeholder="Search products" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search products" /></label></div>
          <div className="shop-controls"><div className="category-list" aria-label="Filter products by category">{categories.map((category) => <button key={category} className={activeCategory === category ? "category active" : "category"} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><span className="product-count">{visibleProducts.length} pieces</span></div>
          {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><button className="product-open" onClick={() => setSelectedProduct(product)} aria-label={`View ${product.name}`}><span className="product-image-wrap"><img src={product.image} alt={product.name} loading="lazy" /><span className="view-product">Discover item ↗</span></span><span className="product-info"><span><strong>{product.name}</strong><span className="product-meta">{product.color} · {product.category}</span></span><span className="price">{money(product.price)}</span></span></button><button className="quick-add" onClick={() => addToCart(product)}>Add to bag +</button></article>)}</div> : <p className="empty-search">No products found. Try a different search or category.</p>}
        </section>

        <section className="room-feature"><div className="room-feature-photo" role="img" aria-label="Warm neutral living room interior" /><div className="room-feature-copy"><p className="eyebrow">The art of feeling at home</p><h2>Thoughtful pieces.<br />A softer everyday.</h2><p>From comfortable clothing to pieces that make a room feel like yours, find the details that bring everyday life together.</p><a href="#shop" className="text-link">Shop home & living <span>→</span></a></div></section>
        <section className="story-section" id="story"><p className="eyebrow">Less, but better</p><h2>Objects for the way<br />you really live.</h2><p>We believe the best things are useful, beautiful, and made with intention. Welcome to a collection chosen for real life.</p></section>
      </main>

      <footer className="footer" id="footer"><div className="footer-brand"><a className="brand" href="#home">form<span>&</span>field</a><span>Thoughtful goods for everyday living.</span></div><div className="social-links" aria-label="Social media"><a href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="https://x.com/" target="_blank" rel="noreferrer">Twitter / X</a></div><p className="developer-credit">This system was Developed by <strong>HAVUGIMANA FELEX</strong></p><span className="copyright">© 2026 Form & Field</span></footer>

      {selectedProduct && <div className="modal-backdrop" onMouseDown={() => setSelectedProduct(null)}><section className="product-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close">×</button><img src={selectedProduct.image} alt={selectedProduct.name} /><div className="modal-product-copy"><p className="eyebrow">{selectedProduct.category}</p><h2>{selectedProduct.name}</h2><p className="product-meta">{selectedProduct.color}</p><p>{selectedProduct.description}</p><strong className="modal-price">{money(selectedProduct.price)}</strong><button className="primary-button" onClick={() => addToCart(selectedProduct)}>Add to bag</button></div></section></div>}

      {cartOpen && <div className="drawer-backdrop" onMouseDown={() => setCartOpen(false)}><aside className="cart-drawer" aria-label="Shopping bag" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Your bag ({cartCount})</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>{cart.length === 0 ? <div className="empty-cart"><p>Your bag is waiting for something lovely.</p><button className="text-button" onClick={() => setCartOpen(false)}>Continue browsing</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.color}</p><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)} aria-label="Remove one">−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label="Add one">+</button></div></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="drawer-footer"><div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="checkout-button" onClick={() => window.alert("Checkout can be connected to your payment provider.")}>Continue to checkout</button></div></>}</aside></div>}

      {adminOpen && <div className="modal-backdrop admin-backdrop" onMouseDown={() => { setAdminOpen(false); setError(""); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-label="Admin dashboard" onMouseDown={(event) => event.stopPropagation()}><div className="admin-heading"><div><p className="eyebrow">Store management</p><h2>{loggedIn ? "Admin dashboard" : "Admin login"}</h2></div><button className="modal-close" onClick={() => setAdminOpen(false)} aria-label="Close admin">×</button></div>{!loggedIn ? <form className="login-form" onSubmit={login}><p>Sign in to manage products and your merchant profile.</p><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="admin@formfield.com" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="Enter password" /></label>{error && <p className="form-error">{error}</p>}<button className="checkout-button" type="submit">Sign in</button><p className="demo-login">Demo: <strong>admin@formfield.com</strong> / <strong>admin123</strong></p><p className="security-note">Demo-only browser login; use server-side authentication before production.</p></form> : <div className="dashboard-content"><div className="dashboard-top"><p>Manage products and merchant profile.</p><button className="text-button" onClick={() => setLoggedIn(false)}>Log out</button></div><section className="merchant-section"><div className="merchant-photo">{merchantPhoto ? <img src={merchantPhoto} alt="Merchant profile" /> : <span>Merchant<br />photo</span>}</div><div><h3>Merchant profile photo</h3><p>Upload an image up to 2 MB, or remove the current photo.</p><button className="small-button" onClick={() => photoInput.current?.click()}>{merchantPhoto ? "Change photo" : "Upload photo"}</button>{merchantPhoto && <button className="remove-button" onClick={() => { setMerchantPhoto(""); localStorage.removeItem("ff-merchant-photo"); }}>Remove photo</button>}<input ref={photoInput} type="file" accept="image/*" onChange={uploadPhoto} hidden />{error && <p className="form-error">{error}</p>}</div></section><form className="add-product-form" onSubmit={submitProduct}><h3>Add a product</h3><div className="admin-form-grid"><label>Product name<input value={newProduct.name} onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })} required /></label><label>Category<select value={newProduct.category} onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select></label><label>Price (USD)<input type="number" min="0.01" step="0.01" value={newProduct.price} onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })} required /></label><label>Image URL<input type="url" value={newProduct.image} onChange={(event) => setNewProduct({ ...newProduct, image: event.target.value })} placeholder="https://..." required /></label><label className="full-field">Description<input value={newProduct.description} onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })} /></label></div><button className="small-button" type="submit">Add product</button></form><section className="manage-products"><h3>Products ({products.length})</h3>{products.map((product) => <div className="manage-product" key={product.id}><img src={product.image} alt="" /><span>{product.name}<small>{product.category} · {money(product.price)}</small></span><button className="remove-button" onClick={() => setProducts((items) => items.filter((item) => item.id !== product.id))}>Remove</button></div>)}</section></div>}</section></div>}
    </div>
  );
}

export default App;
