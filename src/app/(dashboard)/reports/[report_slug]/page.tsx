import React from "react";
import { FinancialStatement } from "./type";
import { djangoUrl } from "@/django_api";
import ReportClientPage from "./client";

export const revalidate = 60;
export const dynamicParams = true; // or false, to 404 on unknown paths
const data_url = djangoUrl + "/budgets/financial-statements/";

export async function generateStaticParams() {
  const financialStatements: FinancialStatement[] = await fetch(data_url)
    .then((res) => res.json())
    .catch(() => []);
  return financialStatements.map(({ slug }) => ({
    report_slug: slug,
  }));
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ report_slug: string }>;
}) {
  const { report_slug } = await params;
  const respose = await fetch(data_url + `${report_slug}/`);
  if (!respose.ok) {
    return <div>error</div>;
  }
  const fs = await respose.json();
  return <ReportClientPage data={fs} />;
}
