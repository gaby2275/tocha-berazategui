export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          role: 'customer' | 'admin'
          address: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          role?: 'customer' | 'admin'
          address?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          role?: 'customer' | 'admin'
          address?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          stock: number
          images: Json | null
          wholesale_prices: Json | null
          category: string | null
          sku: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          stock?: number
          images?: Json | null
          wholesale_prices?: Json | null
          category?: string | null
          sku?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          stock?: number
          images?: Json | null
          wholesale_prices?: Json | null
          category?: string | null
          sku?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Json
          tracking_number: string | null
          payment_method: 'mercadopago' | 'paypal' | 'transfer'
          payment_status: 'pending' | 'paid' | 'failed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Json
          tracking_number?: string | null
          payment_method: 'mercadopago' | 'paypal' | 'transfer'
          payment_status?: 'pending' | 'paid' | 'failed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total?: number
          shipping_address?: Json
          tracking_number?: string | null
          payment_method?: 'mercadopago' | 'paypal' | 'transfer'
          payment_status?: 'pending' | 'paid' | 'failed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      deliveries: {
        Row: {
          id: string
          order_id: string
          status: 'pending' | 'in_transit' | 'delivered' | 'failed'
          location: Json | null
          estimated_delivery: string | null
          actual_delivery: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          status?: 'pending' | 'in_transit' | 'delivered' | 'failed'
          location?: Json | null
          estimated_delivery?: string | null
          actual_delivery?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          status?: 'pending' | 'in_transit' | 'delivered' | 'failed'
          location?: Json | null
          estimated_delivery?: string | null
          actual_delivery?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Made with Bob
