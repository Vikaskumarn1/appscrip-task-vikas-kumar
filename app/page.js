'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

const mockProducts = [
  {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    description: 'Your perfect pack for everyday adventures.',
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
]

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

export default function HomePage() {
  const [products, setProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        })

        console.log('API Response Status:', response.status)

        if (response.ok) {
          const data = await response.json()
          console.log('Data received:', data.length, 'products')

          if (data && Array.isArray(data) && data.length > 0) {
            setProducts(data)
            setError(null)
          } else {
            console.warn('No products in response, using mock data')
          }
        } else {
          console.warn(`API returned status ${response.status}, using mock data`)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </section>

        {!loading && products && products.length > 0 ? (
          <section className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : loading ? (
          <div className={styles.noProducts}>
            <p>Loading products...</p>
          </div>
        ) : (
          <div className={styles.noProducts}>
            <p>No products available. Please refresh the page.</p>
          </div>
        )}
      </main>
    </>
  )
}
