export async function GET(request) {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })

    if (!response.ok) {
      console.error(`FakeStore API Error: ${response.status}`)
      return Response.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    const products = await response.json()
    return Response.json(products)
  } catch (error) {
    console.error('Error in /api/products:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
