import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Appscrip - Product Listing Page',
  description: 'Shop the latest products with Appscrip. Browse our collection of quality items from around the world.',
  openGraph: {
    title: 'Appscrip - Premium Product Listing',
    description: 'Shop the latest products with Appscrip',
    type: 'website',
  },
}

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      cache: 'no-store', // Force fresh data (SSR)
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

function ProductCard({ product }) {
  return (
    <article className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={`${product.title} - Buy online at Appscrip`}
          width={200}
          height={200}
          priority={false}
          className={styles.productImage}
          quality={80}
        />
      </div>

      <div className={styles.productContent}>
        <h2 className={styles.productTitle}>{product.title}</h2>

        <p className={styles.productCategory}>{product.category}</p>

        <p className={styles.productDescription}>
          {product.description.substring(0, 80)}...
        </p>

        <div className={styles.productFooter}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span className={styles.rating}>⭐ {product.rating?.rate || 'N/A'}</span>
        </div>

        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </article>
  )
}

export default async function HomePage() {
  const products = await fetchProducts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Appscrip Product Listing',
            description: 'Premium product collection on Appscrip',
            url: 'https://appscrip.com',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: products.length,
              itemListElement: products.map((product, index) => ({
                '@type': 'Product',
                position: index + 1,
                name: product.title,
                image: product.image,
                description: product.description,
                price: product.price,
                priceCurrency: 'USD',
              })),
            },
          }),
        }}
      />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.heading}>Appscrip Store</h1>
          <p className={styles.tagline}>
            Discover Premium Products from Around the World
          </p>
        </header>

        <section className={styles.filterSection}>
          <h2 className={styles.filterTitle}>Products ({products.length})</h2>
        </section>

        {products.length > 0 ? (
          <section className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <div className={styles.noProducts}>
            <p>No products available at the moment. Please try again later.</p>
          </div>
        )}
      </main>
    </>
  )
}
