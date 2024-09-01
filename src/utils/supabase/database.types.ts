export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ingredients: {
        Row: {
          icon: string
          id: string
          name: string
          quantity: number
          recipe_id: string
          unit: string
        }
        Insert: {
          icon: string
          id?: string
          name: string
          quantity: number
          recipe_id: string
          unit: string
        }
        Update: {
          icon?: string
          id?: string
          name?: string
          quantity?: number
          recipe_id?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      instructions: {
        Row: {
          id: string
          instruction: string
          recipe_id: string
          step_number: number
        }
        Insert: {
          id?: string
          instruction: string
          recipe_id: string
          step_number: number
        }
        Update: {
          id?: string
          instruction?: string
          recipe_id?: string
          step_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "instructions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          color: string
          created_at: string
          day: string
          day_as_number: number
          icon: string
          id: string
          meal: string
          name: string
          user_id: string
        }
        Insert: {
          color: string
          created_at?: string
          day: string
          day_as_number?: number
          icon: string
          id?: string
          meal: string
          name: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          day?: string
          day_as_number?: number
          icon?: string
          id?: string
          meal?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          id: string
          label: string
          user_id: string
        }
        Insert: {
          id?: string
          label: string
          user_id: string
        }
        Update: {
          id?: string
          label?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "options_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          cook_time: number
          created_at: string
          day_of_the_week: number
          description: string
          icon: string | null
          id: string
          meal_id: string
          name: string
          prep_time: number
          type: string | null
          user_id: string | null
        }
        Insert: {
          cook_time: number
          created_at?: string
          day_of_the_week?: number
          description: string
          icon?: string | null
          id?: string
          meal_id: string
          name: string
          prep_time: number
          type?: string | null
          user_id?: string | null
        }
        Update: {
          cook_time?: number
          created_at?: string
          day_of_the_week?: number
          description?: string
          icon?: string | null
          id?: string
          meal_id?: string
          name?: string
          prep_time?: number
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_id: string
          created_at: string
          credits: number
          email: string
          generation_count: number
          has_completed_onboarding: boolean
          has_requested_credits: boolean
          id: string
          plan: string
          username: string
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          credits?: number
          email?: string
          generation_count?: number
          has_completed_onboarding?: boolean
          has_requested_credits?: boolean
          id?: string
          plan?: string
          username?: string
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          credits?: number
          email?: string
          generation_count?: number
          has_completed_onboarding?: boolean
          has_requested_credits?: boolean
          id?: string
          plan?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_auth_user_id_fkey"
            columns: ["auth_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_today_recipes: {
        Args: {
          p_user_id: string
        }
        Returns: {
          id: string
          created_at: string
          cook_time: number
          prep_time: number
          description: string
          meal_id: string
          name: string
          user_id: string
          icon: string
          type: string
          day_of_the_week: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
