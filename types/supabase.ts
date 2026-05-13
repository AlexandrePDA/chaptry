export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          plan: "free" | "creator" | "pro" | "agency";
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          generations_used_this_month: number;
          generations_reset_at: string | null;
          language_preference: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          plan?: "free" | "creator" | "pro" | "agency";
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          generations_used_this_month?: number;
          generations_reset_at?: string | null;
          language_preference?: string;
        };
        Update: {
          id?: string;
          email?: string;
          updated_at?: string;
          plan?: "free" | "creator" | "pro" | "agency";
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          generations_used_this_month?: number;
          generations_reset_at?: string | null;
          language_preference?: string;
        };
      };
      generations: {
        Row: {
          id: string;
          user_id: string;
          video_url: string;
          video_id: string;
          video_title: string | null;
          channel_name: string | null;
          duration_seconds: number | null;
          transcript: string | null;
          chapters: Json | null;
          description: string | null;
          tags: string[] | null;
          generation_metadata: Json | null;
          created_at: string;
          is_deleted: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_url: string;
          video_id: string;
          video_title?: string | null;
          channel_name?: string | null;
          duration_seconds?: number | null;
          transcript?: string | null;
          chapters?: Json | null;
          description?: string | null;
          tags?: string[] | null;
          generation_metadata?: Json | null;
          created_at?: string;
          is_deleted?: boolean;
        };
        Update: {
          video_title?: string | null;
          channel_name?: string | null;
          chapters?: Json | null;
          description?: string | null;
          tags?: string[] | null;
          is_deleted?: boolean;
        };
      };
      usage_events: {
        Row: {
          id: string;
          user_id: string | null;
          event_type: "generation" | "regeneration" | "export" | "upgrade" | "downgrade" | "cancellation";
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          event_type: "generation" | "regeneration" | "export" | "upgrade" | "downgrade" | "cancellation";
          metadata?: Json | null;
          created_at?: string;
        };
        Update: never;
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
  };
};
