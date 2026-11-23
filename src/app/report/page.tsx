"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n";

/**
 * The old single-report flow was merged into the guided case (/case).
 * This page stays only so existing links and bookmarks keep working.
 */
export default function ReportRedirectPage() {
  const t = useT();
  const router = useRouter();

  useEffect(() => {
    router.replace("/case");
  }, [router]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-calm-700">
      <p>{t("reportMoved")}</p>
      <Link href="/case" className="rds-btn-primary mt-4">
        {t("homeStart")}
      </Link>
    </div>
  );
}
