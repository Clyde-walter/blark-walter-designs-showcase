import { supabase } from "@/integrations/supabase/client";

export type Template = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  price_usd: number;
  tech_stack: string[];
  features: string[];
  hero_image: string | null;
  gallery_images: string[];
  live_demo_url: string | null;
  badge: string | null;
};

export const NGN_PER_USD = 1600;
export const formatNaira = (usd: number) =>
  `₦${Math.round(usd * NGN_PER_USD).toLocaleString()}`;

export const publishedTemplatesQuery = () => ({
  queryKey: ["public", "templates"],
  queryFn: async (): Promise<Template[]> => {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_published", true)
      .order("sort", { ascending: true });
    if (error || !data) return [];
    return data.map((r) => ({ ...r, price_usd: Number(r.price_usd) })) as Template[];
  },
});
