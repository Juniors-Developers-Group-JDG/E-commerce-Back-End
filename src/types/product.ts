export interface IProduct {
  _id?: string
  id?: string
  name: string
  description: string
  price: number
  images: string[]
  amount: number
  discount: number
  category: string[]
  created_at: Date
  _doc: IProduct
}

export interface IFile {
  path: string
}
