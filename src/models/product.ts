export interface Product {
  name: string
  corpName: string
  price: number
  mainImageUrl: string
  imageUrls: string[]
  sizes: string[]
  benefit: string[]
  promotion?: {
    title: string
    terms: string
  }
  delivery?: string
}
