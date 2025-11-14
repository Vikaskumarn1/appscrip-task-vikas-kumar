export async function GET(request) {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    })

    console.log('FakeStore API Response Status:', response.status)

    if (!response.ok) {
      console.error(`FakeStore API Error: ${response.status} ${response.statusText}`)
      return new Response(JSON.stringify({ error: 'API Error', status: response.status }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const products = await response.json()
    console.log('Products fetched:', products.length)

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in /api/products:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
