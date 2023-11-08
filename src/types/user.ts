export interface IUser {
  _id?: string
  name: string
  email: string
  password: string
  purchaseHistory: PurchaseHistoryItem[]
  profilePhoto: string
  created_at: Date
}
export interface PurchaseHistoryItem {
  purchaseDate: Date
  item: PurchaseItem[]
  totalAmount: number
}
export interface PurchaseItem {
  productId: string
  productName: string
  quantity: number
  price: number
}
