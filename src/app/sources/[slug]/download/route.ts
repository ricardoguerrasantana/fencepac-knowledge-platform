import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const supabase = getSupabaseAdmin();

  const { data: source, error } = await supabase
    .from("sources")
    .select(
      "source_kind, storage_bucket, storage_path, original_file_name"
    )
    .eq("slug", slug)
    .single();

  if (error || !source) {
    return new NextResponse("Source not found.", { status: 404 });
  }

  if (
    source.source_kind !== "uploaded_file" ||
    !source.storage_bucket ||
    !source.storage_path
  ) {
    return new NextResponse(
      "This source does not have a downloadable uploaded file.",
      { status: 404 }
    );
  }

  const { data, error: signedUrlError } = await supabase.storage
    .from(source.storage_bucket)
    .createSignedUrl(source.storage_path, 60 * 5, {
      download: source.original_file_name || true,
    });

  if (signedUrlError || !data?.signedUrl) {
    return new NextResponse("Could not create download link.", {
      status: 500,
    });
  }

  return NextResponse.redirect(data.signedUrl);
}
