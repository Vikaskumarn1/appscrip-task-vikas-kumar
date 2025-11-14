import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Appscrip - Product Listing Page',
  description: 'Shop the latest products with Appscrip. Browse our collection of quality items from around the world.',
}

export const revalidate = 3600

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://appscrip-task-vikas-kumar.vercel.app',
      },
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status}`)
      // Return mock data if API fails
      return getMockProducts()
    }

    const data = await response.json()
    return data || getMockProducts()
  } catch (error) {
    console.error('Error fetching products:', error)
    return getMockProducts()
  }
}

// Fallback mock data if API fails
function getMockProducts() {
  return [
    {
      id: 1,
      title: 'Fjallraven Backpack',
      price: 109.95,
      description: 'Your perfect pack for everyday adventures. Sleek yet stylish backpack.',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/81fPKd-2AzL._AC_SL1500_.jpg',
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit',
      price: 22.3,
      description: 'Slim-fitting style, contrast raglan long sleeve.',
      category: 'clothing',
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      rating: { rate: 4.1, count: 259 }
    },
    {
      id: 3,
      title: 'White Gold Plated Princess',
      price: 9.99,
      description: 'Classic Collection Engagement Wedding Ring.',
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      rating: { rate: 3, count: 52 }
    },
    {
      id: 4,
      title: 'Can_Bus Adapter',
      price: 15.13,
      description: 'Devices you love can be easily transferred here.',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/61IBBVJvPGL._AC_SY879_.jpg',
      rating: { rate: 2.2, count: 430 }
    }
  ]
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
          className={styles.productImage}
          quality={75}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/200?text=No+Image'
          }}
        />
      </div>

      <div className={styles.productContent}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productCategory}>{product.category}</p>
        <p className={styles.productDescription}>
          {product.description?.substring(0, 80)}...
        </p>

        <div className={styles.productFooter}>
          <span className={styles.price}>${product.price?.toFixed(2)}</span>
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
            url: 'https://appscrip-task-vikas-kumar.vercel.app',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: products?.length || 0,
              itemListElement: (products || []).map((product, index) => ({
                '@type': 'Product',
                position: index + 1,
                name: product.title,
                image: product.image,
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
          <h2 className={styles.filterTitle}>
            Products ({products?.length || 0})
          </h2>
        </section>

        {products && products.length > 0 ? (
          <section className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <div className={styles.noProducts}>
            <p>No products available. Please refresh the page.</p>
          </div>
        )}
      </main>
    </>
  )
}
