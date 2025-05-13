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
      colleges: {
        Row: {
          id: number
          name: string
          location: string
          district: string
          established: number
          type: string
          accreditation: Json
          ranking: Json
          intake: Json
          cutoff: Json | null
          website: string
          image: string
          courses: string[]
          facilities: string[]
          placement: Json | null
          created_at: string
        }
        Insert: {
          id: number
          name: string
          location: string
          district: string
          established: number
          type: string
          accreditation: Json
          ranking: Json
          intake: Json
          cutoff?: Json | null
          website: string
          image: string
          courses: string[]
          facilities: string[]
          placement?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          location?: string
          district?: string
          established?: number
          type?: string
          accreditation?: Json
          ranking?: Json
          intake?: Json
          cutoff?: Json | null
          website?: string
          image?: string
          courses?: string[]
          facilities?: string[]
          placement?: Json | null
          created_at?: string
        }
      }
      college_updates: {
        Row: {
          id: string
          college_id: number
          field: string
          old_value: Json | null
          new_value: Json
          updated_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          college_id: number
          field: string
          old_value?: Json | null
          new_value: Json
          updated_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          college_id?: number
          field?: string
          old_value?: Json | null
          new_value?: Json
          updated_by?: string | null
          created_at?: string | null
        }
      }
      college_events: {
        Row: {
          id: string
          college_id: number
          title: string
          description: string | null
          event_date: string
          venue: string
          expected_participants: number | null
          image: string | null
          created_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          college_id: number
          title: string
          description?: string | null
          event_date: string
          venue: string
          expected_participants?: number | null
          image?: string | null
          created_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          college_id?: number
          title?: string
          description?: string | null
          event_date?: string
          venue?: string
          expected_participants?: number | null
          image?: string | null
          created_by?: string | null
          created_at?: string | null
        }
      }
      keam_predictions: {
        Row: {
          id: string
          year: number
          phase: number
          college_id: number
          branch: string
          category: string
          opening_rank: number
          closing_rank: number
          created_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          year: number
          phase: number
          college_id: number
          branch: string
          category: string
          opening_rank: number
          closing_rank: number
          created_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          year?: number
          phase?: number
          college_id?: number
          branch?: string
          category?: string
          opening_rank?: number
          closing_rank?: number
          created_by?: string | null
          created_at?: string | null
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string | null
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