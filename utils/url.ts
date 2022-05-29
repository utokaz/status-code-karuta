import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery } from "querystring";

export const getBaseURL = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const protocol = ctx.req.headers["x-forwarded-proto"] || "http";
  const baseUrl = ctx.req ? `${protocol}://${ctx.req.headers.host}` : "";
  return baseUrl;
};
