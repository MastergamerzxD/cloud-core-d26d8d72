export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      invoices: {
        Row: {
          amount: number
          ccavenue_order_id: string | null
          ccavenue_tracking_id: string | null
          created_at: string
          due_date: string
          id: string
          invoice_number: string
          notes: string | null
          order_id: string | null
          paid_date: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          tax_amount: number | null
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          ccavenue_order_id?: string | null
          ccavenue_tracking_id?: string | null
          created_at?: string
          due_date: string
          id?: string
          invoice_number: string
          notes?: string | null
          order_id?: string | null
          paid_date?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          ccavenue_order_id?: string | null
          ccavenue_tracking_id?: string | null
          created_at?: string
          due_date?: string
          id?: string
          invoice_number?: string
          notes?: string | null
          order_id?: string | null
          paid_date?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          billing_cycle: string
          ccavenue_order_id: string | null
          ccavenue_tracking_id: string | null
          created_at: string
          hostname: string | null
          id: string
          notes: string | null
          order_number: string
          os_template: string | null
          payment_date: string | null
          product_id: string
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          billing_cycle: string
          ccavenue_order_id?: string | null
          ccavenue_tracking_id?: string | null
          created_at?: string
          hostname?: string | null
          id?: string
          notes?: string | null
          order_number: string
          os_template?: string | null
          payment_date?: string | null
          product_id: string
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          billing_cycle?: string
          ccavenue_order_id?: string | null
          ccavenue_tracking_id?: string | null
          created_at?: string
          hostname?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          os_template?: string | null
          payment_date?: string | null
          product_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          bank_ref_no: string | null
          ccavenue_order_id: string | null
          ccavenue_tracking_id: string | null
          created_at: string
          currency: string | null
          id: string
          invoice_id: string | null
          order_id: string | null
          payment_mode: string | null
          raw_response: Json | null
          response_code: string | null
          response_message: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          bank_ref_no?: string | null
          ccavenue_order_id?: string | null
          ccavenue_tracking_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          invoice_id?: string | null
          order_id?: string | null
          payment_mode?: string | null
          raw_response?: Json | null
          response_code?: string | null
          response_message?: string | null
          status: string
          user_id: string
        }
        Update: {
          amount?: number
          bank_ref_no?: string | null
          ccavenue_order_id?: string | null
          ccavenue_tracking_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          invoice_id?: string | null
          order_id?: string | null
          payment_mode?: string | null
          raw_response?: Json | null
          response_code?: string | null
          response_message?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          bandwidth_tb: number
          cpu_cores: number
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_monthly: number
          price_quarterly: number | null
          price_yearly: number | null
          product_type: string
          ram_gb: number
          slug: string
          storage_gb: number
          updated_at: string
          virtualizor_plan_id: number | null
        }
        Insert: {
          bandwidth_tb: number
          cpu_cores: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_monthly: number
          price_quarterly?: number | null
          price_yearly?: number | null
          product_type: string
          ram_gb: number
          slug: string
          storage_gb: number
          updated_at?: string
          virtualizor_plan_id?: number | null
        }
        Update: {
          bandwidth_tb?: number
          cpu_cores?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_monthly?: number
          price_quarterly?: number | null
          price_yearly?: number | null
          product_type?: string
          ram_gb?: number
          slug?: string
          storage_gb?: number
          updated_at?: string
          virtualizor_plan_id?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          postal_code: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_number: string
          updated_at: string
          user_id: string
          vps_instance_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_number: string
          updated_at?: string
          user_id: string
          vps_instance_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          ticket_number?: string
          updated_at?: string
          user_id?: string
          vps_instance_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_vps_instance_id_fkey"
            columns: ["vps_instance_id"]
            isOneToOne: false
            referencedRelation: "vps_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          created_at: string
          id: string
          is_staff_reply: boolean | null
          message: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_staff_reply?: boolean | null
          message: string
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_staff_reply?: boolean | null
          message?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vps_instances: {
        Row: {
          created_at: string
          expires_at: string
          hostname: string
          id: string
          ip_address: string | null
          last_renewed_at: string | null
          order_id: string
          os_template: string | null
          panel_password_hash: string | null
          panel_username: string | null
          product_id: string
          status: Database["public"]["Enums"]["vps_status"]
          updated_at: string
          user_id: string
          virtualizor_vps_id: number | null
        }
        Insert: {
          created_at?: string
          expires_at: string
          hostname: string
          id?: string
          ip_address?: string | null
          last_renewed_at?: string | null
          order_id: string
          os_template?: string | null
          panel_password_hash?: string | null
          panel_username?: string | null
          product_id: string
          status?: Database["public"]["Enums"]["vps_status"]
          updated_at?: string
          user_id: string
          virtualizor_vps_id?: number | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          hostname?: string
          id?: string
          ip_address?: string | null
          last_renewed_at?: string | null
          order_id?: string
          os_template?: string | null
          panel_password_hash?: string | null
          panel_username?: string | null
          product_id?: string
          status?: Database["public"]["Enums"]["vps_status"]
          updated_at?: string
          user_id?: string
          virtualizor_vps_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vps_instances_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vps_instances_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invoice_number: { Args: never; Returns: string }
      generate_order_number: { Args: never; Returns: string }
      generate_ticket_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      invoice_status: "pending" | "paid" | "overdue" | "cancelled" | "refunded"
      order_status:
        | "pending"
        | "paid"
        | "provisioning"
        | "active"
        | "suspended"
        | "cancelled"
        | "expired"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status:
        | "open"
        | "in_progress"
        | "waiting_reply"
        | "resolved"
        | "closed"
      vps_status:
        | "creating"
        | "running"
        | "stopped"
        | "suspended"
        | "terminated"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      invoice_status: ["pending", "paid", "overdue", "cancelled", "refunded"],
      order_status: [
        "pending",
        "paid",
        "provisioning",
        "active",
        "suspended",
        "cancelled",
        "expired",
      ],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: [
        "open",
        "in_progress",
        "waiting_reply",
        "resolved",
        "closed",
      ],
      vps_status: ["creating", "running", "stopped", "suspended", "terminated"],
    },
  },
} as const
